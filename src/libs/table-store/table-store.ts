export type Entry = { name; value };
export type Table = string[][] | null;
export type Column = string;
export type Row = string[];

export interface TableStore {
  createColumns(tableName: string, columns: Column[]): Promise<void>;
  get(tableName: string, entry: Entry): Promise<string[]>;
  add(tableName: string, entries: Entry[]): Promise<string[]>;
}
