import { useState } from 'react';
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
            }`}
          >
            {s}
          </button>
        ))}
      </div>

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
        ))}
      </div>

      {/* Lightbox */}
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
    </div>
  );
}
