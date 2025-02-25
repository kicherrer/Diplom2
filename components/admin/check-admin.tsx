'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function CheckAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        
        setIsAdmin(!!data?.is_admin);
      }
    }
    
    checkAdmin();
  }, []);

  if (!userId) return <div>Не авторизован</div>;

  return (
    <div className="p-4 border rounded">
      <p>User ID: {userId}</p>
      <p>Админ: {isAdmin ? 'Да' : 'Нет'}</p>
    </div>
  );
}
