export type Table = string[][] | null;
export type Column = string;
export type Row = string[];

export interface TableStore {
  createColumns(tableName: string, columns: Column[]): Promise<void>;
  getColumn(tableName: string, columnNumber: number): Promise<string[]>;
  addRow(tableName: string, row: string[]): Promise<string[]>;
}
