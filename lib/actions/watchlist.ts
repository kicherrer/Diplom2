import { supabase } from '@/lib/supabase';

export async function addToWatchlist(userId: string, mediaId: string, mediaType: 'movie' | 'tv') {
  return await supabase
    .from('watchlist')
    .insert({
      user_id: userId,
      media_id: mediaId,
      media_type: mediaType,
      status: 'plan_to_watch'
    });
}

export async function getUserWatchlist(userId: string) {
  return await supabase
    .from('watchlist')
    .select('*')
    .eq('user_id', userId)
    .order('added_at', { ascending: false });
}
