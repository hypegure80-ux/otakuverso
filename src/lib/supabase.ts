// ================================================================
// src/lib/supabase.ts
// Cliente de Supabase - conexión central
// Coloca este archivo en: src/lib/supabase.ts
// ================================================================

import { createClient } from '@supabase/supabase-js';

// ─── CONFIGURACIÓN ───────────────────────────────────────────
// Obtén estos valores en: Supabase Dashboard > Settings > API
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Faltan las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── TIPOS (espejo de las tablas de Supabase) ────────────────
export interface Profile {
  id: string;
  username: string;
  avatar: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  image: string;
  featured: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  news_id: number;
  author_id: string;
  author_name: string;
  author_avatar: string;
  text: string;
  likes: number;
  created_at: string;
}

export interface CatalogItem {
  id: number;
  title: string;
  title_jp: string;
  type: 'anime' | 'manga' | 'webtoon' | 'manhua' | 'manhwa' | 'donghua';
  genres: string[];
  rating: number;
  episodes?: number;
  chapters?: number;
  status: 'En emisión' | 'Completado' | 'Próximamente';
  year: number;
  season?: string;
  studio?: string;
  synopsis: string;
  image: string;
  popularity: number;
  origin: 'japan' | 'korea' | 'china';
  created_at: string;
  updated_at: string;
}

export interface Mangaka {
  id: number;
  name: string;
  name_jp: string;
  photo: string;
  birth_date: string;
  nationality: string;
  bio: string;
  works: string[];
  awards: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Opening {
  id: number;
  title: string;
  anime: string;
  artist: string;
  type: 'OP' | 'ED';
  season: string;
  year: number;
  video_url: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  artist: string;
  series: string;
  gradient: string;
  emoji: string;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  author_id?: string;
  author_name: string;
  author_avatar: string;
  category: string;
  replies: number;
  views: number;
  likes: number;
  pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserList {
  id: number;
  user_id: string;
  catalog_id: number;
  status: 'want' | 'watching' | 'completed';
  rating?: number;
  created_at: string;
}