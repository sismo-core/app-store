import { Column, Row, Table, TableStore } from "@/src/libs/table-store";

export class MemoryTableStore implements TableStore {
  private tables: { [key: string]: Table } = {};

  public async createColumns(tableName: string, columns: Column[]): Promise<void> {
    if (!this.tables[tableName]) {
      this.tables[tableName] = [columns];
    } else {
      this.tables[tableName][0] = columns;
    }
  }

  public async getColumn(tableName: string, columnNumber: number): Promise<string[]> {
    if (!this.tables[tableName]) {
      throw new Error(`Table ${tableName} does not exist`);
    }

    const table = this.tables[tableName];
    return table.map((row) => row[columnNumber]);
  }

  public async addRow(tableName: string, row: Row): Promise<Row> {
    if (!this.tables[tableName]) {
      throw new Error(`Table ${tableName} does not exist`);
    }

    this.tables[tableName].push(row);
    return row;
  }

  // test purpose
  public getTable(tableName: string): Table {
    return this.tables[tableName];
  }
}
