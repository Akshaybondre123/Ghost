import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Eye, MousePointerClick, Users } from "lucide-react"

export function AnalyticsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="ghost-card ghost-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Page Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>


        <CardContent>
          <div className="text-2xl font-bold">2,853</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">+18%</span>
            <span className="ml-1">vs last week</span>
          </div>
        </CardContent>

      </Card>
      <Card className="ghost-card ghost-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>


        <CardContent>
          <div className="text-2xl font-bold">1,294</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">+12%</span>
            <span className="ml-1">vs last week</span>
          </div>
        </CardContent>


      </Card>
      <Card className="ghost-card ghost-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
          <MousePointerClick className="h-4 w-4 text-muted-foreground" />
        </CardHeader>


        <CardContent>
          <div className="text-2xl font-bold">32.8%</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">+4%</span>
            <span className="ml-1">vs last week</span>
          </div>
        </CardContent>


      </Card>
      <Card className="ghost-card ghost-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </CardHeader>
        
        <CardContent>
          <div className="text-2xl font-bold">3m 42s</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">+1m 12s</span>
            <span className="ml-1">vs last week</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

