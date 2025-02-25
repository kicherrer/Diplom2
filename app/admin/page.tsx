"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function AdminPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [mediaItems, setMediaItems] = useState([])

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()

      if (!data?.is_admin) {
        router.push('/')
        return
      }

      setIsAdmin(true)
      fetchData()
    } catch (error) {
      console.error('Error checking admin access:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    try {
      const [usersResponse, mediaResponse] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('media_items').select('*')
      ])

      setUsers(usersResponse.data || [])
      setMediaItems(mediaResponse.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch data')
    }
  }

  const toggleUserAdmin = async (userId: string, isAdmin: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: isAdmin })
        .eq('id', userId)

      if (error) throw error
      toast.success('User updated successfully')
      fetchData()
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Failed to update user')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('admin.title')}</h1>
      
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">{t('admin.tabs.users')}</TabsTrigger>
          <TabsTrigger value="media">{t('admin.tabs.media')}</TabsTrigger>
          <TabsTrigger value="stats">{t('admin.tabs.stats')}</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.users.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                    </div>
                    <Button
                      variant={user.is_admin ? "destructive" : "default"}
                      onClick={() => toggleUserAdmin(user.id, !user.is_admin)}
                    >
                      {user.is_admin ? t('admin.users.removeAdmin') : t('admin.users.makeAdmin')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.media.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mediaItems.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <Button variant="outline">
                      {t('admin.media.edit')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.stats.totalUsers')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{users.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.stats.totalMedia')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{mediaItems.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.stats.adminUsers')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {users.filter((user: any) => user.is_admin).length}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}