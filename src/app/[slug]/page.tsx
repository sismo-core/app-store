import Image from "next/image";

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

  const stringifiedSpace = await fetch(
    "http://localhost:3000/api/spaces/" + slug
  );
  const space = await stringifiedSpace.json();

  let banner;
  if (space.banner) {
     space.banner.startsWith("http")
      ? (banner = space.banner)
      : (banner = await import(
          `@/space-config/${slug}/images/${space.banner}`
        ));
  }

  console.log(space.banner)

  return (
    <main>
      <div> Slug: {slug}</div>
      <div> PAGE: {space.name}</div>
      <div> DESCRIPTION: {space.description}</div>
      {space.banner && <Image src={banner} alt={space.name} width={500} height={300} />}
    </main>
  );
}
