import { Contract, ethers, Signer, Transaction } from "ethers";
import { ZK_DROP_ABI } from "./constants";

export class ZkDropContract {
  private _address: `0x${string}`;
  private _contractInstance;
  private _signer: Signer;

  constructor({ contractAddress, signer }: { signer: Signer; contractAddress: `0x${string}` }) {
    this._signer = signer;
    this._address = contractAddress;
  }

  private _getContractInstance(): Contract {
    if (!this._contractInstance) {
      const zkDropInstance = new ethers.Contract(this._address, ZK_DROP_ABI, this._signer);
      this._contractInstance = zkDropInstance;
    }
    return this._contractInstance;
  }

  public async mint({
    responseBytes,
    address,
  }: {
    responseBytes: string;
    address: string;
  }): Promise<Transaction> {
    const instance = this._getContractInstance();
    return await instance.claimWithSismoConnect(responseBytes, address);
  }
}
