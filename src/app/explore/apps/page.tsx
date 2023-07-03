import { SpaceConfig } from "@/space-config/types";
import ExploreAppsMain from "@/src/components/ExploreAppsMain";
import { getSpaces } from "@/src/libs/spaces";
import getSpaceFront, { AppFront, SpaceConfigFront } from "@/src/utils/getSpaceConfigsFront";
import { notFound } from "next/navigation";

export type SpaceImportedImage = {
  config: SpaceConfig;
  link: any;
};

export default async function ExplorePage() {
  const apps: AppFront[] = [];

  try{
    const spaces = getSpaces();
    const spaceConfigsFront: SpaceConfigFront[] = await getSpaceFront(spaces);
  
    for (const config of spaceConfigsFront) {
      for (const app of config.apps) {
        apps.push(app)
      }
    }

    apps.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime() ;
   });

  } catch(e) {
    notFound();
  }

  return (
      <ExploreAppsMain apps={apps} />
  );
}
