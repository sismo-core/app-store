import path from 'path';
import process from 'process';
import { google, sheets_v4 } from 'googleapis';
//import { UserType } from "../types";
//import { userStore } from "./user-store";
import { GoogleAuth } from 'google-auth-library';

// THIS STORE USE THE NATIVE GOOGLE SPREADSHEET API

type Table = string[][] | null;

export class GoogleSheet {
  // readonly SPREADSHEET_ID = "1E3ck2MrItc11UaO4GzfIRwT7qNTTPOazabQ0csA3t9A";
  readonly ROOT_SPREASHEET_ID = '1mu33CWRWH27u4VXrhoXDEgw0bEC2nXy37eLxZGKM_Xg';
  //private spreadsheetId: string;
  private readonly TABLE_SIZE = 250;
  private readonly SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
  ];
  private readonly service: sheets_v4.Sheets;

  constructor() {
    this.authenticate();
    /// this.spreadsheetId = spreadsheetId ?? "1E3ck2MrItc11UaO4GzfIRwT7qNTTPOazabQ0csA3t9A";
    this.service = google.sheets('v4');
  }

  private getRow({
    table,
    column,
    filter,
  }: {
    table: string[][];
    column: number;
    filter: string;
  }): string[] | undefined {
    const row = table.find(
      row => row[column]?.toString() === filter?.toString()
    );
    return row;
  }


  private async loadTable(spreadsheetId: string): Promise<Table> {
    const result = await this.service.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:G250',
    });
    return result?.data?.values as Table;
  }

  public async getSpreadsheetIdFromRoot(spaceSlug: string): Promise<string> {
    const table = await this.loadTable(this.ROOT_SPREASHEET_ID);
    if (!table) {
      return '';
    }
    const row = this.getRow({
      table,
      column: 0,
      filter: spaceSlug,
    });

    if (!row) {
      return '';
    }

    const [slugId, spreadsheetId] = row;
    return spreadsheetId;
  }


  public async createNewSpreadsheet(
    spaceSlug: string,
    appName: string
  ): Promise<void> {
    // create a new spreadsheet
    const resource = {
      properties: {
        title: spaceSlug,
      },

      sheets: [
        {
          properties: {
            title: appName,
            gridProperties: {
              rowCount: this.TABLE_SIZE, // number of row in the table
              columnCount: 7, // number of colum in the table
            },
          },
        },
      ],
    } as sheets_v4.Schema$Spreadsheet;

    const spreadsheet = await this.service.spreadsheets.create({
      resource: resource,
    } as any);
    const spreadsheetId = spreadsheet.data.spreadsheetId;

    // add the spreadsheet id to the root spreadsheet
    const table = await this.loadTable(this.ROOT_SPREASHEET_ID);
    if (!table) {
      return;
    }

    const row = this.getRow({
      table,
      column: 0,
      filter: spaceSlug,
    });
    if (row) {
      return;
    }

    const newTable = [...table, [spaceSlug, spreadsheetId]];

    await this.shareSpreadsheetWithEmail(
      spreadsheetId as string,
      'ben@sismo.io'
    );

    await this.service.spreadsheets.values.update({
      spreadsheetId: this.ROOT_SPREASHEET_ID,
      range: 'A1:B250',
      valueInputOption: 'RAW',
      requestBody: {
        values: newTable,
      },
    });
  }

  public async createNewTable(spreadsheetId: string, appName: string, header: string[]): Promise<void> {
    // NOT TESTED YET
    try {
      
      const sheetProperties = {
        properties: {
          title: appName,
          gridProperties: {
            rowCount: this.TABLE_SIZE,
            columnCount: 7,
          },
        },
      };
  
      const addSheetRequest = {
        addSheet: {
          properties: sheetProperties,
        },
      };
  
      const updateHeaderRequest = {
        updateCells: {
          range: {
            sheetId: 0, // This refers to the new sheet's ID; it will be resolved automatically
            startRowIndex: 0,
            endRowIndex: 1,
            startColumnIndex: 0,
            endColumnIndex: header.length,
          },
          rows: [
            {
              values: header.map((value) => ({
                userEnteredValue: {
                  stringValue: value,
                },
              })),
            },
          ],
          fields: 'userEnteredValue.stringValue',
        },
      };
  
      const request = {
        spreadsheetId: spreadsheetId,
        requestBody: {
          requests: [addSheetRequest, updateHeaderRequest],
        },
      };
  
      this.service.spreadsheets.batchUpdate(request as any);
    } catch (error) {
      console.error('Error creating the new table:', error);
    }
  }

  private async shareSpreadsheetWithEmail(
    spreadsheetId: string,
    email: string
  ): Promise<void> {
    const drive = google.drive({
      version: 'v3',
    });

    const permissions = {
      role: 'writer', // You can also use 'reader' for read-only access or 'owner' to transfer ownership
      type: 'user',
      emailAddress: email,
    };

    try {
      await drive.permissions.create({
        fileId: spreadsheetId,
        requestBody: permissions,
        fields: 'id',
      });
    } catch (error) {
      console.error('Error sharing the spreadsheet:', error);
    }
  }


  private authenticate(): void {
    const keyPath = path.join(
      process.cwd(),
      'src',
      'key',
      'zksub-ethcc-5bb39aa02dfa.json'
    );

    const auth: GoogleAuth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: this.SCOPES,
    });

    google.options({
      auth,
    });
  }

  // public async getUser(id: string): Promise<any | null> {
  //   const table = await this.loadTable();

  //   if (!table) {
  //     return null;
  //   }

  //   const row = table.find((row) => row[0]?.toString() === id?.toString());

  //   if (!row) {
  //     return null;
  //   }

  //   const [userId, name, firstname, email, twitterId, githubId, createdAt] =
  //     row;

  //   const user: any = {
  //     id: userId,
  //     name,
  //     firstname,
  //     email,
  //     twitterId,
  //     githubId,
  //     createdAt,
  //   };

  //   return user;
  // }

  // public async addUser(user: any): Promise<any | null> {
  //   const existingUser = await this.getUser(user.id);

  //   if (existingUser) {
  //     return null;
  //   }

  //   const values = [
  //     [
  //       user.id,
  //       user.name,
  //       user.firstname,
  //       user.email,
  //       user.twitterId,
  //       user.githubId,
  //       user.createdAt,
  //     ],
  //   ];

  //   const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
  //     spreadsheetId: this.spreadsheetId,
  //     range: `Sheet1!A1:G1`,
  //     valueInputOption: "RAW",
  //     responseValueRenderOption: "UNFORMATTED_VALUE",
  //     insertDataOption: "INSERT_ROWS",
  //     includeValuesInResponse: true,
  //     requestBody: {
  //       values,
  //       majorDimension: "ROWS",
  //     },
  //   };

  //   const response = await this.service.spreadsheets.values.append(request);
  //   const updatedRow = response?.data?.updates?.updatedData?.values?.[0];

  //   if (!updatedRow) {
  //     return null;
  //   }

  //   const [id, name, firstname, email, twitterId, githubId, createdAt] =
  //     updatedRow;

  //   const updatedUser = {
  //     id,
  //     name,
  //     firstname,
  //     email,
  //     twitterId,
  //     githubId,
  //     createdAt,
  //   };

  //   return updatedUser;
  // }
}
