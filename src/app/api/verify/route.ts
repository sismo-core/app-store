import { ZkSubAppConfig } from "@/space-config/types";
import env from "@/src/environments";
import { getSpaceConfig } from "@/src/libs/spaces";
import { GoogleSpreadsheetStore, Store } from "@/src/libs/store";
import { AuthType, SismoConnect, SismoConnectResponse, SismoConnectServerConfig, SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server";
import { ethers } from "ethers";
import { NextResponse } from "next/server";

const spreadSheetsInitiated = new Map<string, boolean>();

export async function POST(req: Request) {
    const { fields, response, spaceSlug, appSlug } = await req.json();
    const space = getSpaceConfig({ slug: spaceSlug })
    const app = space.apps.find(_app => _app.type === "zksub" && _app.slug === appSlug);

    if (app.type !== "zksub") return new Response(null, { status: 500, statusText: "Verify not available for other apps than zksub" });

    const store = await getStore(app);

    let fieldsToAdd = fields;
    if (!env.isDemo) {
        const result = await verifyResponse(app, response);
        if (!result) return new Response(null, { status: 500, statusText: "Invalid response" });
        if (needVaultAuth(app)) {
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
    } else {
        if (needVaultAuth(app)) {
            fieldsToAdd = [
                ...fieldsToAdd,
                {
                    name: "VaultId",
                    value: "0xDemo"
                }
            ];
        } 
    }

    await store.add(fieldsToAdd)
    
    return NextResponse.json({
        status: "subscribed"
    })
}

const getStore = async (app: ZkSubAppConfig): Promise<Store> => {
    const appColumns = app.fields.map(el => el.label);

    const columns = needVaultAuth(app) ? [
        "VaultId",
        ...appColumns
    ] : appColumns;

    const store = new GoogleSpreadsheetStore({
        spreadsheetId: env.isDemo ? app.demo.spreadsheetId : app.spreadsheetId,
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
        const provider = new ethers.providers.JsonRpcProvider({
            url: 'https://rpc.ankr.com/gnosis'
        })
        const config: SismoConnectServerConfig = {
            appId: env.isDemo ? app.demo.appId : (env.isDev ? "0x4c40e70b081752680ce258ad321f9e58" : app.appId),
            devMode: {
                enabled: env.isDemo || env.isDev
            },
            options: {
                provider: provider
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