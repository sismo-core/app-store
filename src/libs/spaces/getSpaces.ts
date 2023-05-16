import { configs } from "@/space-config";
import { SpaceConfig } from "@/space-config/types";
import env from "@/src/environments";


export function getSpacesConfigs(): SpaceConfig[] {
  let _configs: SpaceConfig[] = configs;

  if (env.isDemo) _configs = _configs.filter(config => config.envs.find(env => env === "Demo"));
  else _configs = _configs.filter(config => config.envs.find(env => env === "Prod"))

  for (let config of _configs) {
    if (env.isDemo) config.apps = config.apps.filter(app => app.envs.find(env => env === "Demo"));
    else config.apps = config.apps.filter(app => app.envs.find(env => env === "Prod"))
  }

  return configs;
}

export function getSpaceConfig({ slug }: { slug?: string } = {}): SpaceConfig {
  const spaces = getSpacesConfigs();
  const selectedSpace = spaces.find((space) => {
    return space.slug === slug;
  });
  return selectedSpace;
}