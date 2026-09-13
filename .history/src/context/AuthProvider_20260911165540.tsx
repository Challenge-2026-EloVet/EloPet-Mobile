import React, { createContext, useState, useEffect, useContext } from 'react';
import { getStoredToken, logoutService } from '../services/eloPetService';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadSession() {
      const token = await getStoredToken();
      if (token) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }
    loadSession();
  }, []);

  const logout = async () => {
    await logoutService();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
