import { ImageConfig } from "next/dist/shared/lib/image-config";
import Image from "next/image";

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

  console.log("FILE NAME", fileName);
  if (fileName?.startsWith("http")) {
    return fileName;
  } else {
    const importedImg = await import(
      `@/space-config/${configSlug}/images/${fileName}`
    );
    return importedImg.default;
  }
}
