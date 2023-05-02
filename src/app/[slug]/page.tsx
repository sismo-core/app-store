import Image from "next/image";
import classNames from "classnames";
import styles from "./page.module.scss";
import getImgSrcFromConfig from "@/src/helpers/getImgSrcFromConfig";
import { notFound } from "next/navigation";

// This function runs at build time on the server it generates the static paths for each page
export async function generateStaticParams() {
  const stringifiedConfig = await fetch(`${process.env.API_URL}/spaces`);
  const config = await stringifiedConfig.json();
  return Object.values(config).map((space: any) => {
    return {
      slug: space.slug,
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
  const space = await fetch(`${process.env.API_URL}/spaces/` + slug)
    .then((res) => res.json())
    .catch(() => {
      notFound();
    });

  return {
    title: space.name,
    description: space.description,
  };
}

// This function runs at build time on the server it generates the HTML for each page
export default async function SpacePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  // server-side fetch of space data
  const space = await fetch(`${process.env.API_URL}/spaces/` + slug)
    .then((res) => res.json())
    .catch(() => {
      notFound();
    });

  // Dynamically import the banner image
  let banner = await getImgSrcFromConfig(space?.slug, space?.banner);

  return (
    <main className={classNames({ [styles.main]: true })}>
      <div className={styles.code}> Slug: {slug}</div>
      {space?.name && <div className={styles.card}> PAGE: {space.name}</div>}
      {space?.description && <div> DESCRIPTION: {space.description}</div>}
      {space?.banner && (
        <Image src={banner} alt={styles.name} width={500} height={300} />
      )}
    </main>
  );
}
