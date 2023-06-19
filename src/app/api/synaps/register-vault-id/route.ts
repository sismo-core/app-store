import { CustomAppConfig } from "@/space-config/types";
import env from "@/src/environments";
import { getSpaceConfig } from "@/src/libs/spaces";
import { GoogleSpreadsheetStore, Store } from "@/src/libs/store";
import { AuthType, SismoConnect, SismoConnectConfig, SismoConnectResponse } from "@sismo-core/sismo-connect-server";
import axios from "axios";
import { NextResponse } from "next/server";

const spreadSheetsInitiated = new Map<string, boolean>();

export async function POST(req: Request) {
    const { sessionId, response } = await req.json();

    const space = getSpaceConfig({ slug: "synaps" });
    const app = space.apps.find(app => app.slug === "proof-of-liveness") as CustomAppConfig;

    const vaultId = await verifyResponse(app, response);
    if (!vaultId) return NextResponse.json({ status: "error", message: "Response invalid" });

    const { data } = await axios.get(
        `https://individual-api.synaps.io/v3/liveness/details?step_id=${process.env.SYNAPS_STEP_ID}`,
        {
          headers: {
            "Session-Id": sessionId,
            "Client-Id": process.env.SYNAPS_CLIENT_ID,
            "Api-Key": process.env.SYNAPS_API_KEY,
          },
        }
    );

    console.log("data", data);

    if (data.state !== "VALIDATED") {
        return NextResponse.json({
            status: "error"
        })
    }

    const store = await getStore(app);

    const isVaultAlreadyExist = await isExist(store, "VaultId", vaultId);
    if (isVaultAlreadyExist) {
        return NextResponse.json({
            status: "vault-id-already-registered"
        })
    }

    const isSessionIdExist = await isExist(store, "SessionId", sessionId);
    if (isSessionIdExist) {
        return NextResponse.json({
            status: "session-id-already-registered"
        })
    }

    await store.add([
        {
            name: "VaultId",
            value: vaultId
        }, 
        {
            name: "SessionId",
            value: sessionId
        }
    ])

    return NextResponse.json({
        status: "success"
    })
}

const getStore = async (app: CustomAppConfig): Promise<Store> => {
    const columns = ["VaultId", "SessionId"];
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

const isExist = async (store: Store, column: string, value: string): Promise<boolean> => {
    const line = await store.get({ name: column, value });
    return Boolean(line);
}

const verifyResponse = async (app: CustomAppConfig, response: SismoConnectResponse): Promise<string> => {
    try {
        const config: SismoConnectConfig = {
            appId: env.isDemo ? app.demo.appId : (env.isDev ? "0x4c40e70b081752680ce258ad321f9e58" : app.appId),
        }

        const sismoConnect = SismoConnect({ config });
        const result = await sismoConnect.verify(
            response,
            {
              claims: app.claimRequests,
              auths: app.authRequests,
            }
        );
        return result.getUserId(AuthType.VAULT);
    } catch (e) {
        console.log("error", e);
    }
    return null;
}