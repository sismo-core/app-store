import getImgSrcFromConfig, {
  ImportedNextImage,
} from "@/src/utils/getImgSrcFromConfig";
import {
  getSpaceConfig,
  getSpacesConfigs,
} from "../../../libs/spaces/getSpaces";
import { App, SpaceConfig } from "@/space-config/types";
import { notFound } from "next/navigation";
import getSpaceConfigsFront, {
  SpaceConfigFront,
} from "@/src/utils/getSpaceConfigsFront";
import SpacesMain from "@/src/components/SpacesMain";

// This function runs at build time on the server it generates the static paths for each page
export async function generateStaticParams() {
  const configs = await getSpacesConfigs();
  return configs?.map((config: SpaceConfig) => {
    return {
      slug: [config.slug],
    };
  });
}

// This function runs at build time on the server it generates the HTML metadata for each page
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = params;
  const config = await getSpaceConfig({ slug: slug[0] });
  const coverImageElement = await getImgSrcFromConfig({
    configSlug: config?.slug,
    fileName: config?.coverImage,
  });
  let coverImageUrl: string;

  if (typeof coverImageElement === "string") {
    coverImageUrl = coverImageElement;
  } else {
    coverImageUrl = coverImageElement.src;
  }

  if (!config) return notFound();

  return {
    title: config.name,
    description: config.description,
    twitter: {
      card: "summary_large_image",
      title: config.name,
      description: config.description,
      creator: "@sismo_eth",
      images: [coverImageUrl],
    },
    openGraph: {
      title: config.name,
      description: config.description,
      images: [coverImageUrl],
      locale: "en-US",
      type: "website",
    },
  };
}

export type ImportedImage = {
  link: string | ImportedNextImage;
  app: App;
};

// This function runs at build time on the server it generates the HTML for each page
export default async function SpacePage({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = params;
  const config = getSpaceConfig({ slug: slug[0] });

  const spaceConfigFront: SpaceConfigFront[] = await getSpaceConfigsFront([
    config,
  ]);

  return (
    <>
      <SpacesMain config={spaceConfigFront[0]} />
    </>
  );
}
