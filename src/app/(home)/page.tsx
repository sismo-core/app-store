import Hero from "@/src/components/Hero";
import Spaces from "@/src/components/Spaces";
import { getSpacesConfigs } from "../../libs/spaces/getSpaces";
import getImgSrcFromConfig from "@/src/utils/getImgSrcFromConfig";
import { SpaceConfig } from "@/space-config/types";

export type SpaceImportedImage = {
  config: SpaceConfig,
  link: any
}

export async function generateMetadata() {
  const title = "Sismo Spaces - Powerful Spaces for community builders who truly care";
  const description = "Bring joy to your community, get a Space, respect their privacy.";
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

export default async function HomePage() {
  const configs = await getSpacesConfigs();

  let spaceImportedImages: SpaceImportedImage[] = [];
  await Promise.all(configs.map(async config => spaceImportedImages.push({
    config: config,
      link: await getImgSrcFromConfig(
        config?.slug,
        config?.profileImage
      )
  })));

  return (<>
      <Hero />
      <Spaces configs={configs} spaceImportedImages={spaceImportedImages}/>
      </>
  );
}
