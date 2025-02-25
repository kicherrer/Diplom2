"use client"

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import CheckAdmin from '@/components/admin/check-admin';

export default function ProfilePage() {
  const { t } = useTranslation()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    bio: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      
      setProfile(data)
      setFormData({
        username: data?.username || '',
        bio: data?.bio || ''
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast.success('Profile updated successfully')
      setEditing(false)
      fetchProfile()
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1>Профиль</h1>
      <CheckAdmin />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Profile</CardTitle>
            <Button
              variant="outline"
              onClick={() => editing ? updateProfile() : setEditing(true)}
            >
              {editing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback>
                {profile?.username?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {editing ? (
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Username"
                />
              ) : (
                <h3 className="text-2xl font-semibold">{profile?.username}</h3>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Bio</h4>
            {editing ? (
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            ) : (
              <p className="text-muted-foreground">{profile?.bio || 'No bio yet'}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your recent activity will appear here</p>
        </CardContent>
      </Card>
    </div>
  )
}