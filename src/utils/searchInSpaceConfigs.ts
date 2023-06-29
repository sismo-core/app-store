import { SpaceConfigFront } from "../app/(home)/page";
import { deepSearch } from "./deepSearch";

export const searchInSpaceConfigs = ({
  spaceConfigs,
  searchString,
}: {
  spaceConfigs: SpaceConfigFront[];
  searchString: string;
}): SpaceConfigFront[] => {
  if (!searchString) {
    return spaceConfigs;
  }
  return spaceConfigs.filter((spaceConfig) =>
    deepSearch({ obj: spaceConfig, searchString })
  );
};
