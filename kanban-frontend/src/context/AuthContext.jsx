import { createContext, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setAuthToken] = useState(getToken());

  const login = (jwtToken) => {
    setToken(jwtToken);
    setAuthToken(jwtToken);
  };

  const logout = () => {
    removeToken();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}