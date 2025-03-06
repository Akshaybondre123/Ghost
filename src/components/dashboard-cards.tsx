import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Ghost, Users } from "lucide-react"

export function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="ghost-card ghost-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Apparitions</CardTitle>
          <Ghost className="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">128</div>
          <p className="text-xs text-muted-foreground">+14% from last month</p>
        </CardContent>
      </Card>

      <Card className="ghost-card ghost-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">573</div>
          <p className="text-xs text-muted-foreground">+32 in the last hour</p>
        </CardContent>

      </Card>
      <Card className="ghost-card ghost-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        
        <CardContent>
          <div className="text-2xl font-bold">24.3%</div>
          <p className="text-xs text-muted-foreground">+7% from last week</p>
        </CardContent>
      </Card>
    </div>
  )
}

