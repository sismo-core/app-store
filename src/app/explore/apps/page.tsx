import { SpaceConfig } from "@/space-configs/types";
import ExploreAppsMain from "@/src/components/ExploreAppsMain";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { GetAppsOptions, ZkAppType } from "@/src/services/spaces-service";

export type SpaceImportedImage = {
  config: SpaceConfig;
  link: any;
};

export default async function ExplorePage() {
  const spacesService = ServiceFactory.getSpacesService();

  const appSortOption: GetAppsOptions = {
    sortedBy: [
      { label: "createdAt", order: "desc" },
      {
        label: "endDate",
        order: "desc",
      },
    ],
  };

  const apps: ZkAppType[] = await spacesService.getApps(appSortOption);

  return (
      <ExploreAppsMain apps={apps} />
  );
}
