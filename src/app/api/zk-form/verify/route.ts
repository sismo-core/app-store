import env from "@/src/environments";
import { TableStore } from "@/src/services/table-store";
import {
  AuthType,
  SismoConnect,
  SismoConnectResponse,
  SismoConnectConfig,
  SismoConnectVerifiedResult,
  SismoConnectServerOptions,
} from "@sismo-core/sismo-connect-server";
import { NextResponse } from "next/server";
import { mapAuthTypeToSheetColumnName } from "@/src/utils/mapAuthTypeToSheetColumnName";
import { getImpersonateAddresses } from "@/src/utils/getImpersonateAddresses";
import { ZkAppType, ZkFormAppType } from "@/src/services/spaces-service/types";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import { errorResponse } from "@/src/libs/helper/api";
import { isClaimEquals } from "@/src/app/api/zk-form/verify/helper";
import { JsonRpcProviderMock } from "@/src/libs/helper/json-rpc-provider-mock";

export type Field = {
  name: string;
  value: string;
};

export async function POST(req: Request) {
  const { fields, response, spaceSlug, appSlug } = await req.json();
  const store = ServiceFactory.getZkFormTableStore();
  const spacesService = ServiceFactory.getSpacesService();

  const apps = await spacesService.getApps({ where: { appSlug: appSlug, spaceSlug: spaceSlug } });

  if (!apps || apps.length !== 1 || apps[0].type !== "zkForm") {
    return errorResponse(`App ${appSlug} not found or not a zkForm app`);
  }
  const app = apps[0];

  const headers = computeHeaders(app);
  const row = [];
  await store.createColumns(app.spreadsheetId, headers);

  let result: SismoConnectVerifiedResult;
  try {
    result = await verifyResponse(app, response);
  } catch (error) {
    return errorResponse(`Invalid ZK Proof ${error.message}`);
  }

  // if AuthType.VAULT is present, we use it as a nullifier
  if (needVaultAuth(app)) {
    const vaultId = await result.getUserId(AuthType.VAULT);
    if (!vaultId) return errorResponse("No Vault Id");

    const isExist = await isVaultAlreadySaved(app, store, vaultId);
    if (isExist) return NextResponse.json({ status: "already-subscribed" });
  }

  if (app.authRequests?.length > 0) {
    for (let authRequest of app.authRequests) {
      const userId = await result.getUserId(authRequest.authType);
      if (!userId && !authRequest.isOptional) return errorResponse(`No ${authRequest.authType} Id`);

      if (authRequest.authType === AuthType.VAULT || app.saveAuths) {
        row.push(userId ?? "");
      }
    }
  }

  if (app.saveClaims && app.claimRequests?.length > 0) {
    const claimsAdded = [];
    for (let claimRequest of app.claimRequests) {
      if (!claimRequest.isSelectableByUser) claimRequest.isSelectableByUser = false;
      const claims = result.claims.filter((claim) => isClaimEquals(claim, claimRequest));
      const currentClaimAdded = claimsAdded.filter((claim) => isClaimEquals(claim, claimRequest));
      claimsAdded.push(claimRequest);
      const value = claims.length > 0 ? claims[currentClaimAdded.length]?.value : null;
      row.push(value ?? "");
    }
  }

  for (const fieldName of getAppColumns(app)) {
    row.push(fields?.find((el) => el.name === fieldName)?.value ?? "");
  }

  await store.addRow(app.spreadsheetId, row);

  return NextResponse.json({
    status: "subscribed",
  });
}

const isVaultAlreadySaved = async (
  app: ZkFormAppType,
  store: TableStore,
  vaultId: string
): Promise<boolean> => {
  if (env.isDemo) return false;
  const columns = computeHeaders(app);
  const vaultIdColumnIndex = columns.findIndex((el) => el === "VaultId");
  const vaultIdsColumn = await store.getColumn(app.spreadsheetId, vaultIdColumnIndex);
  return vaultIdsColumn.filter((el) => el === vaultId).length > 0;
};

const computeHeaders = (app: ZkFormAppType): string[] => {
  return [...getAuthColumns(app), ...getClaimColumns(app), ...getAppColumns(app)];
};

const getAuthColumns = (app: ZkFormAppType): string[] => {
  let authColumns = needVaultAuth(app) ? ["VaultId"] : [];
  if (app.saveAuths)
    authColumns = app.authRequests.map((authRequest) =>
      mapAuthTypeToSheetColumnName(authRequest.authType)
    );
  return authColumns;
};
const getClaimColumns = (app: ZkFormAppType): string[] => {
  let claimColumns = [];
  if (app.saveClaims) claimColumns = app.claimRequests.map((claimRequest) => claimRequest.groupId);
  return claimColumns;
};
const getAppColumns = (app: ZkFormAppType): string[] => {
  return app?.fields ? app?.fields.map((el) => el.label) : [];
};

const needVaultAuth = (app: ZkFormAppType): boolean => {
  if (!app.authRequests) return null;
  const authRequest = app.authRequests.find((el) => el.authType === AuthType.VAULT);
  return Boolean(authRequest);
};

const verifyResponse = async (
  app: ZkFormAppType,
  response: SismoConnectResponse
): Promise<SismoConnectVerifiedResult> => {
  const config: SismoConnectConfig = {
    appId: env.isDev ? "0x4c40e70b081752680ce258ad321f9e58" : app.appId,
  };

  if (env.isDemo || env.isTest) {
    config.vault = {
      impersonate: getImpersonateAddresses(app as ZkAppType),
    };
  }

  // todo should be handled in a better way (code should not be aware of env)
  let options: SismoConnectServerOptions = {
    ...(env.isTest
      ? {
          // mocked provider to avoid checking the route on chain
          provider: new JsonRpcProviderMock(),
        }
      : {}),
  };

  const sismoConnect = SismoConnect({ config, options });
  return await sismoConnect.verify(response, {
    claims: app.claimRequests,
    auths: app.authRequests,
  });
};
