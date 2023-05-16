import getImgSrcFromConfig, { ImportedNextImage } from "@/src/utils/getImgSrcFromConfig";
import SpaceProfile from "@/src/components/SpaceProfile";
import Apps from "@/src/components/Apps";
import { App, SpaceConfig } from "@/space-config/types";
import { GroupMetadata, GroupProvider } from "@/src/services/group-provider";
import env from "@/src/environments";
import { ClaimRequest } from "@sismo-core/sismo-connect-server";
import { notFound } from "next/navigation";
import getServerServices from "@/src/services/service-factory/server";

// This function runs at build time on the server it generates the static paths for each page
export async function generateStaticParams() {
  
  const configs = await getServerServices().spaceConfig.getSpacesConfigs();
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
  const config = await getServerServices().spaceConfig.getSpaceConfig({ slug: slug[0] });
  const coverImageElement = await getImgSrcFromConfig(
    config?.slug,
    config?.coverImage
  );
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
  const services = getServerServices();
  const groupProvider = services.groupProvider;
  const spaceConfig = services.spaceConfig;
  
  const config = await spaceConfig.getSpaceConfig({ slug: slug[0] });
  // Dynamically import the cover image
  let coverImage = await getImgSrcFromConfig(config?.slug, config?.coverImage);
  let profileImage = await getImgSrcFromConfig(
    config?.slug,
    config?.profileImage
  );



  const importedImages: ImportedImage[] = [];
  if (config?.apps)
    await Promise.all(
      config?.apps.map(async (app: App) => {
        const image = await getImgSrcFromConfig(config?.slug, app?.image);
        importedImages.push({
          app,
          link: image,
        });
      })
    );

  const groupMetadataList: GroupMetadata[] = [];
  if (config?.apps)
    await Promise.all(
      config?.apps.map(async (app: App) => {
        if (!app?.claimRequests?.length) return;
        await Promise.all(
          app?.claimRequests?.map(async (claimRequest: ClaimRequest) => {
            if (
              !groupMetadataList.find((el) => el.id === claimRequest?.groupId)
            ) {
              const metadata = await groupProvider.getGroupMetadata({
                groupId: claimRequest?.groupId,
                timestamp: "latest",
                revalidate: 60 * 10,
              });
              groupMetadataList.push(metadata);
            }
          })
        );
      })
    );

  const loaded = true;

  return (
    <>
      {config && coverImage && profileImage && (
        <SpaceProfile
          config={config}
          coverImage={coverImage}
          profileImage={profileImage}
        />
      )}
      {config?.apps && loaded && (
        <Apps
          config={config}
          appSlug={slug[1]}
          importedImages={importedImages}
          groupMetadataList={groupMetadataList}
        />
      )}
    </>
  );
}
