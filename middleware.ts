import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })

    
    const {
      data: { session },
    } = await supabase.auth.getSession()

   
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (!session) {
        console.log("No session found, redirecting to login")
        return NextResponse.redirect(new URL("/", request.url), { status: 302 })
      }
    }

   
    if (session && (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/signup")) {
      console.log("Session found, redirecting to dashboard")
      return NextResponse.redirect(new URL("/dashboard", request.url), { status: 302 })
    }

    return res
  } catch (error) {
    console.error("Middleware error:", error)
   
    return NextResponse.redirect(new URL("/", request.url), { status: 302 })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

