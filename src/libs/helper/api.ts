import env from "@/src/environments";
import { NextResponse } from "next/server";

export const errorResponse = (message: string): Response => {
  if (env.isDev) {
    console.error(message);
  }
  return NextResponse.json({
    status: "error",
    message: message,
  });
};
