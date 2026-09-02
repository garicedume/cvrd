'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isB2B: boolean;
  loading: boolean;
  loginB2B: (email: string, pass: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isB2B: false,
  loading: true,
  loginB2B: async () => ({ error: null }),
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isB2B, setIsB2B] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      
      if (data.session?.user) {
        const role = data.session.user.user_metadata?.role;
        setIsB2B(role === 'b2b_agency' || role === 'enterprise');
      }
      setLoading(false);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        const role = currentSession.user.user_metadata?.role;
        setIsB2B(role === 'b2b_agency' || role === 'enterprise');
      } else {
        setIsB2B(false);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginB2B = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      const role = data.user.user_metadata?.role;
      setIsB2B(role === 'b2b_agency' || role === 'enterprise');
    }

    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsB2B(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isB2B, loading, loginB2B, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);