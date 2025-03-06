"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AnalyticsChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>View your analytics data over different time periods.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-muted-foreground">Loading chart...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>View your analytics data over different time periods.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="day" className="space-y-4">
            <div className="h-[300px] w-full ghost-gradient rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Daily analytics chart would appear here</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="week" className="space-y-4">
            <div className="h-[300px] w-full ghost-gradient rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Weekly analytics chart would appear here</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="month" className="space-y-4">
            <div className="h-[300px] w-full ghost-gradient rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Monthly analytics chart would appear here</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="year" className="space-y-4">
            <div className="h-[300px] w-full ghost-gradient rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Yearly analytics chart would appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

