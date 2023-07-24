import env from "@/src/environments";
import { getDefenderRelayerSigner } from "@/src/libs/contracts/signers";
import { ZkDropContract } from "@/src/libs/contracts/zk-drop";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { ZkDropAppType } from "@/src/services/spaces-service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { responseBytes, destination, chain, spaceSlug, appSlug } = await req.json();

  const spacesService = ServiceFactory.getSpacesService();
  const apps = await spacesService.getApps({ where: { spaceSlug, appSlug } });
  if (!apps || apps.length !== 1) {
    return NextResponse.json({
      code: `No app found for ${spaceSlug}/${appSlug}`,
    });
  }
  const app = apps[0] as ZkDropAppType;

  const signer = getDefenderRelayerSigner(chain, env.defenderAPIKeys.zkDrop);
  const chainConfig = app.chains.find((_chain) => _chain.name === chain);

  if (!chainConfig) {
    return NextResponse.json({
      code: `Chain ${chain} not supported for the app ${spaceSlug}/${appSlug}`,
    });
  }
  const zkDropContract = new ZkDropContract({
    signer,
    contractAddress: chainConfig.contractAddress,
  });

  try {
    const tx = await zkDropContract.mint({
      responseBytes,
      address: destination,
    });

    return NextResponse.json({
      success: true,
      txHash: tx.hash,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      code: "minting-error",
    });
  }
}
