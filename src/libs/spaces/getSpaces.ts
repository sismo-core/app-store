import { configs } from "@/space-config";
import env from "@/src/environments";


export function getSpacesConfigs() {
  if (env.isDemo) return configs.filter(config => config.envs.find(env => env === "Demo"));
  return configs.filter(config => config.envs.find(env => env === "Prod"));
}

export function getSpaceConfig({ slug }: { slug?: string } = {}) {
  const spaces = getSpacesConfigs();
  const selectedSpace = spaces.find((space) => {
    return space.slug === slug;
  });
  return selectedSpace;
}