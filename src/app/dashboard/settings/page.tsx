import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/profile-form"
import { createClient } from "@/lib/supabase/server"

export default async function SettingsPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  )
}

