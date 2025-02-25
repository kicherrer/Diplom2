export type Tables = {
  profiles: {
    id: string
    username: string
    avatar_url?: string
    is_admin: boolean
    created_at: string
  }
  watchlist: {
    id: string
    user_id: string
    media_id: string
    media_type: 'movie' | 'tv'
    added_at: string
    status: 'plan_to_watch' | 'watching' | 'completed' | 'dropped'
  }
  ratings: {
    id: string
    user_id: string
    media_id: string
    rating: number
    review?: string
    created_at: string
  }
  favorites: {
    id: string
    user_id: string
    media_id: string
    media_type: 'movie' | 'tv'
    added_at: string
  }
}
