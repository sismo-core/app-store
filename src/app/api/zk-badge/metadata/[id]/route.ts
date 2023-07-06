import ServiceFactory from "@/src/services/service-factory/service-factory";
import { ZkBadgeAppType } from "@/src/services/spaces-service";
import { BigNumber, ethers } from "ethers";
import { NextResponse } from "next/server";

const encodeCollectionId = (collectionId: number): string =>
  ethers.utils
    .hexZeroPad(BigNumber.from(collectionId).toHexString(), 32)
    .slice(2);

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const url = new URL(req.url);
    const id = Number(params.id.split(".")[0]);
    const spacesService = ServiceFactory.getSpacesService();
    let apps = await spacesService.getApps();
    apps = apps.filter(app => app.type === "zkBadge") ;
    const decoded = encodeCollectionId(id);
    console.log(decoded);
    const badge = (apps as ZkBadgeAppType[]).find(app => parseInt(app.tokenId) === parseInt(encodeCollectionId(id)));
    if (!badge) {
        return NextResponse.json({ 
            error: `No badge found for id: ${encodeCollectionId(id)}`
        })
    }
    return NextResponse.json({ 
        name: badge.badgeMetadata.name,
        description: badge.badgeMetadata.description, 
        image: url.protocol + url.hostname + (url.port ? ":" + url.port : "") +  "/api/zk-badge/image/" + badge.tokenId
    })
}