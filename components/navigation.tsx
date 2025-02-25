"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { FilmIcon, HomeIcon, TrendingUpIcon, UserIcon, Settings } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { LanguageToggle } from "./language-toggle"
import { AuthButton } from "./auth/auth-button"
import { useTranslation } from 'react-i18next'
import { supabase } from "@/lib/supabase"

export default function Navigation() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()
        setIsAdmin(data?.is_admin || false)
      }
    }
    checkAdminStatus()
  }, [])

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center space-x-2">
          <FilmIcon className="h-6 w-6" />
          <span className="text-lg font-bold">MediaVault</span>
        </div>
        <ScrollArea className="max-w-[600px] lg:max-w-none mx-6">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                className="gap-2"
              >
                <HomeIcon className="h-4 w-4" />
                {t('common.navigation.home')}
              </Button>
            </Link>
            <Link href="/discover">
              <Button
                variant={pathname === "/discover" ? "default" : "ghost"}
                className="gap-2"
              >
                <TrendingUpIcon className="h-4 w-4" />
                {t('common.navigation.discover')}
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant={pathname === "/profile" ? "default" : "ghost"}
                className="gap-2"
              >
                <UserIcon className="h-4 w-4" />
                {t('common.navigation.profile')}
              </Button>
            </Link>
            {isAdmin && (
              <Link href="/admin">
                <Button
                  variant={pathname === "/admin" ? "default" : "ghost"}
                  className="gap-2"
                >
                  <Settings className="h-4 w-4" />
                  {t('common.navigation.admin')}
                </Button>
              </Link>
            )}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        <div className="ml-auto flex items-center space-x-4">
          <LanguageToggle />
          <AuthButton />
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}