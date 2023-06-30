import Default from "@/src/assets/default.svg";

export type ImportedNextImage = {
  src: string;
  height: number;
  width: number;
  blurDataURL: string;
};

export default async function getImgSrcFromConfig({
  configSlug,
  fileName,
}: {
  configSlug: string;
  fileName: string;
}): Promise<string | ImportedNextImage> {
  if (!configSlug || !fileName) return "";
  if (typeof fileName !== "string") return fileName; 
  try{
    if (fileName?.startsWith("http")) {
      return fileName;
    } else {
      const importedImg = await import(
        `@/space-config/${configSlug}/images/${fileName}`
      );
      return importedImg.default;
    }
  } catch (e) {
    return Default.default;
  }

 
}
