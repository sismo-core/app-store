import axios from "axios";
import { NextResponse } from "next/server";

export async function POST() {
    const { data } = await axios.post(
        "https://individual-api.synaps.io/v3/session/init",
        {},
        {
          headers: {
            "Client-Id": process.env.SYNAPS_CLIENT_ID,
            "Api-Key": process.env.SYNAPS_API_KEY,
          },
        }
    );
    return NextResponse.json({
        sessionId: data.session_id
    })
}