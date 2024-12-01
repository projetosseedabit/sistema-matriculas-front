import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
    const cookies = request.cookies;
    const token = cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    let redirectURLString = "/login";

    if (path !== "/admin/" && path !== "/admin") {
        redirectURLString = `/login?redirectTo=${path.replace("/admin", "")}`;
    }

    if (path.startsWith("/login")) {
        if (!token) {
            return NextResponse.next();
        }

        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT_SECRET is not defined");
            }

            await jose.jwtVerify(token, new TextEncoder().encode(secret));

            return NextResponse.redirect(new URL("/admin", request.url));
        } catch (error) {
            console.error(error);
            return NextResponse.redirect(
                new URL(redirectURLString, request.url)
            );
        }
    }

    // Path começa com /admin
    if (!token) {
        return NextResponse.redirect(new URL(redirectURLString, request.url));
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }
        await jose.jwtVerify(token, new TextEncoder().encode(secret));

        return NextResponse.next();
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL(redirectURLString, request.url));
    }
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
