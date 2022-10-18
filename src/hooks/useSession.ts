import { useEffect } from "react";
import { useGlobalStateContext } from "../../context/global-state";
import { supabase } from "../lib/supabase";

const useSession = () => {
  const currentUser = supabase.auth.session();
  const { appState, setAppState } = useGlobalStateContext();

  async function loadSession () {
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/session`, {
        method: "GET",
        headers: { Authorization: `Bearer ${currentUser?.access_token}` },
      });

      const data = await resp.json();

      setAppState(state => ({
        ...state,
        sessionOpened: data.is_sessionOpened,
      }));
    } catch (e) {
      // show an alert
    }
  }

  useEffect(() => {
    if (currentUser?.access_token) {
      loadSession();
    }
  }, [currentUser]);

  return { sessionOpened: appState.sessionOpened };
};

export default useSession;
