import getImgSrcFromConfig from "@/src/utils/getImgSrcFromConfig";
import {
  getSpaceConfig,
  getSpacesConfigs,
} from "../../../libs/spaces/getSpaces";
import SpaceProfile from "@/src/components/SpaceProfile";
import Apps from "@/src/components/Apps";
import { App } from "@/space-config/types";
import { GroupMetadata, GroupProvider } from "@/src/libs/group-provider";
import env from "@/src/environments";
import { ClaimRequest } from "@sismo-core/sismo-connect-server";

// This function runs at build time on the server it generates the static paths for each page
export async function generateStaticParams() {
  const configs = await getSpacesConfigs();
  return configs?.map((config: any) => {
    return {
      slug: config.slug,
    };
  });
}

// This function runs at build time on the server it generates the HTML metadata for each page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const config = await getSpaceConfig({ slug });

  return {
    title: config.name,
    description: config.description,
  };
}

export type ClaimRequestGroupMetadata = ClaimRequest & {
  groupMetadata: GroupMetadata;
};
export type AppImageGroupMetadata = App & {
  importedImage: string;
  claimRequests?: ClaimRequestGroupMetadata[];
};

// This function runs at build time on the server it generates the HTML for each page
export default async function SpacePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const config = await getSpaceConfig({ slug });
  // Dynamically import the cover image
  let coverImage = await getImgSrcFromConfig(config?.slug, config?.coverImage);
  let profileImage = await getImgSrcFromConfig(
    config?.slug,
    config?.profileImage
  );

  const groupProvider = new GroupProvider({
    hubApiUrl: env.hubApiUrl,
  });

  await Promise.all(
    config?.apps.map(async (app: AppImageGroupMetadata) => {
      app.importedImage = await getImgSrcFromConfig(config?.slug, app?.image);
    })
  );

  await Promise.all(
    config?.apps.map(async (app: AppImageGroupMetadata) => {
      if (app?.claimRequests?.length === 0) return;
      await Promise.all(
        app?.claimRequests?.map(
          async (claimRequest: ClaimRequestGroupMetadata) => {
            claimRequest.groupMetadata = await groupProvider.getGroupMetadata({
              groupId: claimRequest?.groupId,
              timestamp: "latest",
              revalidate: 60 * 10,
            });
          }
        )
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
        <Apps apps={config?.apps as AppImageGroupMetadata[]} />
      )}
    </>
  );
}
