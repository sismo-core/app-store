import { configs } from "@/space-config";
import env from "@/src/environments";

export function getSpaces() {
  if (env.isDemo) return configs.filter(config => config.demoEnabled);
  return configs;
}

export function getSpace({ slug }: { slug?: string } = {}) {
  const spaces = getSpaces();
  const selectedSpace = spaces.find((space) => {
    return space.slug === slug;
  });
  return selectedSpace;
}