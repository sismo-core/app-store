import { deepSearch } from "./deepSearch";
import { AppFront } from "./getSpaceConfigsFront";

export const searchInApps = ({apps, searchString}:
 { apps: AppFront[],
  searchString: string}
): AppFront[] => {
  if (!searchString) {
    return apps;
  }
  return apps.filter((spaceConfig) =>
    deepSearch({obj: spaceConfig, searchString})
  );
};