// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getLoggedInStatus, setLoggedInStatus } from "@/utils/storage";

type AuthContextType = {
  isLoggedIn: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  logout: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadAuthStatus = async () => {
      const status = await getLoggedInStatus();
      setIsLoggedIn(status);
    };
    loadAuthStatus();
  }, []);

  const logout = async () => {
    try {
      await setLoggedInStatus(false);
      setIsLoggedIn(false); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);