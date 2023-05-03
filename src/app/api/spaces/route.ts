import * as config from "@/space-config";

export async function GET(request: Request) {
  console.log("GET spaces config", config);
  return new Response(JSON.stringify([config]), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}

