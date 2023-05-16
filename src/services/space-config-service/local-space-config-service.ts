import { SpaceConfig } from "@/space-config/types";
import { SpaceConfigService } from "./space-config-service";
import { configs } from "@/space-config";
import env from "@/src/environments";

export class LocalSpaceConfigService extends SpaceConfigService {
  public async getSpaceConfig({
    slug,
  }: {
    slug?: string;
  }): Promise<SpaceConfig> {
    const spaces = await this.getSpacesConfigs();
    const selectedSpace = spaces.find((space) => {
      return space.slug === slug;
    });
    return selectedSpace;
  }

  public async getSpacesConfigs(): Promise<SpaceConfig[]> {
    if (env.isDemo)
      return configs.filter((config) =>
        config.envs.find((env) => env === "Demo")
      );
    return configs.filter((config) =>
      config.envs.find((env) => env === "Prod")
    );
  }
}
