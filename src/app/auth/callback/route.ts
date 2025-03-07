import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers"; 
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    
    const code = requestUrl.searchParams.get("code");
    const type = requestUrl.searchParams.get("type");

    if (code) {
      const supabase = createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error || !data.session) {
        console.error("Error exchanging code for session:", error?.message || error);
        return NextResponse.redirect(
          new URL("/?error=auth_callback_failed", requestUrl.origin),
          { status: 302 }
        );
      }

      console.log("Session successfully created");

      
      cookies().set("sb-access-token", data.session.access_token, { httpOnly: true, secure: true });

      if (type === "email_change" || type === "signup") {
        return NextResponse.redirect(new URL("/?confirmed=true", requestUrl.origin), { status: 302 });
      }
    }

    return NextResponse.redirect(new URL("/dashboard", requestUrl.origin), { status: 302 });
  } catch (error) {
    console.error("Auth callback error:", error);
    return NextResponse.redirect(new URL("/?error=auth_callback_failed", requestUrl.origin), { status: 302 });
  }
}
