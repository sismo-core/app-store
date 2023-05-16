
export type Entry = { name, value };

export abstract class AppDataStore {
  public abstract init(): Promise<void>;
  public abstract get(entry: Entry): Promise<string[]>;
  public abstract load(): Promise<string[][]>;
  public abstract add(entries: Entry[]): Promise<string[]>;
}