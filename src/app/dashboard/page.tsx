import { redirect } from "next/navigation"
import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardHeader } from "@/components/dashboard-header"
import { createClient } from "@/lib/supabase/server"
import { Redirect } from "@/components/redirect"

export default async function Dashboard() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    
    redirect("/")
   
    return <Redirect to="/" />
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader user={user} />
      <DashboardCards />
    </div>
  )
}

