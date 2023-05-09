import getImgSrcFromConfig from "@/src/utils/getImgSrcFromConfig";
import { getSpaceConfig, getSpacesConfigs } from "../../../libs/spaces/getSpaces";
import SpaceProfile from "@/src/components/SpaceProfile";
import Apps from "@/src/components/Apps";
import { App, SpaceConfig } from "@/space-config/types";

// This function runs at build time on the server it generates the static paths for each page
export async function generateStaticParams() {
  const configs = await getSpacesConfigs();
  return configs?.map((config: SpaceConfig) => {
    return {
      slug: [config.slug]
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

  return {
    title: config.name,
    description: config.description,
  };
}

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

  return (
    <main>
      <SpaceProfile config={config} coverImage={coverImage}/>
      <Apps config={config} appSlug={slug[1]}/>
    </main>
  );
}
