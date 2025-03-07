"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/profile-form";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js"; 

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient(); 
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-gray-500">Manage your account settings and preferences.</p>
      </div>
      <Separator />
      {loading ? <p>Loading...</p> : user ? <ProfileForm user={user} /> : <p>No user found.</p>}
    </div>
  );
}
