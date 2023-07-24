import { BigNumber, ethers } from "ethers";


export const encodeCollectionId = (collectionId: number): string =>
  ethers.utils
    .hexZeroPad(BigNumber.from(collectionId).toHexString(), 32)
    .slice(2);

export const decodeCollectionId = (encodedId: string): number => {
    return BigNumber.from('0x' + encodedId).toNumber();
    };