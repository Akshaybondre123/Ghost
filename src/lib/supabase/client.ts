"use client"; 

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../../../types/supabase";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables");
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables are required."
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: (key: string) => {
       
        if (typeof document !== "undefined") {
          return document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${key}=`))
            ?.split("=")[1] || null;
        }
        return null;
      },
      set: (key: string, value: string) => {
        
        if (typeof document !== "undefined") {
          document.cookie = `${key}=${value}; path=/; secure; samesite=lax`;
        }
      },
      remove: (key: string) => {
        
        if (typeof document !== "undefined") {
          document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      },
    },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      fetch: fetch.bind(globalThis),
    },
  });
}