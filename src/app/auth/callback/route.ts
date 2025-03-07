import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Mark the route as dynamic
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")
    const type = requestUrl.searchParams.get("type")

    console.log("Auth callback received:", { code: code ? "present" : "missing", type })

    if (code) {
      const supabase = createClient()
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Error exchanging code for session:", error.message || error)
        return NextResponse.redirect(
          new URL("/?error=auth_callback_failed", requestUrl.origin),
          { status: 302 }
        )
      }

      console.log("Session created:", data.session ? "success" : "failed")

      // Handle specific types of auth callbacks
      if (type === "email_change" || type === "signup") {
        return NextResponse.redirect(
          new URL("/?confirmed=true", requestUrl.origin),
          { status: 302 }
        )
      }
    }

    // Default redirect to the dashboard
    return NextResponse.redirect(
      new URL("/dashboard", requestUrl.origin),
      { status: 302 }
    )
  } catch (error) {
    console.error("Auth callback error:", error)
    // Redirect to an error page or homepage with an error query parameter
    return NextResponse.redirect(
      new URL("/?error=auth_callback_failed", request.url),
      { status: 302 }
    )
  }
}