import { SpaceConfig } from "@/space-config/types";
import ExploreAppsMain from "@/src/components/ExploreAppsMain";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { ZkAppType } from "@/src/services/spaces-service";

export type SpaceImportedImage = {
  config: SpaceConfig;
  link: any;
};

export default async function ExplorePage() {
  const spacesService = ServiceFactory.getSpacesService();

  const apps: ZkAppType[] = await spacesService.getApps({ sortedBy: "createdAt" });

  return (
      <ExploreAppsMain apps={apps} />
  );
}
