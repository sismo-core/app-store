import { Column, Entry, Table, TableStore } from "@/src/libs/table-store";

export class MemoryTableStore implements TableStore {
  public tables: { [key: string]: Table } = {};

  public async createColumns(tableName: string, columns: Column[]): Promise<void> {
    if (!this.tables[tableName]) {
      this.tables[tableName] = [columns];
    } else {
      this.tables[tableName][0] = columns;
    }
  }

  public async get(tableName: string, entry: Entry): Promise<string[]> {
    const table = this.tables[tableName];
    if (!table) return null;

    const columnIndex = table[0].findIndex((column) => column === entry.name);
    if (columnIndex === -1) return null;

    for (let row of table) {
      if (row[columnIndex] === entry.value) {
        return row;
      }
    }
    return null;
  }

  public async add(tableName: string, entries: Entry[]): Promise<string[]> {
    const table = this.tables[tableName];
    if (!table) throw new Error(`Table '${tableName}' doesn't exist.`);

    const row: string[] = new Array(table[0].length).fill("");
    for (let entry of entries) {
      const columnIndex = table[0].findIndex((column) => column === entry.name);
      if (columnIndex === -1)
        throw new Error(`Column '${entry.name}' doesn't exist in table '${tableName}'.`);

      row[columnIndex] = entry.value;
    }
    table.push(row);
    return row;
  }
}
