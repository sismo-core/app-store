import getImgSrcFromConfig, { ImportedNextImage } from "@/src/utils/getImgSrcFromConfig";
import { notFound } from "next/navigation";
import SpacesMain from "@/src/components/SpacesMain";
import { SpaceType, ZkAppType } from "@/src/services/spaces-service";
import ServiceFactory from "@/src/services/service-factory/service-factory";

// This function runs at build time on the server it generates the static paths for each page
export async function generateStaticParams() {
  const spacesService = ServiceFactory.getSpacesService();

  const spaces = await spacesService.getSpaces();
  return spaces?.map((space: SpaceType) => {
    return {
      space: space.slug,
    };
  });
}

// This function runs at build time on the server it generates the HTML metadata for each page
export async function generateMetadata({ params }: { params: { space: string } }) {
  const spacesService = ServiceFactory.getSpacesService();

  let space: SpaceType;
  let imageMetadata: string;
  try {
    const { space: slug } = params;
    const spaces = await spacesService.getSpaces({ where: { spaceSlug: slug } });
    if (!spaces || spaces.length !== 1) {
      notFound();
    }
    space = spaces[0];
    let pfpImage;
    if (typeof space?.profileImage === "string") {
      pfpImage = await getImgSrcFromConfig({
        configSlug: space?.slug,
        fileName: space?.profileImage,
      }); 
    } else {
      pfpImage = space?.profileImage
    }

    if (typeof pfpImage === "string") {
      imageMetadata = pfpImage;
    } else {
      imageMetadata = pfpImage.src;
    }

    if (!space) return notFound();
  } catch (e) {
    notFound();
  }

  return {
    title: space.name,
    description: space.description,
    twitter: {
      card: "summary_large_image",
      title: space?.name,
      description: space.description,
      creator: "@sismo_eth",
      images: [imageMetadata],
    },
    openGraph: {
      title: space.name,
      description: space.description,
      images: [imageMetadata],
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
export default async function SpacePage({ params }: { params: { space: string } }) {
  const spacesService = ServiceFactory.getSpacesService();
  
  let space: SpaceType;
  try {
    const { space: slug } = params;
    const _spaces = await spacesService.getSpaces({ where: { spaceSlug: slug } });
    if (!_spaces || _spaces?.length !== 1) {
      notFound();
    }
    space = _spaces[0];
  } catch (e) {
    notFound();
  }
  return <SpacesMain space={space} />;
}
