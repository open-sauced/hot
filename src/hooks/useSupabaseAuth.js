import { useState, useEffect } from 'react';
import { supabase } from '../lib/database';

const useSupabaseAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = supabase.auth.session();
    setUser(currentUser?.user ?? null);

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return {
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };
};

export default useSupabaseAuth;
