import ServiceFactory from "@/src/services/service-factory/service-factory";
import { ZkBadgeAppType } from "@/src/services/spaces-service";
import { encodeCollectionId } from "@/src/utils/collectionId";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string } }) {
    const url = new URL(req.url);
    const id =  parseInt(params.id.split(".")[0]);
    const spacesService = ServiceFactory.getSpacesService();
    let apps = await spacesService.getApps();
    apps = apps.filter(app => app.type === "zkBadge") ;
    const badge = (apps as ZkBadgeAppType[]).find(app => parseInt(app.tokenId) === parseInt(encodeCollectionId(id)));
    if (!badge) {
        return NextResponse.json({ 
            error: `No badge found for id: ${parseInt(encodeCollectionId(id))}`
        })
    }
    return NextResponse.json({ 
        name: badge.badgeMetadata.name,
        description: badge.badgeMetadata.description, 
        image: url.protocol + "//" + url.hostname + (url.port ? ":" + url.port : "") +  "/api/zk-badge/image/" + badge.tokenId
    })
}