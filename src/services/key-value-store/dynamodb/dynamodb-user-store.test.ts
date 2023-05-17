
import { getLocalDocumentClient, resetDB } from "../../dynamodb/test-service.utils";
import { mockKeyA, mockValueA1, mockValueA2, mockKeyB, mockValueB1, mockValueB2} from "../key-value-store.test-utils";
import { DynamoDBkeyValueStore } from "./dynamodb-key-value-store";
import { createKeyValueStoreEntityManager } from "./user.entity";

const dynamodbClient = getLocalDocumentClient();

describe("test Key Value Store on dynamoDB", () => {
  const keyValueStore = new DynamoDBkeyValueStore(
    createKeyValueStoreEntityManager({
      documentClient: dynamodbClient,
    })
  );

  beforeEach(async () => {
    await resetDB(dynamodbClient);
  });

  it("should return undefined if keyValue does not exist", async () => {
    const keyValue = await keyValueStore.get(mockKeyA);
    expect(keyValue).toBeUndefined();
  });
  
  it("should save and retrieve keyValue from store", async () => {
    await keyValueStore.save(mockKeyA, mockValueA1);
    await keyValueStore.save(mockKeyB, mockValueB1);

    const value = await keyValueStore.get(mockKeyA);
    expect(value).toEqual(mockValueA1);

    const value2 = await keyValueStore.get(mockKeyB);
    expect(value2).toEqual(mockValueB1);
  });
  
  it("should update keyValue", async () => {
    await keyValueStore.save(mockKeyB, mockValueB1);
    const value1 = await keyValueStore.get(mockKeyB);

    expect(value1).toEqual(mockValueB1);
  
    await keyValueStore.save(mockKeyB, mockValueB2);
    const value2 = await keyValueStore.get(mockKeyB);
    expect(value2).toEqual(mockValueB2);
  });
});
