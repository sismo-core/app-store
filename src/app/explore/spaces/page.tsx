import { SpaceConfig } from "@/space-config/types";
import ExploreSpacesMain from "@/src/components/ExploreSpacesMain";
import { getSpaces } from "@/src/libs/spaces";
import getSpaceFront, { SpaceConfigFront } from "@/src/utils/getSpaceConfigsFront";
import { notFound } from "next/navigation";

export type SpaceImportedImage = {
  config: SpaceConfig;
  link: any;
};

export default async function ExplorePage() {
  let spacesFront: SpaceConfigFront[] = [];
  try{
    const spaces = getSpaces();
     spacesFront = await getSpaceFront(spaces)

  } catch (e) {
    notFound();
  }
  return (
      <ExploreSpacesMain configs={spacesFront} />
  );
}
