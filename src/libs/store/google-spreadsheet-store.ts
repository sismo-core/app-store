import path from "path";
import process from "process";
import { google, sheets_v4 } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { Store } from "./store";

type Table = string[][] | null;

const TABLE_SIZE = 250;
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export class GoogleSpreadsheetStore extends Store {
  private readonly _spreadsheetId: string;
  private readonly _service: sheets_v4.Sheets;
  private readonly _valuesNames: string[];
  private _table: Table;

  constructor({ valuesNames, spreadsheetId }: { valuesNames: string[], spreadsheetId: string } ) {
    super();
    this._service = google.sheets("v4");
    this._valuesNames = valuesNames;
    this._spreadsheetId = spreadsheetId;
    this._authenticate();
  }

  public async init(): Promise<void> {
    const table = await this.load();
    if (!table) {
      await this.write(this._valuesNames);
    }
  }

  public async write(values: string[]): Promise<string[]> {
    const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
      spreadsheetId: this._spreadsheetId,
      range: `Sheet1!A1:G1`,
      valueInputOption: "RAW",
      responseValueRenderOption: "UNFORMATTED_VALUE",
      insertDataOption: "INSERT_ROWS",
      includeValuesInResponse: true,
      requestBody: {
        values: [values],
        majorDimension: "ROWS",
      },
    };
    const response = await this._service.spreadsheets.values.append(request);
    const updatedRow = response?.data?.updates?.updatedData?.values?.[0];
    return updatedRow;
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

  private _authenticate(): void {
    const keyPath = path.join(
      process.cwd(),
      "key",
      "spaces-385613-255993e94b58.json"
    );

    const auth : GoogleAuth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: SCOPES,
    });

    google.options({
      auth,
    });
  }
}
