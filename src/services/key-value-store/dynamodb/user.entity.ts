import { Attribute, Entity } from "@typedorm/common";
import { createConnection } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { KeyValueObject } from "../key-value.types";
import { getDynamoGlobalTable } from "../../dynamodb";

class KeyValueModelSchema {
  @Attribute()
  key: string;

  @Attribute()
  value: any;
  
  toValue(): any {
    return this.value;
  }
}

@Entity({
  name: "key-value",
  primaryKey: {
    partitionKey: "KEY#{{key}}",
    sortKey: "NONE",
  }
})
export class KeyValueModel extends KeyValueModelSchema {
  static fromKeyValueStore(keyValue: KeyValueObject): KeyValueModel {
    const keyValueModel = new KeyValueModel();
    keyValueModel.key = keyValue.key;
    keyValueModel.value = keyValue.value;
    return keyValueModel;
  }
}

export const createKeyValueStoreEntityManager = ({
  globalTableName,
  documentClient,
}: {
  globalTableName?: string;
  documentClient: DocumentClientV3;
}) => {
  const table = getDynamoGlobalTable(globalTableName ?? "global-table");
  return createConnection({
    table,
    name: "key-value",
    entities: [KeyValueModel],
    documentClient,
  }).entityManager;
};
