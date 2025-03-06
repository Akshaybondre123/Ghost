import { AnalyticsCards } from "../../../components/analytics-cards"
import { AnalyticsChart } from "../../../components/analytics-chart"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Analytics</h3>
        <p className="text-sm text-muted-foreground">View your dashboard analytics and statistics.</p>
      </div>
      <AnalyticsCards />
      <AnalyticsChart />
    </div>
  )
}

