import env from "@/src/environments";
import { ClaimRequest } from "@sismo-core/sismo-connect-server";
import { notFound } from "next/navigation";
import { SpaceType, ZkAppType, getSpaces } from "@/src/libs/spaces";
import getAppFront from "@/src/utils/getAppFront";
import { GroupMetadata, GroupProvider } from "@/src/libs/group-provider";
import AppMain from "@/src/components/AppMain";
import { AppFront } from "@/src/utils/getSpaceConfigsFront";

// This function runs at build time on the server it generates the static paths for each page
export async function generateStaticParams() {
  const configs = getSpaces();
  return configs?.map((config: SpaceType) => {
    config.apps.map((app: ZkAppType) => {
      return {
        params: {
          appSlug: app.slug,
        },
      };
    });
  });
}

// This function runs at build time on the server it generates the HTML metadata for each page
export async function generateMetadata({
  params,
}: {
  params: { appSlug: string; spaceSlug: string };
}) {
  let app: AppFront;
  let appImage;
  try {
    const { appSlug, spaceSlug } = params;
    app = await getAppFront({ appSlug: appSlug, spaceSlug: spaceSlug });

    appImage = app.image;
    if (typeof appImage === "string") {
      appImage = appImage;
    } else {
      appImage = appImage.src;
    }
    if (!app) return notFound();
  } catch (e) {
    notFound();
  }

  return {
    title: app.name,
    description: app.description,
    twitter: {
      card: "summary_large_image",
      title: app.name,
      description: app.description,
      creator: "@sismo_eth",
      images: [appImage],
    },
    openGraph: {
      title: app.name,
      description: app.description,
      images: [appImage],
      locale: "en-US",
      type: "website",
    },
  } as any;
}

// This function runs at build time on the server it generates the HTML for each page
export default async function SpacePage({
  params,
}: {
  params: { appSlug: string; spaceSlug: string };
}) {
  const { appSlug, spaceSlug } = params;
  const app = await getAppFront({ appSlug: appSlug, spaceSlug: spaceSlug });
  const groupProvider = new GroupProvider({
    hubApiUrl: env.hubApiUrl,
  });

  const groupMetadataList: GroupMetadata[] = [];
  if (app && app?.claimRequests?.length > 0) {
   await Promise.all(
      app?.claimRequests?.map(async (claimRequest: ClaimRequest) => {
        if (!groupMetadataList.find((el) => el.id === claimRequest?.groupId)) {
          const metadata = await groupProvider.getGroupMetadata({
            groupId: claimRequest?.groupId,
            timestamp: "latest",
            revalidate: 60 * 60 * 12, // 12 hours
          });
          groupMetadataList.push(metadata);
        }
      })
    );
  }

  return <AppMain app={app} groupMetadataList={groupMetadataList} />;
}
