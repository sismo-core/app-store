import styles from "./page.module.scss";
import Link from "next/link";
import { getSpaces } from "./api/spaces/getSpaces";

export default async function Home() {
  const spaces = await getSpaces();

  console.log("spaces", spaces);

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {spaces && spaces?.map((space: any) => {
          if (space.slug)
            return <Link
              key={space.slug}
              href={space.slug}
              className={styles.card}
            >
              <h2>
                {space.name} <span>-&gt;</span>
              </h2>
              <p>{space.description}</p>
            </Link>
        })}
      </div>
    </main>
  );
}
