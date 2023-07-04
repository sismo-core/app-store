import env from "@/src/environments";
import { SpaceConfig } from "./types";
import { myNewSpaceConfigMain } from "@/space-config/test-space/main"; // UPDATE HERE
import { theMergeContributorsConfigMain } from "@/space-config/the-merge-contributors/main";
import { privacyIsNormalConfigMain } from "@/space-config/privacy-is-normal/main";
import { aaveChanInitiativeConfigMain } from "./aave-chan-initiative/main";
import { sismoConfigMain } from "@/space-config/sismo/main";
import { theMergeContributorsConfigDemo } from "@/space-config/the-merge-contributors/demo";
import { sismoConfigDemo } from "@/space-config/sismo/demo";
import { privacyIsNormalConfigDemo } from "@/space-config/privacy-is-normal/demo";
import { aaveChanInitiativeConfigDemo } from "@/space-config/aave-chan-initiative/demo";

export const configsMain: SpaceConfig[] = [
  myNewSpaceConfigMain, // UPDATE HERE
  theMergeContributorsConfigMain,
  privacyIsNormalConfigMain,
  aaveChanInitiativeConfigMain,
  sismoConfigMain,
];

export const configsDemo: SpaceConfig[] = [
  theMergeContributorsConfigDemo,
  sismoConfigDemo,
  privacyIsNormalConfigDemo,
  aaveChanInitiativeConfigDemo,
];

export const spacesConfig: SpaceConfig[] = env.isDemo ? configsDemo : configsMain;
