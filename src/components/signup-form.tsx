"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)

  let supabase: any
  if (typeof window !== "undefined") {
    try {
      supabase = createClient()
    } catch (error) {
      console.error("Error creating Supabase client:", error)
    }
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!supabase) {
      toast.error("Connection Error", {
        description:
          "Unable to connect to authentication service. Please check your internet connection and try again.",
      })
      return
    }

    setIsLoading(true)

    try {
      console.log("Starting signup process...")

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long")
      }

      
      const origin = typeof window !== "undefined" ? window.location.origin : ""

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            full_name: fullName.trim(),
          },
          emailRedirectTo: `${origin}/auth/callback`,
        },
      })

      if (signUpError) {
        console.error("Signup error:", signUpError)
        throw signUpError
      }

      console.log("Signup response:", signUpData)

      if (signUpData?.user && signUpData?.session) {
       
        console.log("User created and signed in:", signUpData.user)

        toast.success("Account created successfully!", {
          description: "Welcome to Ghost Dashboard.",
        })

        window.location.replace("/dashboard")
      } else if (signUpData?.user) {
        
        console.log("User created, email confirmation required:", signUpData.user)

        setSignupSuccess(true)

        toast.info("Account created!", {
          description: "Please check your email to confirm your account before signing in.",
        })

        setIsLoading(false)
      } else {
        throw new Error("Something went wrong during signup")
      }
    } catch (error: any) {
      console.error("Error in signup process:", error)

      let errorMessage = "Please try again."

      if (error.message) {
        errorMessage = error.message
      } else if (error.error_description) {
        errorMessage = error.error_description
      } else if (error.details) {
        errorMessage = error.details
      }

      toast.error("Sign up failed", {
        description: errorMessage,
      })
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    if (!supabase) {
      toast.error("Connection Error", {
        description:
          "Unable to connect to authentication service. Please check your internet connection and try again.",
      })
      return
    }

    try {
      setIsGoogleLoading(true)
      console.log("Starting Google OAuth...")

      
      const origin = typeof window !== "undefined" ? window.location.origin : ""

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      })

      if (error) {
        console.error("Google OAuth error:", error)
        throw error
      }

      console.log("Google OAuth initiated:", data)
    } catch (error: any) {
      console.error("Error in Google signup:", error)

      let errorMessage = "Please try again."
      if (error.message) {
        errorMessage = error.message
      }

      toast.error("Google sign-up failed", {
        description: errorMessage,
      })
      setIsGoogleLoading(false)
    }
  }


  if (signupSuccess) {
    return (
      <Card className="w-full max-w-md ghost-hover">
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
          <CardTitle className="text-2xl text-center">Check your email</CardTitle>
          <CardDescription className="text-center">
            We've sent a confirmation link to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>Please check your email and click the confirmation link to activate your account.</p>
          <p className="text-sm text-muted-foreground">
            If you don't see the email, check your spam folder or try signing in - you may already be confirmed.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Already confirmed?{" "}
            <Link href="/" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md ghost-hover">
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
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">Enter your information to create your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
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
          onClick={handleGoogleSignUp}
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
          Already have an account?{" "}
          <Link href="/" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

