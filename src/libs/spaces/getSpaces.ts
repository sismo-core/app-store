import { configs } from "@/space-config";

export function getSpaces() {
  return configs;
}

export function getSpace({ slug }: { slug?: string } = {}) {
    const spaces = getSpaces();
    const selectedSpace = spaces.find((space) => {
      return space.slug === slug;
    });
    return selectedSpace;
}