import { ExternalAppConfig, ZkDropAppConfig, ZkSubAppConfig } from "@/space-config/types";
import styles from "./index.module.scss";
import classNames from "classnames";


export function Application({ application } : { application: ExternalAppConfig | ZkDropAppConfig | ZkSubAppConfig}) {


  return (
    <div className={styles.card}>
      Enter
    </div>
  );
}

