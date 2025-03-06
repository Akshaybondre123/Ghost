import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { LoginForm } from "@/components/login-form"
import { DebugEnv } from "@/components/debug-env"

export default async function Home() {
  try {
    const supabase = createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      redirect("/dashboard")
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
        <LoginForm />
        <DebugEnv />
      </div>
    )
  } catch (error) {
    console.error("Error in home page:", error)

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
        <div className="w-full max-w-md text-center mb-8 text-red-500">
          <h2 className="text-xl font-bold">Connection Error</h2>
          <p>There was a problem connecting to the authentication service. Please check your environment variables.</p>
        </div>
        <LoginForm />
        <DebugEnv />
      </div>
    )
  }
}

