import { configs } from "@/space-config";
import { SpaceConfig, App } from "@/space-config/types";
import env from "@/src/environments";

export function getSpacesConfigs(): SpaceConfig[] {
  let _configs: SpaceConfig[] = configs;

  if (env.isDemo)
    _configs = _configs.filter((config) =>
      config.envs.find((env) => env === "Demo")
    );
  else
    _configs = _configs.filter((config) =>
      config.envs.find((env) => env === "Prod")
    );

  for (let config of _configs) {
    if (env.isDemo)
      config.apps = config.apps.filter((app) =>
        app.envs.find((env) => env === "Demo")
      );
    else
      config.apps = config.apps.filter((app) =>
        app.envs.find((env) => env === "Prod")
      );
  }

  return _configs;
}

export function getSpaceConfig({ slug }: { slug?: string } = {}): SpaceConfig {
  const spaces = getSpacesConfigs();
  const selectedSpace = spaces.find((space) => {
    return space.slug === slug;
  });
  return selectedSpace;
}

export function getApp({ slug }: { slug?: string } = {}): App {
  const spaces = getSpacesConfigs();
  const selectedApp = spaces
    .map((space) => space.apps)
    .flat()
    .find((app) => {
      return app.slug === slug;
    });
  return selectedApp;
}
