import { App, SpaceConfig } from "@/space-config/types";
import getImgSrcFromConfig from "./getImgSrcFromConfig";
import { searchInSpaceConfigs } from "./searchInSpaceConfigs";
import { searchInApps } from "./searchInApps";
import { AppFront, SpaceConfigFront } from "./getSpaceConfigsFront";

export default async function getAppFront({
  configs,
  slug,
}: {
  configs: SpaceConfig[];
  slug: string;
}): Promise<AppFront> {
  const config = searchInSpaceConfigs({
    spaceConfigs: configs,
    searchString: slug,
  })[0];

  const app = searchInApps({
    apps: config.apps,
    searchString: slug,
  })[0] as AppFront;

  const profileImage = await getImgSrcFromConfig({
    configSlug: config.slug,
    fileName: config.profileImage as string,
  });

  app.image = await getImgSrcFromConfig({
    configSlug: config.slug,
    fileName: app.image as string,
  });
  app.space = config.name;
  app.spaceSlug = config.slug;
  app.configImage = profileImage;
  return app;
}
