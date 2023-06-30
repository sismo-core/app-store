import { getSpacesConfigs } from "../../../libs/spaces/getSpaces";
import getImgSrcFromConfig, {
  ImportedNextImage,
} from "@/src/utils/getImgSrcFromConfig";
import { App, SpaceConfig } from "@/space-config/types";
import ExploreSpacesMain from "@/src/components/ExploreSpacesMain";
import getSpaceConfigsFront, { AppFront, SpaceConfigFront } from "@/src/utils/getSpaceConfigsFront";

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
  const configs = getSpacesConfigs();
  const spaceConfigsFront: SpaceConfigFront[] = await getSpaceConfigsFront(configs)

  return (
      <ExploreSpacesMain configs={spaceConfigsFront} />
  );
}
