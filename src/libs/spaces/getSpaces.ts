import { configs } from "@/space-config";
import env from "@/src/environments";


export function getSpacesConfigs() {
  if (env.isDemo) return configs.filter(config => config.demoEnabled);
  return configs;
}

export function getSpaceConfig({ slug }: { slug?: string } = {}) {
  const spaces = getSpacesConfigs();
  const selectedSpace = spaces.find((space) => {
    return space.slug === slug;
  });
  return selectedSpace;
}