import { SpaceConfig } from "@/space-config/types";
import ExploreAppsMain from "@/src/components/ExploreAppsMain";
import { getSpaces } from "@/src/libs/spaces";
import getSpaceFront, { AppFront, SpaceConfigFront } from "@/src/utils/getSpaceConfigsFront";

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

export default async function ExplorePage() {
  const spaces = getSpaces();
  const spaceConfigsFront: SpaceConfigFront[] = await getSpaceFront(spaces);
  const apps: AppFront[] = [];

  for (const config of spaceConfigsFront) {
    for (const app of config.apps) {
      apps.push(app)
    }
  }

  return (
      <ExploreAppsMain apps={apps} />
  );
}
