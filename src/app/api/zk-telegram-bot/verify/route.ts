import { NextResponse } from "next/server";
import { ZkAppType, ZkTelegramBotAppType, getApps, getSpace } from "@/src/libs/spaces";
import {
  AuthType,
  SismoConnect,
  SismoConnectResponse,
  SismoConnectConfig,
} from "@sismo-core/sismo-connect-server";
import env from "@/src/environments";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { getImpersonateAddresses } from "@/src/utils/getImpersonateAddresses";
import { errorResponse } from "@/src/libs/helper/api";

export async function POST(req: Request) {
  const logger = ServiceFactory.getLoggerService();
  const userStore = ServiceFactory.getZkTelegramBotUserStore();
  const { response, spaceSlug, appSlug } = await req.json();

  const space = await getSpace({ slug: spaceSlug });
  const apps = await getApps({ where: { appSlug: appSlug, spaceSlug: space.slug } });
  if (!apps || apps.length !== 1) {
    return errorResponse(`Failed to find app ${appSlug} in space ${spaceSlug}`);
  }
  const app = apps[0] as ZkTelegramBotAppType;

  try {
    const telegramId = await sismoConnectVerifyResponse(app, response);
    const isUserAlreadySaved = await userStore.exists({ userId: telegramId, appSlug });
    if (isUserAlreadySaved) {
      logger.debug(`User ${telegramId} is already approved`);
      return NextResponse.json({ status: "already-approved" });
    }

    const entry = {
      appSlug: app.slug,
      userId: telegramId,
    };
    logger.debug(`Adding ${JSON.stringify(entry)}`);
    await userStore.add(entry);
    return NextResponse.json({ status: "approved" });
  } catch (error) {
    return errorResponse(`Failed to add to the whitelist: ${error.message}`);
  }
}

const sismoConnectVerifyResponse = async (
  app: ZkTelegramBotAppType,
  response: SismoConnectResponse
): Promise<string> => {
  const config: SismoConnectConfig = {
    appId: app.appId,
  };
  if (env.isDemo) {
    config.vault = {
      impersonate: getImpersonateAddresses(app as ZkAppType),
    };
  }

  const sismoConnect = SismoConnect({ config });
  const verifyParams = {
    claims: app.claimRequests,
    auths: app.authRequests,
  };
  const result = await sismoConnect.verify(response, verifyParams);
  return result.getUserId(AuthType.TELEGRAM);
};
