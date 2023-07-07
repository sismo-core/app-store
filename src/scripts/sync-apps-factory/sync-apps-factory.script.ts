import { syncAppsFactory } from "./sync-apps-factory";
import env, { getEnvName } from "@/src/environments";

if (!env.isTest) {
  syncAppsFactory(`${__dirname}/../../../space-configs/${getEnvName()}`, true);
}
