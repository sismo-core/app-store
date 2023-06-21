import { SpaceConfig } from "./types";
import { theMergeContributorsConfigMain } from "@/space-config/the-merge-contributors/main";
import { privacyIsNormalConfigMain } from "@/space-config/privacy-is-normal/main";
import { aaveChanInitiativeConfigMain } from "./aave-chan-initiative/main";
import { sismoConfigMain } from "@/space-config/sismo/main";
import { theMergeContributorsConfigDemo } from "@/space-config/the-merge-contributors/demo";
import { sismoConfigDemo } from "@/space-config/sismo/demo";
import { privacyIsNormalConfigDemo } from "@/space-config/privacy-is-normal/demo";
import { aaveChanInitiativeConfigDemo } from "@/space-config/aave-chan-initiative/demo";
import { synapsConfigMain } from "./synaps/main";
import { worldcoinConfigMain } from "./worldcoin/main";

export const configsMain: SpaceConfig[] = [
  theMergeContributorsConfigMain,
  privacyIsNormalConfigMain,
  aaveChanInitiativeConfigMain,
  sismoConfigMain,
  synapsConfigMain,
  worldcoinConfigMain
];

export const configsDemo: SpaceConfig[] = [
  theMergeContributorsConfigDemo,
  sismoConfigDemo,
  privacyIsNormalConfigDemo,
  aaveChanInitiativeConfigDemo,
];
