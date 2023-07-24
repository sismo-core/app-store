import env from "@/src/environments";
import { Network } from "@/src/libs/contracts/networks";
import { getDefenderRelayerSigner } from "@/src/libs/contracts/signers";
import { ZkBadgeContract } from "@/src/libs/contracts/zk-badge";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { responseBytes, destination, tokenId, chain } = await req.json();

    const signer = getDefenderRelayerSigner(Network.Mumbai, env.defenderAPIKeys.zkBadge);
    const zkMinterContract = new ZkBadgeContract({ network: chain, signer });

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
        console.error(e);
        return NextResponse.json({ 
            code: "minting-error" 
        })
    }
}