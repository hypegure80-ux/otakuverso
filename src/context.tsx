// Context de compatibilidad - re-exporta los contextos nuevos con la API antigua
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase, type Profile, type UserList, type CatalogItem, type Session, type User } from './lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// Re-exportar los tipos y hooks de los nuevos contextos
export { useTheme } from './context/ThemeContext';
export { useAuth } from './context/AuthContext';

type Page = 'home' | 'news' | 'recommendations' | 'gallery' | 'openings' | 'catalog' | 'manhua' | 'korea' | 'mangakas' | 'community' | 'admin';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  page: Page;
  setPage: (p: Page) => void;
  detailId: number | null;
  setDetailId: (id: number | null) => void;
  newsDetailId: number | null;
  setNewsDetailId: (id: number | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  showSearch: boolean;
  setShowSearch: (v: boolean) => void;
  showAuth: boolean;
  setShowAuth: (v: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (m: 'login' | 'register') => void;
  // Usuario
  session: Session | null;
  user: SupabaseUser | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (username: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  // Lista de usuario
  userList: UserList[];
  addToList: (catalogId: number, status: 'want' | 'watching' | 'completed') => Promise<void>;
  removeFromList: (catalogId: number) => Promise<void>;
  getUserListStatus: (catalogId: number) => string | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('otakuverse-theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  const [page, setPageState] = useState<Page>('home');
  const [detailId, setDetailId] = useState<number | null>(null);
  const [newsDetailId, setNewsDetailId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState<UserList[]>([]);

  useEffect(() => {
    localStorage.setItem('otakuverse-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

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

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const setPage = (p: Page) => {
    setPageState(p);
    setDetailId(null);
    setNewsDetailId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    setShowAuth(false);
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
    setShowAuth(false);
    return null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setPage('home');
  };

  const addToList = async (catalogId: number, status: 'want' | 'watching' | 'completed') => {
    if (!user) { setShowAuth(true); return; }
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

  const getUserListStatus = (catalogId: number) => userList.find(i => i.catalog_id === catalogId)?.status;

  const isAdmin = profile?.role === 'admin';

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      page, setPage, detailId, setDetailId, newsDetailId, setNewsDetailId,
      searchQuery, setSearchQuery, showSearch, setShowSearch,
      showAuth, setShowAuth, authMode, setAuthMode,
      session, user, profile, isAdmin, loading,
      login, register, logout,
      userList, addToList, removeFromList, getUserListStatus,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}

export type { Profile, UserList, CatalogItem, Session };
