
export abstract class Store {
  public abstract init(): Promise<void>;
  public abstract load(): Promise<string[][]>;
  public abstract write(values: string[]): Promise<string[]>;
}