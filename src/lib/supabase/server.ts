import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "../../../types/supabase";

export function createClient() {
  const cookieStore = cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are missing.");
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required."
    );
  }

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: (name: string) => cookieStore.get(name)?.value || null,

      set: (name: string, value: string, options?: any) => {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          console.error("Error setting cookie:", error);
        }
      },

      remove: (name: string, options?: any) => {
        try {
          cookieStore.set({ name, value: "", ...options, expires: new Date(0) });
        } catch (error) {
          console.error("Error removing cookie:", error);
        }
      },
    },
  });
}
