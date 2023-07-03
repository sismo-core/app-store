import getImgSrcFromConfig, {
  ImportedNextImage,
} from "@/src/utils/getImgSrcFromConfig";
import { notFound } from "next/navigation";
import getSpaceFront, {
  SpaceConfigFront,
} from "@/src/utils/getSpaceConfigsFront";
import SpacesMain from "@/src/components/SpacesMain";
import { SpaceType, ZkAppType, getSpace, getSpaces } from "@/src/libs/spaces";

// This function runs at build time on the server it generates the static paths for each page
export async function generateStaticParams() {
  const spaces = getSpaces();
  return spaces?.map((space: SpaceType) => {
    return {
      spaceSlug: space.slug,
    };
  });
}

// This function runs at build time on the server it generates the HTML metadata for each page
export async function generateMetadata({
  params,
}: {
  params: { spaceSlug: string };
}) {
  let space : SpaceType;
  let coverImageUrl: string;
  try{
    const { spaceSlug } = params;
    const space =  getSpace({ slug: spaceSlug });
    const coverImageElement = await getImgSrcFromConfig({
      configSlug: space?.slug,
      fileName: space?.coverImage,
    });
  
    if (typeof coverImageElement === "string") {
      coverImageUrl = coverImageElement;
    } else {
      coverImageUrl = coverImageElement.src;
    }
  
    if (!space) return notFound();
  } catch(e) {
    notFound();
  }

  return {
    title: space.name,
    description: space.description,
    twitter: {
      card: "summary_large_image",
      title: space.name,
      description: space.description,
      creator: "@sismo_eth",
      images: [coverImageUrl],
    },
    openGraph: {
      title: space.name,
      description: space.description,
      images: [coverImageUrl],
      locale: "en-US",
      type: "website",
    },
  };
}

export type ImportedImage = {
  link: string | ImportedNextImage;
  app: ZkAppType;
};

// This function runs at build time on the server it generates the HTML for each page
export default async function SpacePage({
  params,
}: {
  params: { spaceSlug: string };
}) {
  let spaceFront: SpaceConfigFront;
  try{
  const {spaceSlug} = params;
  const _space = getSpace({ slug: spaceSlug });
  const spaceConfigFront: SpaceConfigFront[] = await getSpaceFront([
    _space,
  ]);
  spaceFront = spaceConfigFront[0];
  } catch(e) {
    notFound();
  }

  return (
    <>
      <SpacesMain config={spaceFront} />
    </>
  );
}
