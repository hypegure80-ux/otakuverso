import { useState } from 'react';
<<<<<<< HEAD
import { useApp } from '../context';
import { galleryData } from '../data';

export default function Gallery() {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<number | null>(null);

  const series = ['Todos', ...Array.from(new Set(galleryData.map(g => g.series)))];
  const filtered = filter === 'Todos' ? galleryData : galleryData.filter(g => g.series === filter);

  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border';

  const selectedImage = galleryData.find(g => g.id === selected);

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold ${text}`}>🎨 Galería / Fanart</h1>
        <p className={`text-sm ${textMuted} mt-1`}>Arte de fans de las series más populares</p>
      </div>

      {/* Series Filter */}
      <div className="flex flex-wrap gap-2 mb-6 no-scrollbar">
        {series.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              filter === s ? 'bg-neon-red text-white' : `${isDark ? 'bg-dark-surface text-gray-300 hover:bg-dark-border' : 'bg-light-surface text-gray-600 hover:bg-light-border'}`
=======
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { fanartData } from '../data/content';
import { Heart, X, Filter } from 'lucide-react';

export default function Gallery() {
  const { isDark } = useTheme();
  const [selectedSeries, setSelectedSeries] = useState('Todas');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());

  const series = ['Todas', ...Array.from(new Set(fanartData.map(f => f.series)))];

  const filtered = selectedSeries === 'Todas'
    ? fanartData
    : fanartData.filter(f => f.series === selectedSeries);

  const handleLike = (id: string) => {
    setLikedImages(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>Galería Fanart</h1>
        <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          Arte de la comunidad inspirado en tus series favoritas
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {series.map(s => (
          <button
            key={s}
            onClick={() => setSelectedSeries(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedSeries === s
                ? 'bg-primary text-white'
                : isDark ? 'bg-dark-card text-text-muted-dark hover:bg-dark-surface' : 'bg-white text-text-muted-light hover:bg-light-surface border border-light-border'
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
            }`}
          >
            {s}
          </button>
        ))}
      </div>

<<<<<<< HEAD
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setSelected(img.id)}
            className={`group rounded-xl overflow-hidden card-hover border ${cardBg} animate-fade-up`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div
              className="aspect-square flex items-center justify-center text-6xl relative"
              style={{ background: img.gradient }}
            >
              <span className="group-hover:scale-125 transition-transform duration-300">{img.emoji}</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-2xl">🔍</span>
              </div>
            </div>
            <div className="p-3">
              <h3 className={`text-xs font-bold ${text} line-clamp-1`}>{img.title}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className={`text-[10px] ${textMuted}`}>{img.artist}</span>
                <span className={`text-[10px] ${textMuted}`}>❤️ {img.likes.toLocaleString()}</span>
              </div>
            </div>
          </button>
=======
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(item.image)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-semibold text-sm">{item.title}</p>
              <p className="text-white/70 text-xs">por {item.artist}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-white/70 text-xs">{item.series}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleLike(item.id); }}
                  className="flex items-center gap-1 text-xs text-white"
                >
                  <Heart className={`w-3.5 h-3.5 ${likedImages.has(item.id) ? 'fill-primary text-primary' : ''}`} />
                  {item.likes + (likedImages.has(item.id) ? 1 : 0)}
                </button>
              </div>
            </div>
          </motion.div>
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
        ))}
      </div>

      {/* Lightbox */}
<<<<<<< HEAD
      {selectedImage && (
        <div className="fixed inset-0 z-[90] modal-overlay flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className={`w-full max-w-lg rounded-2xl overflow-hidden ${isDark ? 'bg-dark-card' : 'bg-light-card'} shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className="aspect-square flex items-center justify-center text-8xl" style={{ background: selectedImage.gradient }}>
              {selectedImage.emoji}
            </div>
            <div className="p-6">
              <h2 className={`text-xl font-bold mb-1 ${text}`}>{selectedImage.title}</h2>
              <p className={`text-sm ${textMuted} mb-2`}>por {selectedImage.artist}</p>
              <p className={`text-sm ${textMuted} mb-4`}>Serie: {selectedImage.series}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neon-red font-medium">❤️ {selectedImage.likes.toLocaleString()} likes</span>
                <div className="flex gap-2">
                  <button className={`px-3 py-1.5 rounded-lg text-xs ${isDark ? 'bg-dark-surface text-gray-300' : 'bg-light-surface text-gray-600'}`}>🐦 Compartir</button>
                  <button className={`px-3 py-1.5 rounded-lg text-xs ${isDark ? 'bg-dark-surface text-gray-300' : 'bg-light-surface text-gray-600'}`}>💾 Guardar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
=======
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Fanart"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
    </div>
  );
}
