import env, { getEnvName } from "@/src/environments";
import { syncAppsFactory } from "./sync-apps-factory";

if (!env.isTest) {
  syncAppsFactory(`${__dirname}/../../../space-configs/${getEnvName()}`, true);
}
