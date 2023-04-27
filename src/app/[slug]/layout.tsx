import Link from "next/link";
import classes from "./page.module.scss";

export default function SpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Link href="/" className={classes.card} style={{ marginLeft: 30 }}>
        BACK HOME
      </Link>
      {children}
    </section>
  );
}
