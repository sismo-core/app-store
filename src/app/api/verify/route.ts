import { ZkSubAppConfig } from "@/space-config/types";
import env from "@/src/environments";
import { getSpaceConfig } from "@/src/libs/spaces";
import { GoogleSpreadsheetStore, Store } from "@/src/libs/store";
import { AuthType, SismoConnect, SismoConnectResponse, SismoConnectServerConfig, SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server";
import { NextResponse } from "next/server";

const spreadSheetsInitiated = new Map<string, boolean>();

export async function POST(req: Request) {
    console.log("///////POST/////////")
    const { fields, response, spaceSlug, appSlug } = await req.json();
    const space = getSpaceConfig({ slug: spaceSlug })
    const app = space.apps.find(_app => _app.type === "zksub" && _app.slug === appSlug);

    if (app.type !== "zksub") return new Response(null, { status: 500, statusText: "Verify not available for other apps than zksub" });

    console.log("////////HERE/////////")
    const store = await getStore(app);
    console.log("////////AFTER STORE/////////")

    let fieldsToAdd = fields;
    if (!env.isDemo) {
        const result = await verifyResponse(app, response);
        if (!result) return new Response(null, { status: 500, statusText: "Invalid response" });

        if (!app.saveAuthRequests && needVaultAuth(app)) {
            const vaultId = await result.getUserId(AuthType.VAULT);
            if (!vaultId) return new Response(null, { status: 500, statusText: "No Vault Id" });
            fieldsToAdd = [
                ...fieldsToAdd,
                {
                    name: "VaultId",
                    value: vaultId
                }
            ];
            const isExist = await isVaultIdExist(store, vaultId);
            if (isExist) return NextResponse.json({ status: "already-subscribed" })
        }
        if (app.saveAuthRequests && app.authRequests?.length > 0) {
            for (let authRequest of app.authRequests) {
                const userId = await result.getUserId(authRequest.authType);
                if (!userId && !authRequest.isOptional) return new Response(null, { status: 500, statusText: `No ${authRequest.authType} Id` });

                if (authRequest.authType === AuthType.VAULT) {
                    const isExist = await isVaultIdExist(store, userId);
                    if (isExist) return NextResponse.json({ status: "already-subscribed" })
                }

                fieldsToAdd = [
                    ...fieldsToAdd,
                    {
                        name: getAuthColumnName(authRequest.authType),
                        value: userId
                    }
                ];
            }
        } 
        if (app.saveClaimRequests && app.claimRequests?.length > 0) {
            for (let claimRequest of app.claimRequests) {
                if (!claimRequest.isSelectableByUser) claimRequest.isSelectableByUser = false;
                const claim = result.claims.find(claim => 
                    claim.groupId === claimRequest.groupId && 
                    claim.claimType === claimRequest.claimType &&
                    claim.groupTimestamp === claimRequest.groupTimestamp && 
                    claim.isSelectableByUser === claimRequest.isSelectableByUser
                ) 
                fieldsToAdd = [
                    ...fieldsToAdd,
                    {
                        name: claim.groupId,
                        value: claim.value
                    }
                ];
            }
        } 
    }

    await store.add(fieldsToAdd)
    
    return NextResponse.json({
        status: "subscribed"
    })
}

const getAuthColumnName = (authType: AuthType) => {
    if (authType === AuthType.EVM_ACCOUNT) {
        return "Address";
    }
    if (authType === AuthType.TWITTER) {
        return "TwitterId";
    }
    if (authType === AuthType.GITHUB) {
        return "GithubId";
    }
    // if (authType === AuthType.TELEGRAM) {
    //     return "TelegramId";
    // }
    if (authType === AuthType.VAULT) {
        return "VaultId";
    }
}

const getStore = async (app: ZkSubAppConfig): Promise<Store> => {
    const appColumns = app.fields.map(el => el.label);

    let authColumns = needVaultAuth(app) ? ["VaultId"] : [];
    if (app.saveAuthRequests) 
        authColumns = app.authRequests.map(authRequest => getAuthColumnName(authRequest.authType));

    let claimColumns = [];
    if (app.saveClaimRequests)
        claimColumns = app.claimRequests.map(claimRequest => claimRequest.groupId);

    const columns = [...authColumns, ...claimColumns, ...appColumns];

    const spreadsheetId = env.isDemo ? app.demo.spreadsheetId : app.spreadsheetId;
    const store = new GoogleSpreadsheetStore({
        spreadsheetId,
        columns
    });
    if (!spreadSheetsInitiated.has(app.spreadsheetId)) {
        await store.init();
        spreadSheetsInitiated.set(app.spreadsheetId, true);
    }
    return store;
}

const needVaultAuth = (app: ZkSubAppConfig): boolean => {
    if(!app.authRequests) return null;
    const authRequest = app.authRequests.find(el => el.authType === AuthType.VAULT);
    return Boolean(authRequest);
}

const isVaultIdExist = async (store: Store, vaultId: string): Promise<boolean> => {
    const line = await store.get({ name: "VaultId", value: vaultId });
    return Boolean(line);
}

const verifyResponse = async (app: ZkSubAppConfig, response: SismoConnectResponse): Promise<SismoConnectVerifiedResult> => {
    try {
        const config: SismoConnectServerConfig = {
            appId: env.isDemo ? app.demo.appId : (env.isDev ? "0x4c40e70b081752680ce258ad321f9e58" : app.appId),
            devMode: {
                enabled: env.isDemo || env.isDev
            }
        }
        const sismoConnect = SismoConnect(config);
        return await sismoConnect.verify(
            response,
            {
              claims: app.claimRequests,
              auths: app.authRequests,
            }
        );
    } catch (e) {
        console.log("error", e);
    }
    return null;
}