import { AppFront } from "../app/(home)/page"
import { deepSearch } from "./deepSearch";

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