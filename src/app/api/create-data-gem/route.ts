import { NextResponse } from "next/server";

export async function POST(req: Request) {

   console.log("req", req);

    return NextResponse.json({
        message: "test"
    })
}