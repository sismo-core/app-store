import zkMinterAbi from "./abi.json";
import { Contract, ethers, Signer, Transaction } from 'ethers';
import { Network } from "../networks";

export type ChainName = "gnosis" | "mumbai";

export class ZkBadgeMinterContract {
    private _address: `0x${string}`;
    private _contractInstance;
    private _signer: Signer;

    constructor({ network, signer }: { network: Network, signer: Signer }) {
        this._signer = signer;
        switch (network) {
            case Network.Gnosis:
                this._address = "0x37BA6A75BAcD5E3a2149Fc975863D9797535c09f";
                break;
            case Network.Mumbai: 
                this._address = "0x748A728f35B364C98E06143602000070ECeC4E2f";
                break;
            default:
                throw new Error("Chain not yet supported");
        }
    }

    private _getContractInstance(): Contract {
        if (!this._contractInstance) {
            const zkMinterContract = new ethers.Contract(
                this._address,
                zkMinterAbi.abi,
                this._signer
            );
            this._contractInstance = zkMinterContract;
        }
        return this._contractInstance;
    }

    public async mint({ responseBytes, address, tokenId }: { responseBytes: string, address: string, tokenId: string }): Promise<Transaction> {
        const instance = this._getContractInstance();
        return await instance.claimWithSismoConnect(responseBytes, address, tokenId)
    }
}