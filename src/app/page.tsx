import styles from "./page.module.scss";
import Link from "next/link";
import { getSpaces } from "./api/spaces/getSpaces";

export default async function Home() {
  const spaces = Object.values(await getSpaces()).map((space: any) => {
    return space;
  });

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {spaces?.map((space: any) => (
          <Link
            key={space.slug}
            href={space.slug}
            className={styles.card}
          >
            <h2>
              {space.name} <span>-&gt;</span>
            </h2>
            <p>{space.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
