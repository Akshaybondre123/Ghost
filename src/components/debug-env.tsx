"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function DebugEnv() {
  const [showEnv, setShowEnv] = useState(false)

  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set (hidden)" : "Not set",
  }

  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle>Environment Debug</CardTitle>
        <CardDescription>Check if your environment variables are properly set</CardDescription>
      </CardHeader>
      <CardContent>
        {showEnv ? (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">NEXT_PUBLIC_SUPABASE_URL:</div>
              <div className="font-mono text-sm">{envVars.NEXT_PUBLIC_SUPABASE_URL}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY:</div>
              <div className="font-mono text-sm">{envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY}</div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Click the button below to check your environment variables.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => setShowEnv(!showEnv)}>
          {showEnv ? "Hide Environment Variables" : "Show Environment Variables"}
        </Button>
      </CardFooter>
    </Card>
  )
}

