import { CustomAppConfig } from "@/space-config/types";
import { NextResponse } from "next/server";
import env from "@/src/environments";
import { GoogleSpreadsheetStore, Store } from "@/src/libs/store";
import { getSpaceConfig } from "@/src/libs/spaces";

const spreadSheetsInitiated = new Map<string, boolean>();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // GET SPACE
    const spaceSlug = searchParams.get('space');
    if (!spaceSlug) {
        return NextResponse.json({
            status: "error",
            message: "Please specify a space"
        })
    }
    const space = getSpaceConfig({ slug: spaceSlug });
    if (!space) {
        return NextResponse.json({
            status: "error",
            message: `Space "${spaceSlug}" unknown`
        })
    }

    // GET APP
    const appSlug = searchParams.get('app');
    if (!appSlug) {
        return NextResponse.json({
            status: "error",
            message: "Please specify an app"
        })
    }
    const app = space.apps.find(app => app.slug === appSlug) as CustomAppConfig;
    if (!app) {
        return NextResponse.json({
            status: "error",
            message: `App "${spaceSlug}" unknown`
        })
    }

    const store = await getStore(app);
    let loadedStore = await store.load();

    // Remove headers
    loadedStore.shift();

    const data = loadedStore.map(el => el[0]);

    return NextResponse.json({
        status: "success",
        data
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