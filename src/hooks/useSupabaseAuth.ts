import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { UserCredentials } from "@supabase/gotrue-js/src/lib/types";

export interface UserAndTokens {
  user: User;
  providerToken: string | undefined;
  supabaseToken: string;
}

const useSupabaseAuth = () => {
  const [userAndTokens, setUserAndTokens] = useState<UserAndTokens>();

  const setNewUserAndTokens = (session: Session | null) => {
    if (session?.user) {
      setUserAndTokens({
        user: session.user,
        providerToken: session.provider_token ?? undefined,
        supabaseToken: session.access_token,
      });
    } else {
      setUserAndTokens(undefined);
    }
  };

  useEffect(() => {
    const session = supabase.auth.session();

    setNewUserAndTokens(session);

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setNewUserAndTokens(session);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return {
    signIn: async (data: UserCredentials) => supabase.auth.signIn(data, { redirectTo: import.meta.env.BASE_URL }),
    signOut: async () => supabase.auth.signOut(),
    userAndTokens,
  };
};

export default useSupabaseAuth;
