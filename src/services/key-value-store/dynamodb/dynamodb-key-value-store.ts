import { KeyValueStore } from "../key-value.store";
import { KeyValueModel } from "./user.entity";

import { EntityManager } from "@typedorm/core";

export class DynamoDBkeyValueStore extends KeyValueStore {
  entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    super();
    this.entityManager = entityManager;
  }

  protected async _save(key: string, value: any): Promise<void> {
    const keyValueStoreModel = KeyValueModel.fromKeyValueStore({
      key,
      value,
    });

   await this.entityManager.create(
      keyValueStoreModel,
      {
        overwriteIfExists: true,
      }
    );

    return;
  }


  protected async _get(key: string): Promise<any> {
    const keyValue = await this.entityManager.findOne(KeyValueModel, {
      key,
    });

    if (!keyValue) {
      return undefined;
    }

    return keyValue.toValue();
  }

  protected async _reset(): Promise<void> {
    // const items = await this.entityManager.find(KeyValueModel, {});

    // console.log("items", items)
  
    // // for (const item in items) {
    // //   await this.entityManager.delete(KeyValueModel, { key: item });
    // // }
  }
}
