import getImgSrcFromConfig from "@/src/utils/getImgSrcFromConfig";
import {
  getSpaceConfig,
  getSpacesConfigs,
} from "../../../libs/spaces/getSpaces";
import SpaceProfile from "@/src/components/SpaceProfile";
import Apps from "@/src/components/Apps";
import { App, SpaceConfig } from "@/space-config/types";
import { GroupMetadata, GroupProvider } from "@/src/libs/group-provider";
import env from "@/src/environments";
import { ClaimRequest } from "@sismo-core/sismo-connect-server";
import { notFound } from "next/navigation";

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
  let coverImage = await getImgSrcFromConfig(config?.slug, config?.coverImage);

  if (!config) return notFound();

  return {
    title: config.name,
    description: config.description,
    twitter: {
      card: 'summary_large_image',
      title: config.name,
      description: config.description,
      creator: '@sismo_eth',
      images: [coverImage],
    },
    openGraph: {
      title: config.name,
      description: config.description,
      images: ["https://i.imgur.com/ejGRXen.png"],
      locale: 'en-US',
      type: 'website',
    },
  };
}

export type ImportedImage = {
  link: string;
  app: App;
};

// This function runs at build time on the server it generates the HTML for each page
export default async function SpacePage({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = params;
  const config = await getSpaceConfig({ slug: slug[0] });
  // Dynamically import the cover image
  let coverImage = await getImgSrcFromConfig(config?.slug, config?.coverImage);
  let profileImage = await getImgSrcFromConfig(
    config?.slug,
    config?.profileImage
  );

  const groupProvider = new GroupProvider({
    hubApiUrl: env.hubApiUrl,
  });

  const importedImages: ImportedImage[] = [];
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
  await Promise.all(
    config?.apps.map(async (app: App) => {
      if (app?.claimRequests?.length === 0) return;
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
