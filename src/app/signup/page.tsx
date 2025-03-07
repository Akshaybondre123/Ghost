"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SignUpForm } from "@/components/signup-form";
import { DebugEnv } from "@/components/debug-env";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      }

      if (data?.session) {
        router.push("/dashboard"); 
      } else {
        setLoading(false); 
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <SignUpForm />
      <DebugEnv />
    </div>
  );
}
