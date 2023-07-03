import getImgSrcFromConfig from "./getImgSrcFromConfig";
import { AppFront } from "./getSpaceConfigsFront";
import { SpaceType } from "@/src/libs/spaces";

export default async function getAppFront({
  spaces,
  slug,
}: {
  spaces: SpaceType[];
  slug: string;
}): Promise<AppFront> {
  if (!spaces) return;

  let selectedApp: AppFront;
  for (const config of spaces) {
    const app = config.apps.find((app) => app.slug === slug);
    if (app) {
      const _app: AppFront = {
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
      };

      selectedApp = _app;
      break;
    }
  }

  if (!selectedApp) return;
  return selectedApp;
}
