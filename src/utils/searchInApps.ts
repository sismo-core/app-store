import { deepSearch } from "./deepSearch";
import { ZkAppType } from "../services/spaces-service";

export const searchInApps = ({apps, searchString}:
 { apps: any,
  searchString: string}
): ZkAppType[] => {
  if (!searchString) {
    return apps;
  }
  return apps.filter((spaceConfig) =>
    deepSearch({obj: spaceConfig, searchString})
  );
};