"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function Redirect({ to }: { to: string }) {
  const router = useRouter()

  useEffect(() => {
    
    router.push(to)

    
    setTimeout(() => {
      window.location.href = to
    }, 100)
  }, [router, to])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Redirecting...</h2>
        <p className="mt-2">
          If you are not redirected,{" "}
          <a href={to} className="text-primary hover:underline">
            click here
          </a>
        </p>
      </div>
    </div>
  )
}

