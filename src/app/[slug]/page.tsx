import Image from "next/image";
import classNames from "classnames";
import styles from "./page.module.scss";
import getImgSrcFromConfig from "@/src/helpers/getImgSrcFromConfig";

// This function runs at build time on the server it generates the static paths for each page
export async function generateStaticParams() {
  const stringifiedConfig = await fetch("http://localhost:3000/api/spaces");
  const config = await stringifiedConfig.json();
  return Object.values(config).map((space: any) => {
    return {
      space: space.slug,
    };
  });
}

// This function runs at build time on the server it generates the HTML metadata for each page
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = params;
//   const stringifiedSpace = await fetch(
//     "http://localhost:3000/api/spaces/" + slug
//   );
//   const space = await stringifiedSpace.json();
//   return {
//     title: space.name,
//     description: space.description,
//   };
// }

// This function runs at build time on the server it generates the HTML for each page
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
  let banner = await getImgSrcFromConfig(space.slug, space.banner)

  return (
    <main className={classNames({ [styles.main]: true })}>
      <div className={styles.code}> Slug: {slug}</div>
      <div className={styles.card}> PAGE: {space.name}</div>
      <div> DESCRIPTION: {space.description}</div>
      {space?.banner && (
        <Image src={banner} alt={styles.name} width={500} height={300} />
      )}
    </main>
  );
}
