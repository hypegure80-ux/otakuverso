// ================================================================
// src/context.tsx  (REEMPLAZA el archivo original completo)
// Conecta autenticación y datos a Supabase
// ================================================================

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase, type Profile, type CatalogItem, type UserList } from './lib/supabase';
import type { Session } from '@supabase/supabase-js';

type Page = 'home' | 'news' | 'recommendations' | 'gallery' | 'openings' | 'catalog' | 'manhua' | 'korea' | 'mangakas' | 'community' | 'admin';

interface AppContextType {
  // Tema
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  // Navegación
  page: Page;
  setPage: (p: Page) => void;
  detailId: number | null;
  setDetailId: (id: number | null) => void;
  newsDetailId: number | null;
  setNewsDetailId: (id: number | null) => void;
  // Búsqueda
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  showSearch: boolean;
  setShowSearch: (v: boolean) => void;
  // Auth modal
  showAuth: boolean;
  setShowAuth: (v: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (m: 'login' | 'register') => void;
  // Usuario y sesión
  session: Session | null;
  profile: Profile | null;
  isAdmin: boolean;
  authLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (username: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  // Lista de usuario
  userList: UserList[];
  addToList: (catalogId: number, status: 'want' | 'watching' | 'completed') => Promise<void>;
  removeFromList: (catalogId: number) => Promise<void>;
  getUserListStatus: (catalogId: number) => string | undefined;
  // Cache de catálogo para la lista
  catalogCache: CatalogItem[];
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // ─── TEMA ─────────────────────────────────────────────────
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('otakuverse-theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // ─── NAVEGACIÓN ───────────────────────────────────────────
  const [page, setPageState] = useState<Page>('home');
  const [detailId, setDetailId] = useState<number | null>(null);
  const [newsDetailId, setNewsDetailId] = useState<number | null>(null);

  // ─── BÚSQUEDA ─────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // ─── AUTH MODAL ───────────────────────────────────────────
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // ─── SESIÓN Y PERFIL ──────────────────────────────────────
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ─── LISTA DEL USUARIO ────────────────────────────────────
  const [userList, setUserList] = useState<UserList[]>([]);
  const [catalogCache, setCatalogCache] = useState<CatalogItem[]>([]);

  // ─── EFECTOS ──────────────────────────────────────────────

  // Tema
  useEffect(() => {
    localStorage.setItem('otakuverse-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Inicializar sesión de Supabase
  useEffect(() => {
    // Obtener sesión actual al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
        fetchUserList(session.user.id);
      } else {
        setAuthLoading(false);
      }
    });

    // Escuchar cambios de auth (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
        fetchUserList(session.user.id);
      } else {
        setProfile(null);
        setUserList([]);
        setAuthLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ─── FUNCIONES INTERNAS ───────────────────────────────────

  async function fetchProfile(userId: string) {
    setAuthLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (!error && data) setProfile(data as Profile);
    setAuthLoading(false);
  }

  async function fetchUserList(userId: string) {
    const { data, error } = await supabase
      .from('user_lists')
      .select('*')
      .eq('user_id', userId);
    if (!error && data) {
      setUserList(data as UserList[]);
      // Cargar info del catálogo para los items de la lista
      if (data.length > 0) {
        const ids = data.map(item => item.catalog_id);
        const { data: catalogItems } = await supabase
          .from('catalog')
          .select('*')
          .in('id', ids);
        if (catalogItems) setCatalogCache(catalogItems as CatalogItem[]);
      }
    }
  }

  // ─── FUNCIONES PÚBLICAS ───────────────────────────────────

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const setPage = (p: Page) => {
    setPageState(p);
    setDetailId(null);
    setNewsDetailId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login real con Supabase — devuelve mensaje de error o null si OK
  const login = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    setShowAuth(false);
    return null;
  };

  // Registro real con Supabase
  const register = async (username: string, email: string, password: string): Promise<string | null> => {
    const avatars = ['🧑‍💻', '🎮', '🎌', '⛩️', '🌸', '🐉', '🦊', '👾'];
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, avatar }  // se pasan al trigger handle_new_user
      }
    });
    if (error) return error.message;
    setShowAuth(false);
    return null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setPage('home');
  };

  // Lista del usuario
  const addToList = async (catalogId: number, status: 'want' | 'watching' | 'completed') => {
    if (!session) { setShowAuth(true); return; }
    const { error } = await supabase
      .from('user_lists')
      .upsert({ user_id: session.user.id, catalog_id: catalogId, status }, { onConflict: 'user_id,catalog_id' });
    if (!error) fetchUserList(session.user.id);
  };

  const removeFromList = async (catalogId: number) => {
    if (!session) return;
    const { error } = await supabase
      .from('user_lists')
      .delete()
      .eq('user_id', session.user.id)
      .eq('catalog_id', catalogId);
    if (!error) setUserList(prev => prev.filter(i => i.catalog_id !== catalogId));
  };

  const getUserListStatus = (catalogId: number) =>
    userList.find(i => i.catalog_id === catalogId)?.status;

  const isAdmin = profile?.role === 'admin';

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      page, setPage, detailId, setDetailId, newsDetailId, setNewsDetailId,
      searchQuery, setSearchQuery, showSearch, setShowSearch,
      showAuth, setShowAuth, authMode, setAuthMode,
      session, profile, isAdmin, authLoading,
      login, register, logout,
      userList, addToList, removeFromList, getUserListStatus, catalogCache,
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
