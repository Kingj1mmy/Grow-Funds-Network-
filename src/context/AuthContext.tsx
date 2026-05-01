import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, UserRole } from '../types';

interface AuthContextType {
  user: UserAccount | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate session recovery
    const savedUser = localStorage.getItem('network_identity');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (role: UserRole) => {
    const newUser: UserAccount = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === UserRole.USER ? 'Alex Rivera' : (role === UserRole.ADMIN ? 'System Admin' : 'Root Operator'),
      email: `${role.toLowerCase()}@growfunds.network`,
      role: role,
      isVerified: true
    };
    setUser(newUser);
    localStorage.setItem('network_identity', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('network_identity');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
