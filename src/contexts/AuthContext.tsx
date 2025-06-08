// src/contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { betterAuth } from "@/lib/betterauth/client";

interface BetterAuthUser {
  id: string;
  email?: string;
  name?: string;
}

interface AuthContextType {
  user: BetterAuthUser | null;
  loading: boolean;
  login: (email?: string, password?: string) => Promise<BetterAuthUser>;
  signup: (email?: string, password?: string) => Promise<BetterAuthUser>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<BetterAuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = betterAuth.onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email?: string, password?: string) => {
    const authUser = await betterAuth.login(email, password);
    setUser(authUser);
    return authUser;
  };

  const signup = async (email?: string, password?: string) => {
    const authUser = await betterAuth.signup(email, password);
    setUser(authUser);
    return authUser;
  };

  const logout = async () => {
    await betterAuth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
