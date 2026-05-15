import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase, type Profile, type UserList, type CatalogItem } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (username: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  updateUser: (data: { username?: string; bio?: string; avatar?: string }) => Promise<void>;
  userList: UserList[];
  addToList: (catalogId: number, status: 'want' | 'watching' | 'completed') => Promise<void>;
  removeFromList: (catalogId: number) => Promise<void>;
  isInList: (catalogId: number) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState<UserList[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchUserList(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchUserList(session.user.id);
      } else {
        setProfile(null);
        setUserList([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data as Profile);
    setLoading(false);
  }

  async function fetchUserList(userId: string) {
    const { data } = await supabase.from('user_lists').select('*').eq('user_id', userId);
    if (data) setUserList(data as UserList[]);
  }

  const login = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    return null;
  };

  const register = async (username: string, email: string, password: string): Promise<string | null> => {
    const avatars = ['🧑‍💻', '🎮', '🎌', '⛩️', '🌸', '🐉', '🦊', '👾'];
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, avatar } }
    });
    if (error) return error.message;
    return null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUserList([]);
  };

  const updateUser = async (data: { username?: string; bio?: string; avatar?: string }) => {
    if (!user) return;
    await supabase.from('profiles').update(data).eq('id', user.id);
    fetchProfile(user.id);
  };

  const addToList = async (catalogId: number, status: 'want' | 'watching' | 'completed') => {
    if (!user) return;
    await supabase.from('user_lists').upsert(
      { user_id: user.id, catalog_id: catalogId, status },
      { onConflict: 'user_id,catalog_id' }
    );
    fetchUserList(user.id);
  };

  const removeFromList = async (catalogId: number) => {
    if (!user) return;
    await supabase.from('user_lists').delete().eq('user_id', user.id).eq('catalog_id', catalogId);
    setUserList(prev => prev.filter(i => i.catalog_id !== catalogId));
  };

  const isInList = (catalogId: number) => userList.some(i => i.catalog_id === catalogId);

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      session, user, profile, isAdmin, loading, login, register, logout, updateUser,
      userList, addToList, removeFromList, isInList
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
