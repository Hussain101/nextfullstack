import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse,NextRequest } from "next/server";

export function middleware(request : NextRequest){
   

    const path = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value || "";
    const ispublicPath = path === '/login' || path === "/signup";

    if(ispublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
      }
    if (!ispublicPath && !token) {
        return NextResponse.redirect(new URL("/login",request.nextUrl))
    }
}

//matching paths

export const config = {
    matcher:[
        '/',
        '/profile',
        '/profile/:path*',
        '/login',
        '/signup',
    ]
}