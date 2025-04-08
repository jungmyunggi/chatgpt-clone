import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BASE_URL, PUBLIC_ROUTES, AUTH_ROUTES } from "./constants/routes";
import { cookies } from "next/headers";
import { verify } from "./actions/sessions";

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isPublicRoutes = PUBLIC_ROUTES.includes(pathname);
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    const session = await verify(cookie);
    if (!isPublicRoutes && "errorMessage" in session) {
        return NextResponse.redirect(
            new URL(AUTH_ROUTES.LOGIN, request.nextUrl)
        );
    }
    if (isPublicRoutes && !("errorMessage" in session) && session.id) {
        return NextResponse.redirect(new URL(BASE_URL, request.nextUrl));
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
