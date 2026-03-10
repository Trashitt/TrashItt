import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// 1. Create the Context (the loudspeaker)
export const AuthContext = createContext();

// 2. Create a Provider (the manager that holds the state)
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
        
        // Fetch user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role || 'Citizen';
            setUserRole(role);
            // Store role in localStorage for quick access
            localStorage.setItem('userRole', role);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserRole(null);
        localStorage.removeItem('userRole');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Manual login function (called after signup)
  const login = (role = 'Citizen') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  // Manual logout function
  const logout = async () => {
    await auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      userRole, 
      loading,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}