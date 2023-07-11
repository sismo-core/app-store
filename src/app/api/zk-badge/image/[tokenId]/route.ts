import ServiceFactory from "@/src/services/service-factory/service-factory";
import { ZkBadgeAppType } from "@/src/services/spaces-service";
import fs from 'fs';
import { NextResponse } from "next/server";
import path from 'path';

export async function GET(req: Request, { params }: { params: { tokenId: string } }) {
    const tokenId = params.tokenId;
    const spacesService = ServiceFactory.getSpacesService();
    let apps = await spacesService.getApps();
    apps = apps.filter(app => app.type === "zkBadge") ;
    const badge = (apps as ZkBadgeAppType[]).find(app => app.tokenId === tokenId);
    if (!badge) {
        return NextResponse.json({ 
            error: `No badge found for tokenId: ${tokenId}`
        })
    }

    let readableStream;
    try {
        const imagePath = path.join(process.cwd(), `/space-configs/images/${badge.badgeMetadata.image}`);
        const file = fs.readFileSync(imagePath);
        readableStream = new ReadableStream({
            start(controller) {
                controller.enqueue(new Uint8Array(file));
                controller.close();
            }
        });
    } catch (e) {
        return NextResponse.json({ 
            error: `No badge image found for tokenId: ${tokenId}`
        })
    }
  
    return new NextResponse(readableStream, {
        status: 200,
        headers: { 
            'Content-Type': 'image/jpeg'
        },
    })
}