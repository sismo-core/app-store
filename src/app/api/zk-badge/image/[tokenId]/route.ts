import { error404Response } from "@/src/libs/helper/api";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { ZkBadgeAppType } from "@/src/services/spaces-service";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { tokenId: string } }) {
  const tokenId = params.tokenId;
  const spacesService = ServiceFactory.getSpacesService();
  let apps = await spacesService.getApps();
  apps = apps.filter((app) => app.type === "zkBadge");
  const badge = (apps as ZkBadgeAppType[]).find((app) => app.tokenId === tokenId);
  if (!badge) {
    return error404Response(`No badge found for tokenId: ${tokenId}`);
  }

  try {
    const imagePath = `${__dirname}/../../../../../../space-configs/images/${badge.badgeMetadata.image}`;
    const file = fs.readFileSync(imagePath);
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (e) {
    return error404Response(`No image found for badge tokenId: ${tokenId}`);
  }
}
