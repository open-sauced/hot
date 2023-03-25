import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session, User } from "@supabase/supabase-js";

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
      // -TODO: Fix types
      // eslint-disable-next-line
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      listener.subscription.unsubscribe();
    };
  }, []);

  return {
    // -TODO: Fix types
    // eslint-disable-next-line
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return, no-return-await, @typescript-eslint/no-unsafe-call
    signIn: async (data: any) => await supabase.auth.signInWithOAuth(data || { provider: "github" }),
    signOut: async () => supabase.auth.signOut(),
    userAndTokens,
  };
};

export default useSupabaseAuth;
