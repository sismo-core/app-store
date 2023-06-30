import { App, SpaceConfig } from "@/space-config/types";
import getImgSrcFromConfig, { ImportedNextImage } from "./getImgSrcFromConfig";

export type AppFront = Omit<App, "image"> & {
  space: string;
  spaceSlug: string;
  image: string | ImportedNextImage;
  configImage: string | ImportedNextImage;
};

export type SpaceConfigFront = Omit<
  SpaceConfig,
  "apps" | "profileImage" | "coverImage"
> & {
  profileImage: string | ImportedNextImage;
  coverImage: string | ImportedNextImage;
  apps: AppFront[];
};

export default async function getSpaceConfigsFront(configs: SpaceConfig[]) : Promise<SpaceConfigFront[]> {
  return await Promise.all(
    configs.map(async (config) => {
      const profileImage = await getImgSrcFromConfig({
        configSlug: config.slug,
        fileName: config.profileImage,
      });
      const coverImage = await getImgSrcFromConfig({
        configSlug: config.slug,
        fileName: config.coverImage,
      });
      const apps: AppFront[] = await Promise.all(config.apps.map(async (app) => {
        return {
          ...app,
          space: config.name,
          spaceSlug: config.slug,
          image: await getImgSrcFromConfig({
            configSlug: config.slug,
            fileName: app.image,
          }),
          configImage: profileImage,
        };
      }));
      const configFront: SpaceConfigFront = {
        ...config,
        profileImage,
        coverImage: coverImage,
        apps,
      };
  
      return configFront;
    })
  );



}



