import { SpaceConfig } from "@/space-config/types";

export abstract class SpaceConfigService {
  public abstract getSpaceConfig({
    slug,
  }: {
    slug?: string;
  }): Promise<SpaceConfig>;

  public abstract getSpacesConfigs(): Promise<SpaceConfig[]>;
}
