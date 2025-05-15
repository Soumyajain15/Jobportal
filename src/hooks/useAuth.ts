'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean | null; // null while loading, then boolean
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage on mount (client-side only)
    try {
      const storedAuthStatus = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(storedAuthStatus === 'true');
    } catch (error) {
      // localStorage might not be available (e.g. in SSR or private browsing)
      console.warn('Could not access localStorage for authentication status.');
      setIsAuthenticated(false);
    }
  }, []);

  const login = useCallback(() => {
    try {
      localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      console.warn('Could not set localStorage for authentication status.');
    }
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.warn('Could not remove localStorage for authentication status.');
    }
    setIsAuthenticated(false);
    router.push('/login');
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