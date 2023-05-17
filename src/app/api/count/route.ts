import { NextResponse } from "next/server";
import { numberOfUsers } from "../verify/route";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const spreadsheetId = searchParams.get('spreadsheetId');
    console.log("spreadsheetId", spreadsheetId);
    console.log("numberOfUsers.get(spreadsheetId)", numberOfUsers.get(spreadsheetId));
    return NextResponse.json({
        spreadsheetId: spreadsheetId,
        count: numberOfUsers.has(spreadsheetId) ?  numberOfUsers.get(spreadsheetId) : 0
    })
}
