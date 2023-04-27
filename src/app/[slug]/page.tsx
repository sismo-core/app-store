import Image from "next/image";
import classes from "./page.module.scss";

// This function runs at build time on the server
export async function generateStaticParams() {
  const stringifiedConfig = await fetch("http://localhost:3000/api/spaces");
  const config = await stringifiedConfig.json();

  return Object.values(config).map((space: any) => {
    return {
      space: space.slug,
    };
  });
}

export default async function SpacePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // server-side fetch of space data
  const stringifiedSpace = await fetch(
    "http://localhost:3000/api/spaces/" + slug
  );
  const space = await stringifiedSpace.json();

  // Dynamically import the banner image
  let banner;
  if (space?.banner) {
     space.banner.startsWith("http")
      ? (banner = space.banner)
      : (banner = await import(
          `@/space-config/${slug}/images/${space.banner}`
        ));
  }

  return (
    <main className={classes.main}>
      <div className={classes.code}> Slug: {slug}</div>
      <div className={classes.card}> PAGE: {space.name}</div>
      <div> DESCRIPTION: {space.description}</div>
      {space?.banner && <Image src={banner} alt={space.name} width={500} height={300} />}
    </main>
  );
}
