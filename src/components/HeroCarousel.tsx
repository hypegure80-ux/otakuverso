import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ChevronLeft, ChevronRight, TrendingUp, Eye } from 'lucide-react';
import { newsData } from '../data/content';
import { Link } from 'react-router-dom';

export default function HeroCarousel() {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const featured = newsData.slice(0, 5);

  const next = useCallback(() => setCurrent((c) => (c + 1) % featured.length), [featured.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + featured.length) % featured.length), [featured.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const item = featured[current];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[560px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-dark-bg via-dark-bg/70 to-transparent' : 'bg-gradient-to-t from-light-bg via-light-bg/70 to-transparent'}`} />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-12 md:pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold uppercase tracking-wide">
                {item.category}
              </span>
              <span className={`flex items-center gap-1 text-xs ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                <TrendingUp className="w-3 h-3" /> Destacado
              </span>
            </div>
            <h1 className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight ${isDark ? 'text-white' : 'text-text-light'}`}>
              {item.title}
            </h1>
            <p className={`text-sm md:text-base mb-5 line-clamp-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
              {item.excerpt}
            </p>
            <div className="flex items-center gap-4">
              <Link
                to={`/noticias/${item.id}`}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors"
              >
                Leer más
              </Link>
              <span className={`flex items-center gap-1 text-xs ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                <Eye className="w-3 h-3" /> {item.views.toLocaleString()} vistas
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute bottom-6 right-4 md:right-8 flex items-center gap-2">
          <button
            onClick={prev}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-text-light'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-text-light'}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-primary' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
