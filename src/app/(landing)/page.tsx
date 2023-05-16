
import Hero from "@/src/components/Hero";
import Spaces from "@/src/components/Spaces";
import { getSpacesConfigs } from "../../libs/spaces/getSpaces";
import getImgSrcFromConfig from "@/src/utils/getImgSrcFromConfig";
import { SpaceConfig } from "@/space-config/types";

export type SpaceImportedImage = {
  config: SpaceConfig,
  link: string
}

export default async function LandingPage() {
  const configs = await getSpacesConfigs();

  let spaceImportedImages: SpaceImportedImage[] = [];
  await Promise.all(configs.map(async config => spaceImportedImages.push({
    config: config,
      link: await getImgSrcFromConfig(
        config?.slug,
        config?.profileImage
      )
  })));

  console.log("spaceImportedImages", spaceImportedImages);

  return (<>
      <Hero />
      <Spaces configs={configs} spaceImportedImages={spaceImportedImages}/>
      </>
  );
}
