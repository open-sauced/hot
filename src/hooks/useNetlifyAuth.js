import { useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

export const useNetlifyAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.init();
    setUser(netlifyIdentity.currentUser());
  }, [user]);

  return {
    user,
    login: netlifyIdentity.open,
  };
};
