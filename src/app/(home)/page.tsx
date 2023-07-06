import { getApps, getSpaces } from "../../libs/spaces/spaces";
import { SpaceType, ZkAppType } from "../../libs/spaces";
import HomeMain from "@/src/components/HomeMain";
import env from "@/src/environments";

export type SpaceImportedImage = {
  config: SpaceType;
  link: any;
};

export async function generateMetadata() {
  const title = env.isDemo
    ? "Sismo Demo App Store - Try Sismo Connect Demo Apps"
    : "Sismo App Store - Explore Sismo Connect Apps";

  const description = env.isDemo
    ? "The Sismo Demo App Store showcases demo versions of Sismo Connect Apps. Any user can experiment with these apps without requiring a wallet or Sismo Data Vault."
    : "The Sismo App Store is a central hub for discovering new Sismo Connect Apps. Users can access these apps, and builders can easily create their own from templates and add them to the Store without needing coding skill.";

  const image = env.isDemo ? "./thumbnail-demo.png" : "./thumbnail-live.png";
  const imageTwitter = env.isDemo ? "./thumbnail-demo-twitter.png" : "./thumbnail-live-twitter.png";
  return {
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@sismo_eth",
      images: [imageTwitter],
    },
    openGraph: {
      title,
      description,
      images: [image],
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function HomePage() {
  const spaces: SpaceType[] = await getSpaces();
  const apps: ZkAppType[] = await getApps({ sortedBy: "createdAt" });


  return <>{spaces && <HomeMain spaces={spaces} apps={apps}/>}</>;
}
