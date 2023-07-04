import env from "@/src/environments";
import { TableStore } from "@/src/libs/table-store";
import {
  AuthType,
  SismoConnect,
  SismoConnectResponse,
  SismoConnectConfig,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-server";
import { NextResponse } from "next/server";
import { mapAuthTypeToSheetColumnName } from "@/src/utils/mapAuthTypeToSheetColumnName";
import { getApp } from "@/src/libs/spaces";
import { getImpersonateAddresses } from "@/src/utils/getImpersonateAddresses";
import { ZkAppType, ZkFormAppType } from "@/src/libs/spaces/types";
import ServiceFactory from "@/src/libs/service-factory/service-factory";
import { errorResponse } from "@/src/libs/helper/api";

export type Field = {
  name: string;
  value: string;
};

export async function POST(req: Request) {
  const { fields, response, spaceSlug, appSlug } = await req.json();
  const store = ServiceFactory.getZkFormTableStore();
  const app = getApp({ appSlug: appSlug, spaceSlug: spaceSlug });

  if (!app || app.type !== "zkForm") {
    return errorResponse(`App ${appSlug} not found or not a zkForm app`);
  }

  await initColumns(store, app as ZkFormAppType);

  let fieldsToAdd = fields;
  let result: SismoConnectVerifiedResult;
  try {
    result = await verifyResponse(app, response);
  } catch (error) {
    return errorResponse(`Invalid ZK Proof ${error.message}`);
  }

  if (!app.saveAuths && needVaultAuth(app)) {
    const vaultId = await result.getUserId(AuthType.VAULT);
    if (!vaultId) return new Response(null, { status: 500, statusText: "No Vault Id" });
    fieldsToAdd = [
      ...fieldsToAdd,
      {
        name: "VaultId",
        value: vaultId,
      },
    ];

    const isExist = await isVaultAlreadySaved(app.spreadsheetId, store, vaultId);
    if (isExist) return NextResponse.json({ status: "already-subscribed" });
  }

  if (app.saveAuths && app.authRequests?.length > 0) {
    for (let authRequest of app.authRequests) {
      const userId = await result.getUserId(authRequest.authType);
      if (!userId && !authRequest.isOptional)
        return new Response(null, { status: 500, statusText: `No ${authRequest.authType} Id` });

      if (authRequest.authType === AuthType.VAULT) {
        const isExist = await isVaultAlreadySaved(app.spreadsheetId, store, userId);
        if (isExist) return NextResponse.json({ status: "already-subscribed" });
      }

      fieldsToAdd = [
        ...fieldsToAdd,
        {
          name: mapAuthTypeToSheetColumnName(authRequest.authType),
          value: userId,
        },
      ];
    }
  }

  if (app.saveClaims && app.claimRequests?.length > 0) {
    for (let claimRequest of app.claimRequests) {
      if (!claimRequest.isSelectableByUser) claimRequest.isSelectableByUser = false;
      const claim = result.claims.find(
        (claim) =>
          claim.groupId === claimRequest.groupId &&
          claim.claimType === claimRequest.claimType &&
          claim.groupTimestamp === claimRequest.groupTimestamp &&
          claim.isSelectableByUser === claimRequest.isSelectableByUser
      );
      fieldsToAdd = [
        ...fieldsToAdd,
        {
          name: claim.groupId,
          value: claim.value,
        },
      ];
    }
  }

  await store.add(app.spreadsheetId, fieldsToAdd);

  return NextResponse.json({
    status: "subscribed",
  });
}

const initColumns = async (store: TableStore, app: ZkFormAppType): Promise<TableStore> => {
  const appColumns = app?.fields ? app?.fields.map((el) => el.label) : [];

  let authColumns = needVaultAuth(app) ? ["VaultId"] : [];
  if (app.saveAuths)
    authColumns = app.authRequests.map((authRequest) =>
      mapAuthTypeToSheetColumnName(authRequest.authType)
    );

  let claimColumns = [];
  if (app.saveClaims) claimColumns = app.claimRequests.map((claimRequest) => claimRequest.groupId);

  const columns = [...authColumns, ...claimColumns, ...appColumns];

  await store.createColumns(app.spreadsheetId, columns);

  return store;
};

const needVaultAuth = (app: ZkFormAppType): boolean => {
  if (!app.authRequests) return null;
  const authRequest = app.authRequests.find((el) => el.authType === AuthType.VAULT);
  return Boolean(authRequest);
};

const isVaultAlreadySaved = async (
  spreadsheetId: string,
  store: TableStore,
  vaultId: string
): Promise<boolean> => {
  if (env.isDemo) {
    return false;
  }
  const line = await store.get(spreadsheetId, { name: "VaultId", value: vaultId });
  return Boolean(line);
};

const verifyResponse = async (
  app: ZkFormAppType,
  response: SismoConnectResponse
): Promise<SismoConnectVerifiedResult> => {
  const config: SismoConnectConfig = {
    appId: env.isDev ? "0x4c40e70b081752680ce258ad321f9e58" : app.appId,
  };

  if (env.isDemo || env.isTest) {
    // todo should be choose differently
    config.vault = {
      impersonate: getImpersonateAddresses(app as ZkAppType),
    };
  }

  const sismoConnect = SismoConnect({ config });
  return await sismoConnect.verify(response, {
    claims: app.claimRequests,
    auths: app.authRequests,
  });
};
