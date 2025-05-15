
'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation'; // Keep for logout redirect

interface AuthContextType {
  isAuthenticated: boolean | null;
  login: () => void; // This will set isAuthenticated and localStorage
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter(); // Used for logout redirect

  useEffect(() => {
    // Check localStorage on mount (client-side only)
    try {
      const storedAuthStatus = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(storedAuthStatus === 'true');
    } catch (error) {
      console.warn('Could not access localStorage for authentication status.');
      setIsAuthenticated(false); // Default to false
    }
  }, []);

  const login = useCallback(() => {
    try {
      localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      console.warn('Could not set localStorage for authentication status.');
    }
    setIsAuthenticated(true);
    // Redirection will be handled by the calling form/component
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.warn('Could not remove localStorage for authentication status.');
    }
    setIsAuthenticated(false);
    router.push('/login'); // Redirect to login on logout
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
