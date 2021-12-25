import { createContext, useEffect, useContext } from "react";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  useEffect(() => {
    netlifyIdentity.init({});
  }, []);

  const auth = {
    login: netlifyIdentity.open,
    logout: netlifyIdentity.logout,
    user: netlifyIdentity.currentUser,
    close: netlifyIdentity.close,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
