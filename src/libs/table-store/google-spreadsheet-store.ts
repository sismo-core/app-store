import { google, sheets_v4 } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { Column, Entry, Row, Table, TableStore } from "./table-store";

const TABLE_SIZE = 250;
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// process.env.ZK_FORM_SPREADSHEET_KEY

export class GoogleSpreadsheetStore implements TableStore {
  private readonly _service: sheets_v4.Sheets;
  private _spreadSheetsInitiated = new Map<string, boolean>();

  constructor({ credentials }: { credentials: string }) {
    this._service = google.sheets("v4");
    this._authenticate(credentials);
  }

  public async createColumns(tableName: string, columns: Column[]): Promise<void> {
    if (this._spreadSheetsInitiated.get(tableName)) return;
    const table = await this._loadAllTable(tableName);
    const hasColumns = table?.[0]?.length > 0;
    if (!hasColumns) {
      await this._write(tableName, columns);
    }
    this._spreadSheetsInitiated.set(tableName, true);
  }

  public async get(tableName: string, entry: Entry): Promise<string[]> {
    const table = await this._loadAllTable(tableName);
    const indexOfEntry = this._findColumnIndex(table, entry.name);
    if (indexOfEntry === -1) return null;

    for (let line of table) {
      if (line[indexOfEntry] === entry.value) {
        return line;
      }
    }
    return null;
  }

  public async add(tableName: string, entries: Entry[]): Promise<string[]> {
    const table = await this._loadAllTable(tableName);
    const row = new Array<string>(table[0].length);
    for (let entry of entries) {
      const indexOfEntry = this._findColumnIndex(table, entry.name);
      row[indexOfEntry] = entry.value;
    }
    return await this._write(tableName, row);
  }

  private _findColumnIndex(table: Table, column: Column): number {
    const indexOfColumn = table[0].findIndex((_column) => _column === column);
    return indexOfColumn;
  }

  private async _loadAllTable(tableName: string): Promise<Table> {
    const result = await this._service.spreadsheets.values.get({
      spreadsheetId: tableName,
      range: `A1:${TABLE_SIZE}`,
    });
    return result?.data?.values as Table;
  }

  private async _write(tableName: string, row: Row): Promise<string[]> {
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
