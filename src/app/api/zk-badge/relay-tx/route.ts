import { Network } from "@/src/libs/contracts/networks";
import { getDefenderRelayerSigner } from "@/src/libs/contracts/signers";
import { ZkBadgeMinterContract } from "@/src/libs/contracts/zk-badge-minter";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { responseBytes, destination, tokenId } = await req.json();

    const signer = getDefenderRelayerSigner(Network.Mumbai);
    const zkMinterContract = new ZkBadgeMinterContract({ network: Network.Mumbai, signer });

    try {
        const tx = await zkMinterContract.mint({ 
            responseBytes, 
            address: destination, 
            tokenId
        });
    
        return NextResponse.json({
          success: true,
          txHash: tx.hash
        });
    } catch (e) {
        return NextResponse.json({ 
            code: "minting-error" 
        })
    }
}