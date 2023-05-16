import { INDEX_TYPE, Table } from "@typedorm/common";

export const getDynamoGlobalTable = (name: string) =>
  new Table({
    name,
    partitionKey: "PK",
    sortKey: "SK",
    indexes: {
      GSI1: {
        partitionKey: "GSI1PK",
        sortKey: "GSI1SK",
        type: INDEX_TYPE.GSI,
      },
      GSI2: {
        partitionKey: "GSI2PK",
        sortKey: "GSI2SK",
        type: INDEX_TYPE.GSI,
      },
      GSI3: {
        partitionKey: "GSI3PK",
        sortKey: "GSI3SK",
        type: INDEX_TYPE.GSI,
      },
      GSI4: {
        partitionKey: "GSI4PK",
        sortKey: "GSI4SK",
        type: INDEX_TYPE.GSI,
      },
      GSI5: {
        partitionKey: "GSI5PK",
        sortKey: "GSI5SK",
        type: INDEX_TYPE.GSI,
      },
    },
  });
