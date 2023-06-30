
import { deepSearch } from "./deepSearch";
import { SpaceConfigFront } from "./getSpaceConfigsFront";

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
