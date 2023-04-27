import * as config from "@/space-config";

export async function GET(request: Request) {
  return new Response(JSON.stringify(config));
}

