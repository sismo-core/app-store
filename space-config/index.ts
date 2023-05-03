import { SpaceConfig } from "./types";
import { aaveConfig } from "./aave";
import { sismoContributorsConfig } from "./sismo-contributors";
import { demoSpaceConfig } from "./demo-space";
import { sismoConfig } from "./sismo";

export const configs: SpaceConfig[] = [
    aaveConfig,
    sismoContributorsConfig,
    sismoConfig,
    demoSpaceConfig
]
