import { SpaceConfig } from "./types";
import { CoolNewSpace } from "@/space-config/cool-new-space/main"; // UPDATE HERE
import { theMergeContributorsConfigMain } from "@/space-config/the-merge-contributors/main";
import { privacyIsNormalConfigMain } from "@/space-config/privacy-is-normal/main";
import { aaveChanInitiativeConfigMain } from "./aave-chan-initiative/main";
import { sismoConfigMain } from "@/space-config/sismo/main";
import { cowSwapConfigMain } from "@/space-config/cow-swap/main";
import { theMergeContributorsConfigDemo } from "@/space-config/the-merge-contributors/demo";
import { sismoConfigDemo } from "@/space-config/sismo/demo";
import { privacyIsNormalConfigDemo } from "@/space-config/privacy-is-normal/demo";
import { aaveChanInitiativeConfigDemo } from "@/space-config/aave-chan-initiative/demo";
import { cowSwapConfigDemo } from "@/space-config/cow-swap/demo";

export const configsMain: SpaceConfig[] = [
  CoolNewSpace, // UPDATE HERE
  theMergeContributorsConfigMain,
  privacyIsNormalConfigMain,
  aaveChanInitiativeConfigMain,
  sismoConfigMain,
  cowSwapConfigMain,
];

export const configsDemo: SpaceConfig[] = [
  theMergeContributorsConfigDemo,
  sismoConfigDemo,
  privacyIsNormalConfigDemo,
  aaveChanInitiativeConfigDemo,
  cowSwapConfigDemo,
];
