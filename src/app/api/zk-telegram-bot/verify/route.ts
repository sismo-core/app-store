import { NextResponse } from "next/server";
import { getSpaceConfig, getSpacesConfigs } from "@/src/libs/spaces";
import { ZkTelegramBotAppConfig } from "@/space-config/types";
import { 
  AuthType, 
  SismoConnect, 
  SismoConnectResponse, 
  SismoConnectConfig, 
  SismoConnectVerifiedResult 
} from "@sismo-core/sismo-connect-server";
import env from "@/src/environments";
import { getUserStore } from "@/src/libs/user-store";
import { UserStore } from "@/src/libs/user-store/store";

export async function POST(req: Request) {
  const { response, spaceSlug, appSlug } = await req.json();
  
  const space = getSpaceConfig({ slug: spaceSlug })
  const app = space?.apps?.find(_app => _app.type === "zkTelegramBot" && _app.slug === appSlug) as ZkTelegramBotAppConfig;
  if (!app) { 
    return errorResponse(`Failed to find app ${appSlug} in space ${spaceSlug}`);
  }

  if (env.isDemo) {
    return approvedResponse();
  }

  let result: SismoConnectVerifiedResult;
  try {
    result = await verifyResponse(app, response);
  } catch (error) {
    return errorResponse(`Failed to verify ZK-Proof: ${error.message}`);
  }

  try {
    const userStore = getUserStore();

    const telegramId = result.getUserId(AuthType.TELEGRAM);
    if (await isAlreadyApproved(userStore, telegramId)) {
      if (env.isDev) { console.info(`User ${telegramId} is already approved`); }
      return approvedResponse(true);
    }
    const entry = {
      appSlug: app.slug,
      userId: telegramId 
    };
    if (env.isDev) { console.info(`Adding ${JSON.stringify(entry)}`) };
    await userStore.add(entry);

    return approvedResponse();
  } catch (error) {
    return errorResponse(`Failed to add to the whitelist: ${error.message}`);
  }
}

const verifyResponse = async (
  app: ZkTelegramBotAppConfig, 
  response: SismoConnectResponse
): Promise<SismoConnectVerifiedResult> => {
  const config: SismoConnectConfig = { 
    appId: env.isDemo ? app.demo.appId : app.appId 
  };
  const sismoConnect = SismoConnect({ config });
  const verifyParams = { 
    claims: app.claimRequests,
    auths: app.authRequests 
  };
  return await sismoConnect.verify(response, verifyParams);
}

const isAlreadyApproved = async (store: UserStore, telegramId: string): Promise<boolean> => {
  const users = await store.getUsers({ userId: telegramId });
  return users.length > 0;
}

const errorResponse = (message: string): Response => {
  if (env.isDev) { console.error(message); }
  return NextResponse.json({
    status: "error",
    message: message
  });
}

const approvedResponse = (isAlreadyApproved: boolean = false): Response => {
  return NextResponse.json({ 
    status: isAlreadyApproved ? "already-approved" : "approved"
  });
}