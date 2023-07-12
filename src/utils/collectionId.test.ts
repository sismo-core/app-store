import { encodeCollectionId, decodeCollectionId } from "./collectionId";
import { ethers } from "ethers";

describe("CollectionId Encoding and Decoding", () => {
  it("should correctly encode and decode the collectionId", () => {
    const originalId = 12345;
    const encodedId = encodeCollectionId(originalId);
    const decodedId = decodeCollectionId(encodedId);

    expect(decodedId).toEqual(originalId);
  });

  it("should encode the collectionId into a hexadecimal string", () => {
    const originalId = 12345;
    const encodedId = encodeCollectionId(originalId);

    expect(encodedId).toEqual(
      ethers.utils.hexZeroPad(ethers.BigNumber.from(originalId).toHexString(), 32).slice(2)
    );
  });

  it("should throw an error when decoding an invalid hexadecimal string", () => {
    expect(() => {
      decodeCollectionId("invalid-hexadecimal-string");
    }).toThrow(ethers.errors.INVALID_ARGUMENT);
  });
});
