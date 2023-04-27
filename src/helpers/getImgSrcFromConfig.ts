import { SpaceConfig } from "@/space-config/space-config.types";

export default async function getImgSrcFromConfig(
  slug: string,
  fileName: string
): Promise<string> {
  if (!slug || !fileName) return "";

  return fileName.startsWith("http")
    ? fileName
    : await import(`@/space-config/${slug}/images/${fileName}`);
}
