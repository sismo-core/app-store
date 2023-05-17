export abstract class KeyValueStore {
  public async save(
    key: string, value: any
  ): Promise<void> {
    await this._save(key, value);
  }

  public async get(key: string): Promise<any> {
    return await this._get(key);
  }

  public async reset(): Promise<void> {
    return this._reset();
  }

  protected abstract _save(key: string, value: any): Promise<void>;
  protected abstract _get(key: string): Promise<any>;
  protected abstract _reset(): Promise<void>;
}
