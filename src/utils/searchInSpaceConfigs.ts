
import { SpaceType } from "../libs/spaces";
import { deepSearch } from "./deepSearch";

export const searchInSpaceConfigs = ({
  spaceConfigs,
  searchString,
}: {
  spaceConfigs: any[];
  searchString: string;
}): SpaceType[] => {
  if (!searchString) {
    return spaceConfigs;
  }
  return spaceConfigs.filter((spaceConfig) =>
    deepSearch({ obj: spaceConfig, searchString })
  );
};
