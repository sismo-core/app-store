import { SpaceConfig } from "@/space-configs/types";
import ExploreAppsMain from "@/src/components/ExploreAppsMain";
import { ZkAppType, getApps } from "@/src/libs/spaces";

export type SpaceImportedImage = {
  config: SpaceConfig;
  link: any;
};

export default async function ExplorePage() {
  const apps: ZkAppType[] = await getApps({ sortedBy: "createdAt" });

  return (
      <ExploreAppsMain apps={apps} />
  );
}
