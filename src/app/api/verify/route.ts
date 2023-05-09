import { getSpaceConfig } from "@/src/libs/spaces";


export async function POST(req: Request) {
    const json = await req.json()
    const { fields, response, spaceSlug, appSlug } = json;
    const space = getSpaceConfig({ slug: spaceSlug })
    const app = space.apps.find(_app => _app.type === "zksub" && _app.slug === appSlug);
    console.log("space", space);
    console.log("app", app);
    //TODO Verify response
    //TODO Save fields
    
    return new Response(JSON.stringify(true))
}