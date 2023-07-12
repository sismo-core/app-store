import { Contract, ethers, Signer, Transaction } from "ethers";
import { Network } from "../networks";
import { ZK_BADGE_ABI, ZK_BADGE_ADDRESSES } from "./constants";

export class ZkBadgeContract {
  private _address: `0x${string}`;
  private _contractInstance;
  private _signer: Signer;

  constructor({ network, signer }: { network: Network; signer: Signer }) {
    this._signer = signer;
    if (!ZK_BADGE_ADDRESSES[network]) throw new Error("Chain not yet supported");
    this._address = ZK_BADGE_ADDRESSES[network];
  }

  private _getContractInstance(): Contract {
    if (!this._contractInstance) {
      const zkMinterContract = new ethers.Contract(this._address, ZK_BADGE_ABI, this._signer);
      this._contractInstance = zkMinterContract;
    }
    return this._contractInstance;
  }

  public async mint({
    responseBytes,
    address,
    tokenId,
  }: {
    responseBytes: string;
    address: string;
    tokenId: string;
  }): Promise<Transaction> {
    const instance = this._getContractInstance();
    return await instance.claimWithSismoConnect(responseBytes, address, tokenId);
  }
}
