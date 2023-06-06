import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
    const url = new URL(request.url)
    const currentDomain = url.hostname;
    const subDomain = "spaces.sismo";
    const redirectDomain = "apps.sismo";

    if (currentDomain.includes(subDomain)) {
        const newUrl = url.protocol + "//" + redirectDomain + url.pathname + url.search + url.hash;
        return NextResponse.redirect(newUrl);
    }
    return null;
}