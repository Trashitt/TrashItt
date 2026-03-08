import React, { createContext, useState } from 'react';

// 1. Create the Context (the loudspeaker)
export const AuthContext = createContext();

// 2. Create a Provider (the manager that holds the state)
export function AuthProvider({ children }) {
  // We start by assuming the user is NOT logged in (false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // A simple function to log the user in
  const login = () => setIsAuthenticated(true);

  // A simple function to log the user out
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}