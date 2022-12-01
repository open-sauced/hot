import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";
import { UserCredentials } from "@supabase/gotrue-js/src/lib/types";

const useSupabaseAuth = () => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const currentUser = supabase.auth.session();

    setUser(currentUser?.user ?? undefined);
    setToken(currentUser?.access_token ?? undefined);

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? undefined);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return {
    signIn: async (data: UserCredentials) => supabase.auth.signIn(data, { redirectTo: import.meta.env.BASE_URL }),
    signOut: async () => supabase.auth.signOut(),
    user,
    token,
  };
};

export default useSupabaseAuth;
