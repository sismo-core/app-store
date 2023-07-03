import { getSpaces } from "../../libs/spaces/getSpaces";
import { SpaceType } from "../../libs/spaces";
import getSpaceFront, { AppFront, SpaceConfigFront } from "@/src/utils/getSpaceConfigsFront";
import HomeMain from "@/src/components/HomeMain";

export type SpaceImportedImage = {
  config: SpaceType,
  link: any
}

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


export default async function HomePage() {
  const spaces = getSpaces();
  const spacesFront: SpaceConfigFront[] = await getSpaceFront(spaces);
  
  const apps: AppFront[] = [];
  for (const config of spacesFront) {
    for (const app of config.apps) {
      apps.push(app)
    }
  }

  return (
    <>
     {spacesFront && <HomeMain configs={spacesFront} apps={apps} />}
    </>
  );
}
