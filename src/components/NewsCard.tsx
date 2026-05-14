import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Eye, Clock, Share2, MessageCircle } from 'lucide-react';
import type { NewsItem } from '../data/content';

interface NewsCardProps {
  news: NewsItem;
  variant?: 'default' | 'compact' | 'featured';
  index?: number;
}

export default function NewsCard({ news, variant = 'default', index = 0 }: NewsCardProps) {
  const { isDark } = useTheme();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: news.title, text: news.excerpt, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`group rounded-2xl border overflow-hidden transition-all hover:shadow-xl ${
          isDark ? 'bg-dark-card border-dark-border hover:border-primary/30' : 'bg-white border-light-border hover:border-primary/30'
        }`}
      >
        <div className="relative h-48 overflow-hidden">
          <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
            {news.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className={`font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors ${isDark ? 'text-white' : 'text-text-light'}`}>
            {news.title}
          </h3>
          <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
            {news.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 text-xs ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {news.date}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {news.views.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={handleShare} className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-surface text-text-muted-dark' : 'hover:bg-light-surface text-text-muted-light'}`}>
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link to={`/noticias/${news.id}`} className={`flex gap-3 p-3 rounded-xl transition-colors group ${isDark ? 'hover:bg-dark-surface' : 'hover:bg-light-surface'}`}>
          <img src={news.image} alt={news.title} className="w-20 h-14 object-cover rounded-lg shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className={`text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors ${isDark ? 'text-white' : 'text-text-light'}`}>
              {news.title}
            </h4>
            <span className="text-xs text-gray-500 mt-1">{news.category} &bull; {news.date}</span>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${
        isDark ? 'bg-dark-card border-dark-border hover:border-primary/30' : 'bg-white border-light-border hover:border-primary/30'
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden">
          <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-5 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
              {news.category}
            </span>
            <span className={`text-xs ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>{news.date}</span>
          </div>
          <h3 className={`font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors ${isDark ? 'text-white' : 'text-text-light'}`}>
            {news.title}
          </h3>
          <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
            {news.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 text-xs ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {news.views.toLocaleString()}</span>
              <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> Comentar</span>
            </div>
            <button onClick={handleShare} className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-surface text-text-muted-dark' : 'hover:bg-light-surface text-text-muted-light'}`}>
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
