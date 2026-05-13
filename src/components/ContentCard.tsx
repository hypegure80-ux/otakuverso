import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Star, Heart, Bookmark, Play, Check } from 'lucide-react';
import type { AnimeManga } from '../data/content';
import RatingStars from './RatingStars';

interface ContentCardProps {
  item: AnimeManga;
  index?: number;
}

export default function ContentCard({ item, index = 0 }: ContentCardProps) {
  const { isDark } = useTheme();
  const { user, addToList, removeFromList, isInList } = useAuth();

  const typeColors: Record<string, string> = {
    anime: 'bg-blue-500/20 text-blue-400',
    manga: 'bg-green-500/20 text-green-400',
    webtoon: 'bg-purple-500/20 text-purple-400',
    manhua: 'bg-red-500/20 text-red-400',
    manhwa: 'bg-yellow-500/20 text-yellow-400',
    donghua: 'bg-cyan-500/20 text-cyan-400',
  };

  const statusColors: Record<string, string> = {
    'En emisión': 'text-green-400',
    'Finalizado': 'text-gray-400',
    'En pausa': 'text-yellow-400',
    'Anunciado': 'text-blue-400',
  };

  const toggleFavorite = () => {
    if (!user) return;
    if (isInList('favorites', item.id)) {
      removeFromList('favorites', item.id);
    } else {
      addToList('favorites', item.id);
    }
  };

  const toggleWatchlist = () => {
    if (!user) return;
    if (isInList('watchlist', item.id)) {
      removeFromList('watchlist', item.id);
    } else {
      addToList('watchlist', item.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group rounded-2xl border overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/5 ${
        isDark ? 'bg-dark-card border-dark-border hover:border-primary/30' : 'bg-white border-light-border hover:border-primary/30'
      }`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={item.cover}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold backdrop-blur-sm ${typeColors[item.type] || 'bg-gray-500/20 text-gray-400'}`}>
            {item.type}
          </span>
        </div>

        {user && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.preventDefault(); toggleFavorite(); }}
              className={`p-1.5 rounded-lg backdrop-blur-sm transition-colors ${
                isInList('favorites', item.id) ? 'bg-primary text-white' : 'bg-black/50 text-white hover:bg-primary'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isInList('favorites', item.id) ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); toggleWatchlist(); }}
              className={`p-1.5 rounded-lg backdrop-blur-sm transition-colors ${
                isInList('watchlist', item.id) ? 'bg-primary text-white' : 'bg-black/50 text-white hover:bg-primary'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isInList('watchlist', item.id) ? 'fill-white' : ''}`} />
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2">
            <button className="flex-1 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-1">
              <Play className="w-3 h-3" /> Ver más
            </button>
            {user && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (isInList('completed', item.id)) {
                    removeFromList('completed', item.id);
                  } else {
                    addToList('completed', item.id);
                  }
                }}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                  isInList('completed', item.id) ? 'bg-green-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Check className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className={`font-semibold text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors ${isDark ? 'text-white' : 'text-text-light'}`}>
          {item.title}
        </h3>
        {item.originalTitle && (
          <p className="text-xs text-gray-500 mb-2 line-clamp-1">{item.originalTitle}</p>
        )}
        <div className="flex items-center justify-between mb-2">
          <RatingStars rating={item.rating} size={12} />
          <span className={`text-xs font-medium ${statusColors[item.status]}`}>{item.status}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {item.genres.slice(0, 2).map(g => (
            <span key={g} className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${isDark ? 'bg-dark-surface text-text-muted-dark' : 'bg-light-surface text-text-muted-light'}`}>
              {g}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
