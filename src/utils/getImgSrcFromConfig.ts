export default async function getImgSrcFromConfig(
  slug: string,
  fileName: string
): Promise<string | HTMLImageElement> {

  if (!slug || !fileName) return "";

  console.log("FILE NAME", fileName)
  if (fileName?.startsWith("http")) {
    return fileName;
  } else {
    const importedImg = await import(
      `@/space-config/${slug}/images/${fileName}`
    );
    return importedImg.default;
  }
}
