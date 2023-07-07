import { SpaceConfig } from "./types";
import { theMergeContributorsConfigMain } from "@/space-configs/main/the-merge-contributors";
import { privacyIsNormalConfigMain } from "@/space-configs/main/privacy-is-normal";
import { aaveChanInitiativeConfigMain } from "./main/aave-chan-initiative";
import { sismoConfigMain } from "@/space-configs/main/sismo";
import { cowSwapConfigMain } from "@/space-configs/main/cow-swap";
import { theMergeContributorsConfigDemo } from "@/space-configs/demo/the-merge-contributors";
import { sismoConfigDemo } from "@/space-configs/demo/sismo";
import { privacyIsNormalConfigDemo } from "@/space-configs/demo/privacy-is-normal";
import { aaveChanInitiativeConfigDemo } from "@/space-configs/demo/aave-chan-initiative";
import { cowSwapConfigDemo } from "@/space-configs/demo/cow-swap";

export const configsMain: SpaceConfig[] = [
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
