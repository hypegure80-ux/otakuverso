import { createClient, type User, type Session } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Re-exportar User y Session de Supabase
export type { User, Session }

// Tipos personalizados
export interface Profile {
  id: string;
  username: string;
  avatar: string;
  role: 'user' | 'admin';
  created_at: string;
  bio?: string;
  joined?: string;
}

export type ExtendedUser = User & {
  name?: string;
  avatar?: string;
  bio?: string;
  joined?: string;
};

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
  title_jp?: string;
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
}

export interface Mangaka {
  id: number;
  name: string;
  name_jp?: string;
  photo: string;
  birth_date: string;
  nationality: string;
  bio: string;
  works: string[];
  awards: string[];
  active: boolean;
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
}

export interface GalleryImage {
  id: number;
  title: string;
  artist: string;
  series: string;
  gradient: string;
  emoji: string;
  likes: number;
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
}

export interface UserList {
  id: number;
  user_id: string;
  catalog_id: string;
  status: 'want' | 'watching' | 'completed';
  rating?: number;
  created_at: string;
}
