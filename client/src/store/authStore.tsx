import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/services/api';
import type { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('technest_user');
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('technest_access_token');
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('technest_access_token', token);
    } else {
      localStorage.removeItem('technest_access_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('technest_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('technest_user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res: any = await api.post('/auth/login', { email, password });
      if (res.success && res.data) {
        const { user: userData, tokens } = res.data;
        setToken(tokens.accessToken);
        const rolesList = userData.roles?.map((r: any) => r.role.name) || ['CUSTOMER'];
        setUser({
          id: userData.id,
          name: userData.fullName,
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          role: rolesList.includes('ADMIN') || rolesList.includes('SUPER_ADMIN') ? 'admin' : 'customer',
          roles: rolesList,
        });
      }
    } catch (err: any) {
      throw new Error(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (fullName: string, email: string, password: string, phone?: string) => {
    setIsLoading(true);
    try {
      const res: any = await api.post('/auth/register', { fullName, email, password, phone });
      if (res.success && res.data) {
        const { user: userData, tokens } = res.data;
        setToken(tokens.accessToken);
        const rolesList = userData.roles?.map((r: any) => r.role.name) || ['CUSTOMER'];
        setUser({
          id: userData.id,
          name: userData.fullName,
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          role: rolesList.includes('ADMIN') || rolesList.includes('SUPER_ADMIN') ? 'admin' : 'customer',
          roles: rolesList,
        });
      }
    } catch (err: any) {
      throw new Error(err.message || 'Registration failed. Email may already be in use.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('technest_user');
    localStorage.removeItem('technest_access_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
