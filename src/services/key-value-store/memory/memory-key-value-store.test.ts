import { mockKeyA, mockValueA1, mockValueA2, mockKeyB, mockValueB1, mockValueB2} from "../key-value-store.test-utils";
import { MemoryKeyValueStore } from "./memory-key-value-store";

describe("test memory keyValue store", () => {
  const keyValueStore = new MemoryKeyValueStore();

  beforeEach(async () => {
    await keyValueStore.reset();
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
  });

  it("should update keyValue", async () => {
    await keyValueStore.save(mockKeyA, mockValueA1);
    const value1 = await keyValueStore.get(mockKeyA);
    expect(value1).toEqual(mockValueA1);

    await keyValueStore.save(mockKeyA, mockValueA2);
    const value2 = await keyValueStore.get(mockKeyA);
    expect(value2).toEqual(mockValueA2);
  });
});
