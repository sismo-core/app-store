export default async function getImgSrcFromConfig(
  slug: string,
  fileName: string
): Promise<string> {
  if (!slug || !fileName) return '';

  if (fileName.startsWith('http')) {
    return fileName;
  } else {
    const importedImg = await import(
      `@/space-config/${slug}/images/${fileName}`
    );
    return importedImg.default;
  }
}
