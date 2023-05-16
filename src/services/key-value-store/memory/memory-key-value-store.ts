import { KeyValueStore } from "../key-value.store";
import { KeyValue } from "../key-value.types";

export class MemoryKeyValueStore extends KeyValueStore {
  public keyValueStore: KeyValue<any> ;

  constructor() {
    super();
    this.keyValueStore = {};
  }

  protected async _save(key: string, value: any ): Promise<void> {
    this.keyValueStore[key] = value
  }

  protected async _get(key: string): Promise<any> {
    return this.keyValueStore[key];
  }

  protected async _reset(): Promise<void> {
    this.keyValueStore = {};
  }
}
