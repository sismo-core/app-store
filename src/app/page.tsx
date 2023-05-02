import styles from "./page.module.scss";
import Link from "next/link";
import { getBaseUrl } from "../libs/getBaseUrl";

export default async function Home() {
  console.log("Home", getBaseUrl())
  const res = await fetch(`${getBaseUrl()}/api/spaces`)
  console.log("res Home", res);
  const config = await res.json();
  console.log("config Home", config);
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
