import * as config from "@/space-configs";

export async function GET(request: Request) {
  return new Response(JSON.stringify(config));
}

