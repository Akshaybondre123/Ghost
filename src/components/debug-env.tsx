"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function DebugEnv() {
  const [isVisible, setIsVisible] = useState(false);

  const envVars = {
    SupabaseURL: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not configured",
    SupabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Configured (hidden)" : "Not configured",
  };

  return (
    <Card className="w-full max-w-md mt-6 shadow-md">
      <CardHeader>
        <CardTitle>Environment Checker</CardTitle>
      </CardHeader>
      <CardContent>
        {isVisible ? (
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-semibold">Supabase URL:</span>{" "}
              <span className="font-mono text-gray-700">{envVars.SupabaseURL}</span>
            </div>
            <div>
              <span className="font-semibold">Supabase Anon Key:</span>{" "}
              <span className="font-mono text-gray-700">{envVars.SupabaseAnonKey}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Click the button to check environment variables.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Hide Details" : "Show Details"}
        </Button>
      </CardFooter>
    </Card>
  );
}
