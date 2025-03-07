"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, CheckCircle2 } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [supabase, setSupabase] = useState<any>(null) // Declare state for Supabase client

  const searchParams = useSearchParams()

  
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const client = createClient()
        setSupabase(client) 
      } catch (error) {
        console.error("Error creating Supabase client:", error)
      }
    }
  }, [])

  
  useEffect(() => {
    const confirmed = searchParams.get("confirmed")
    const error = searchParams.get("error")

    if (confirmed === "true") {
      toast.success("Email confirmed!", {
        description: "Your email has been confirmed. You can now sign in.",
      })
    }

    if (error) {
      toast.error("Authentication Error", {
        description: "There was a problem with authentication. Please try again.",
      })
    }
  }, [searchParams])

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!supabase) {
      toast.error("Connection Error", {
        description: "Unable to connect to authentication service. Please check your internet connection and try again.",
      })
      return
    }

    setIsLoading(true)

    try {
      console.log("Starting login process...")

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      })

      if (error) {
        console.error("Login error:", error)
        throw error
      }

      console.log("Login successful:", data)

      if (data?.session) {
        toast("Login successful", {
          description: "Welcome back!",
        })

        console.log("Redirecting to dashboard...")
        window.location.replace("/dashboard")
      }
    } catch (error: any) {
      console.error("Error in login process:", error)

      let errorMessage = "Invalid email or password. Please try again."

      if (error.message) {
        errorMessage = error.message
      } else if (error.error_description) {
        errorMessage = error.error_description
      }

      if (error.message?.includes("Email not confirmed")) {
        errorMessage = "Please check your email and confirm your account before signing in."
      }

      toast("Login failed", {
        description: errorMessage,
        style: { backgroundColor: "#F56565", color: "#FFF" },
      })
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    if (!supabase) {
      toast("Connection Error", {
        description:
          "Unable to connect to authentication service. Please check your internet connection and try again.",
        style: { backgroundColor: "#F56565", color: "#FFF" },
      })
      return
    }

    try {
      setIsGoogleLoading(true)
      console.log("Starting Google OAuth...")

      const redirectTo = typeof window !== "undefined" ? window.location.origin : ""
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${redirectTo}/auth/callback`,
        },
      })

      if (error) {
        console.error("Google OAuth error:", error)
        throw error
      }

      console.log("Google OAuth initiated:", data)
    } catch (error: any) {
      console.error("Error in Google login:", error)

      let errorMessage = "Please try again."
      if (error.message) {
        errorMessage = error.message
      }

      toast("Google login failed", {
        description: errorMessage,
        style: { backgroundColor: "#F56565", color: "#FFF" },
      })
      setIsGoogleLoading(false)
    }
  }

  const isConfirmed = searchParams.get("confirmed") === "true"

  return (
    <Card className="w-full max-w-md ghost-hover">
      {isConfirmed && (
        <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-t-md flex items-center gap-2 text-green-700 dark:text-green-400">
          <CheckCircle2 className="h-5 w-5" />
          <span>Email confirmed successfully! You can now sign in.</span>
        </div>
      )}
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-primary"
          >
            <path d="M9 10h.01" />
            <path d="M15 10h.01" />
            <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
          </svg>
        </div>
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">Enter your credentials to sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          Google
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}