"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/profile-form";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js"; 

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null); 
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
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
      {user ? <ProfileForm user={user} /> : <p>Loading...</p>}
    </div>
  );
}
