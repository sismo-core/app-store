import { SpaceConfig } from "@/space-configs/types";
import ExploreSpacesMain from "@/src/components/ExploreSpacesMain";
import { SpaceType, getSpaces } from "@/src/libs/spaces";

export type SpaceImportedImage = {
  config: SpaceConfig;
  link: any;
};

export default async function ExplorePage() {
  const spaces: SpaceType[] = await getSpaces();

  return (
      <ExploreSpacesMain spaces={spaces} />
  );
}
