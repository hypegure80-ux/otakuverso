import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joined: string;
  favorites: string[];
  watchlist: string[];
  completed: string[];
  watching: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addToList: (list: 'favorites' | 'watchlist' | 'completed' | 'watching', id: string) => void;
  removeFromList: (list: 'favorites' | 'watchlist' | 'completed' | 'watching', id: string) => void;
  isInList: (list: 'favorites' | 'watchlist' | 'completed' | 'watching', id: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  register: () => false,
  logout: () => {},
  updateUser: () => {},
  addToList: () => {},
  removeFromList: () => {},
  isInList: () => false,
});

const AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('otakuverse-user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('otakuverse-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('otakuverse-user');
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('otakuverse-users') || '[]');
    const found = users.find((u: User) => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('otakuverse-users') || '[]');
    if (users.find((u: User) => u.email === email)) return false;
    
    const newUser: User = {
      id: 'u' + Date.now(),
      name,
      email,
      avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
      bio: 'Nuevo miembro de OtakuVerse',
      joined: new Date().toISOString().split('T')[0],
      favorites: [],
      watchlist: [],
      completed: [],
      watching: [],
    };
    users.push(newUser);
    localStorage.setItem('otakuverse-users', JSON.stringify(users));
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      const users = JSON.parse(localStorage.getItem('otakuverse-users') || '[]');
      const idx = users.findIndex((u: User) => u.id === user.id);
      if (idx >= 0) users[idx] = updated;
      localStorage.setItem('otakuverse-users', JSON.stringify(users));
    }
  };

  const addToList = (list: 'favorites' | 'watchlist' | 'completed' | 'watching', id: string) => {
    if (user) {
      const updated = { ...user, [list]: [...user[list], id] };
      setUser(updated);
      const users = JSON.parse(localStorage.getItem('otakuverse-users') || '[]');
      const idx = users.findIndex((u: User) => u.id === user.id);
      if (idx >= 0) users[idx] = updated;
      localStorage.setItem('otakuverse-users', JSON.stringify(users));
    }
  };

  const removeFromList = (list: 'favorites' | 'watchlist' | 'completed' | 'watching', id: string) => {
    if (user) {
      const updated = { ...user, [list]: user[list].filter(i => i !== id) };
      setUser(updated);
      const users = JSON.parse(localStorage.getItem('otakuverse-users') || '[]');
      const idx = users.findIndex((u: User) => u.id === user.id);
      if (idx >= 0) users[idx] = updated;
      localStorage.setItem('otakuverse-users', JSON.stringify(users));
    }
  };

  const isInList = (list: 'favorites' | 'watchlist' | 'completed' | 'watching', id: string) => {
    return user ? user[list].includes(id) : false;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, addToList, removeFromList, isInList }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
