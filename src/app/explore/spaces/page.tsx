import { SpaceConfig } from "@/space-config/types";
import ExploreSpacesMain from "@/src/components/ExploreSpacesMain";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { SpaceType } from "@/src/services/spaces-service";

export type SpaceImportedImage = {
  config: SpaceConfig;
  link: any;
};

export default async function ExplorePage() {
  const spacesService = ServiceFactory.getSpacesService();

  const spaces: SpaceType[] = await spacesService.getSpaces();

  return (
      <ExploreSpacesMain spaces={spaces} />
  );
}
