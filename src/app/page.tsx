import styles from "./page.module.css";
import Link from "next/link";

export default async function Home() {
  const stringifiedConfig = await fetch("http://localhost:3000/api/spaces");
  const config = await stringifiedConfig.json();
  const spaces = Object.values(config).map((space: any) => {
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
