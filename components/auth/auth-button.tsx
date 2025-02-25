"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { LogOutIcon, LogInIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"

export function AuthButton() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (isLoading) {
    return (
      <Button variant="outline" disabled className="gap-2">
        <LogInIcon className="h-4 w-4" />
        Loading...
      </Button>
    )
  }

  if (!user) {
    return (
      <Button
        variant="outline"
        onClick={() => router.push("/auth")}
        className="gap-2"
      >
        <LogInIcon className="h-4 w-4" />
        Sign In
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      onClick={handleSignOut}
      className="gap-2"
    >
      <LogOutIcon className="h-4 w-4" />
      Sign Out
    </Button>
  )
}