import getImgSrcFromConfig from "@/src/utils/getImgSrcFromConfig";
import {
  getSpaceConfig,
  getSpacesConfigs,
} from "../../../libs/spaces/getSpaces";
import SpaceProfile from "@/src/components/SpaceProfile";
import Apps from "@/src/components/Apps";
import { App } from "@/space-config/types";
import { GroupProvider } from "@/src/libs/group-provider";

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
    hubApiUrl: "https://hub.staging.zikies.io",
  });

  await Promise.all(
    config?.apps.map(async (app: App & { importedImage: string }) => {
      app.importedImage = await getImgSrcFromConfig(config?.slug, app?.image);
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
      {config?.apps && loaded && <Apps apps={config?.apps} />}
    </>
  );
}
