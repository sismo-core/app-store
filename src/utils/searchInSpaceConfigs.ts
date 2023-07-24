
import { SpaceType } from "../services/spaces-service";
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
