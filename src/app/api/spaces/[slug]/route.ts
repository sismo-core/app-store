import * as config from "@/space-configs";

export async function GET(request: Request, { params }: { params: { slug: string } }) {

  const selectedSpace = Object.values(config).find((space) => {
    return space.slug === params.slug;
  });

  return new Response(JSON.stringify(selectedSpace));
}

