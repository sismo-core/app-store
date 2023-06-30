import App from "next/app";
import { deepSearch } from "./deepSearch";
import { AppFront } from "./getSpaceConfigsFront";

export const searchInApps = ({apps, searchString}:
 { apps: any,
  searchString: string}
): AppFront[] => {
  if (!searchString) {
    return apps;
  }
  return apps.filter((spaceConfig) =>
    deepSearch({obj: spaceConfig, searchString})
  );
};