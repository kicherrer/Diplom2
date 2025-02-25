export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media_items: {
        Row: {
          id: string
          tmdb_id: number
          title: string
          type: 'movie' | 'tv' | 'documentary'
          poster_url: string | null
          release_date: string | null
          overview: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tmdb_id: number
          title: string
          type: 'movie' | 'tv' | 'documentary'
          poster_url?: string | null
          release_date?: string | null
          overview?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tmdb_id?: number
          title?: string
          type?: 'movie' | 'tv' | 'documentary'
          poster_url?: string | null
          release_date?: string | null
          overview?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_media_items: {
        Row: {
          id: string
          user_id: string
          media_item_id: string
          status: 'watched' | 'watching' | 'plan_to_watch' | null
          rating: number | null
          review: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          media_item_id: string
          status?: 'watched' | 'watching' | 'plan_to_watch' | null
          rating?: number | null
          review?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          media_item_id?: string
          status?: 'watched' | 'watching' | 'plan_to_watch' | null
          rating?: number | null
          review?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}