import getImgSrcFromConfig from "./getImgSrcFromConfig";
import { AppFront } from "./getSpaceConfigsFront";
import { SpaceType, getApp, getSpace } from "@/src/libs/spaces";

export default async function getAppFront({
  spaceSlug,
  appSlug,
}: {
  spaceSlug: string;
  appSlug: string;
}): Promise<AppFront> {


  const space = getSpace({ slug: spaceSlug });

  const app = space.apps.find((app) => {
    return app.slug === appSlug;
  });

  if (!app) return;

  const _app: AppFront = {
        ...app,
        space: space.name,
        spaceSlug: space.slug,
        image: await getImgSrcFromConfig({
          configSlug: space.slug,
          fileName: app.image as string,
        }),
        configImage: await getImgSrcFromConfig({
          configSlug: space.slug,
          fileName: space.profileImage as string,
        }),
      };


  return _app;
}
