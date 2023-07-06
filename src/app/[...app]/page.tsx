import 'server-only';
import env from "@/src/environments";
import { ClaimRequest } from "@sismo-core/sismo-connect-server";
import { notFound } from "next/navigation";
import { ZkAppType, getApps, getSpaces } from "@/src/libs/spaces";
import { GroupProvider, GroupSnapshotMetadata } from "@/src/libs/group-provider";
import AppMain from "@/src/components/AppMain";

// This function runs at build time on the server it generates the static paths for each page
export async function generateStaticParams() {
  const spaces = await getSpaces();
  type ZkAppTypeWithSpaceSlug = ZkAppType & {
    spaceSlug: string;
  };
  const apps: ZkAppTypeWithSpaceSlug[] = [];
  const claimRequests = [];

  for (const space of spaces) {
    if(!space?.apps) continue;
    for (const app of space.apps) {
      const _app = {
        ...app,
        spaceSlug: space.slug,
      };
      apps.push(_app);
      if (app?.claimRequests?.length > 0) {
        for (const claimRequest of app.claimRequests) {
          if (!claimRequests.find((el) => el?.groupId === claimRequest?.groupId)) {
            claimRequests.push(claimRequest);
          }
        }
      }
    }
  }
  return apps.map((app) => { return { app: [app.spaceSlug, app.slug]}})
}

// This function runs at build time on the server it generates the HTML metadata for each page
export async function generateMetadata({ params }: { params: { app: [string, string] } }) {
  let app: ZkAppType;
  let appImage;
  try {
    const { app: slug } = params;
    const apps = await getApps({ where: { spaceSlug: slug[0], appSlug: slug[1] } });
    if (apps.length !== 1) return notFound();
    app = apps[0];

    appImage = app.image;
    if (typeof appImage === "string") {
      appImage = appImage;
    } else {
      appImage = appImage.src;
    }
  } catch (e) {
    console.log(e);
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
export default async function AppPage({ params }: { params: { app: [string, string] } }) {
  const { app: slug } = params;
  
  const apps = await getApps({ where: { spaceSlug: slug[0], appSlug: slug[1] } });
  if (apps.length !== 1) return notFound();
  const app = apps[0];

  const groupProvider = new GroupProvider({
    hubApiUrl: env.hubApiUrl,
  });

  const groupSnapshotMetadataList: GroupSnapshotMetadata[] = [];
  if (app && app?.claimRequests?.length > 0) {
    await Promise.all(
      app?.claimRequests?.map(async (claimRequest: ClaimRequest) => {
        if (!groupSnapshotMetadataList.find((el) => el?.id === claimRequest?.groupId)) {
          const metadata = await groupProvider.getGroupSnapshotMetadata({
            groupId: claimRequest?.groupId,
            timestamp: "latest",
          });
          groupSnapshotMetadataList.push(metadata);
        }
      })
    );
  }

  return <AppMain app={app} groupSnapshotMetadataList={groupSnapshotMetadataList} />;
}
