import {  SpaceConfig } from "@/space-config/types";
import getImgSrcFromConfig from "./getImgSrcFromConfig";
import { AppFront } from "./getSpaceConfigsFront";

export default async function getAppFront({
  configs,
  slug,
}: {
  configs: SpaceConfig[];
  slug: string;
}): Promise<AppFront> {
  if(!configs) return;

  let selectedApp : AppFront;
  for (const config of configs) {
    const app = config.apps.find((app) => app.slug === slug);
    if (app) {
      const _app : AppFront = {
        ...app,
        space: config.name,
        spaceSlug: config.slug,
        image: await getImgSrcFromConfig({
          configSlug: config.slug,
          fileName: app.image as string,
        }),
        configImage: await getImgSrcFromConfig({
          configSlug: config.slug,
          fileName: config.profileImage as string,
        }),
      }

      selectedApp = _app;
      break;
    }
  }

  if(!selectedApp) return;
  return selectedApp;
}
