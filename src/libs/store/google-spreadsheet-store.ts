import { google, sheets_v4 } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { Entry, Store } from "./store";

type Table = string[][] | null;
type Column = string;

const TABLE_SIZE = 250;
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export class GoogleSpreadsheetStore extends Store {
  private readonly _spreadsheetId: string;
  private readonly _service: sheets_v4.Sheets;
  private readonly _columns: Column[];
  private _table: Table;

  constructor({ columns, spreadsheetId }: { columns?: Column[], spreadsheetId: string } ) {
    super();
    this._service = google.sheets("v4");
    this._columns = columns;
    this._spreadsheetId = spreadsheetId;
    this._authenticate();
  }

  public async init(): Promise<void> {
    const table = await this.load();
    if (!table) {
      await this.write(this._columns);
    }
  }

  public async get(entry: Entry): Promise<string[]> {
    const table = await this.load();
    if (!table) return null;
    const indexOfEntry = this._columns.findIndex(column => column === entry.name);
    if (indexOfEntry === -1) return null;

    for (let line of table) {
      if (line[indexOfEntry] === entry.value) {
        return line;
      }
    }
    return null;
  }

  public async add(entries: Entry[]): Promise<string[]> {
    const columns = [];
    for (let column of this._columns) {
      const value = entries.find(_value => _value.name === column)?.value;
      columns.push(value);
    }
    return await this.write(columns);
  }

  public async load(): Promise<Table> {
    if (this._table) {
      return this._table;
    }
    const result = await this._service.spreadsheets.values.get({
      spreadsheetId: this._spreadsheetId,
      range: `A1:${TABLE_SIZE}`,
    });

    this._table = result?.data?.values as Table
    return this._table;
  }

  private async write(column: Column[]): Promise<string[]> {
    const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
      spreadsheetId: this._spreadsheetId,
      range: `Sheet1!A1:G1`,
      valueInputOption: "RAW",
      responseValueRenderOption: "UNFORMATTED_VALUE",
      insertDataOption: "INSERT_ROWS",
      includeValuesInResponse: true,
      requestBody: {
        values: [column],
        majorDimension: "ROWS",
      },
    };
    const response = await this._service.spreadsheets.values.append(request);
    const updatedRow = response?.data?.updates?.updatedData?.values?.[0];
    return updatedRow;
  }

  private _authenticate(): void {
    const auth : GoogleAuth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.SPREADSHEET_KEY),
      scopes: SCOPES,
    });

    google.options({
      auth,
    });
  }
}
