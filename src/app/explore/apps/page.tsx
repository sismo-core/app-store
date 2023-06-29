import { getSpacesConfigs } from "../../../libs/spaces/getSpaces";
import getImgSrcFromConfig, {
  ImportedNextImage,
} from "@/src/utils/getImgSrcFromConfig";
import { App, SpaceConfig } from "@/space-config/types";
import ExploreAppsMain from "@/src/components/ExploreAppsMain";

export type SpaceImportedImage = {
  config: SpaceConfig;
  link: any;
};

export async function generateMetadata() {
  const title =
    "Sismo Spaces - Powerful Spaces for community builders who truly care";
  const description =
    "Bring joy to your community, get a Space, respect their privacy.";
  const image = `./home-thumbnail.svg`;
  return {
    title,
    description,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@sismo_eth",
      images: [image],
    },
    openGraph: {
      title,
      description,
      images: [image],
      locale: "en-US",
      type: "website",
    },
  };
}

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

export default async function ExplorePage() {
  const configs = getSpacesConfigs();

  const apps: AppFront[] = [];

  const spaceConfigsFront: SpaceConfigFront[] = await Promise.all(
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

  for (const config of spaceConfigsFront) {
    for (const app of config.apps) {
      apps.push(app)
    }
  }

  return (
      <ExploreAppsMain configs={spaceConfigsFront} apps={apps} />
  );
}
