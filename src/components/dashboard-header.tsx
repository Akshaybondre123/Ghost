import type { User } from "@supabase/supabase-js"

interface DashboardHeaderProps {
  user: User | null
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Ghost"

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">
        {greeting()}, {name}
      </h1>
      <p className="text-muted-foreground">Welcome to your ghost dashboard. Here's what's happening today.</p>
    </div>
  )
}

