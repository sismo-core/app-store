import { google, sheets_v4 } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { Column, Row, Table, TableStore } from "./table-store";

const TABLE_SIZE = 250;
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// process.env.ZK_FORM_SPREADSHEET_KEY

export class GoogleSpreadsheetStore implements TableStore {
  private readonly _service: sheets_v4.Sheets;
  private _spreadsheetsColumnsCreated = new Map<string, boolean>();

  constructor({ credentials }: { credentials: string }) {
    this._service = google.sheets("v4");
    this._authenticate(credentials);
  }

  public async createColumns(tableName: string, columns: Column[]): Promise<void> {
    if (this._spreadsheetsColumnsCreated.get(tableName)) return;
    const table = await this._loadAllTable(tableName);
    const hasColumns = table?.[0]?.length > 0;
    if (!hasColumns) {
      await this._write(tableName, columns);
    }
    this._spreadsheetsColumnsCreated.set(tableName, true);
  }

  public async getColumn(tableName: string, columnNumber: number): Promise<string[]> {
    const table = await this._loadAllTable(tableName);
    return table.map((line) => line[columnNumber]);
  }

  public async addRow(tableName: string, row: Row): Promise<Row> {
    return await this._write(tableName, row);
  }

  private async _loadAllTable(tableName: string): Promise<Table> {
    const result = await this._service.spreadsheets.values.get({
      spreadsheetId: tableName,
      range: `A1:${TABLE_SIZE}`,
    });
    return result?.data?.values as Table;
  }

  private async _write(tableName: string, row: Row): Promise<Row> {
    const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
      spreadsheetId: tableName,
      range: `Sheet1!A1:G1`,
      valueInputOption: "RAW",
      responseValueRenderOption: "UNFORMATTED_VALUE",
      insertDataOption: "INSERT_ROWS",
      includeValuesInResponse: true,
      requestBody: {
        values: [row],
        majorDimension: "ROWS",
      },
    };
    const response = await this._service.spreadsheets.values.append(request);
    const updatedRow = response?.data?.updates?.updatedData?.values?.[0];
    return updatedRow;
  }

  private _authenticate(credentials: string): void {
    const auth: GoogleAuth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: SCOPES,
    });

    google.options({
      auth,
    });
  }
}
