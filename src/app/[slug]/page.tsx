
export async function generateStaticParams() {
  const stringifiedConfig = await fetch("http://localhost:3000/api/spaces");
  const config = await stringifiedConfig.json();

  return Object.values(config).map((space: any) => {
    return {
      space: space.slug,
    };
  });
}

export default async function SpacePage({ params }: { params: {slug: string} }) {
  const { slug } = params;

  const stringifiedSpace = await fetch("http://localhost:3000/api/spaces/" + slug);
  const space = await stringifiedSpace.json();

  return (
    <main>
      <div> Slug: {slug}</div>
      <div> PAGE: {space.name}</div>
      <div> DESCRIPTION: {space.description}</div>
    </main>
  );
}
