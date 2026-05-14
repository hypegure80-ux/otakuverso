<<<<<<< HEAD
import { useState } from 'react';
import { useApp } from '../context';
import { catalogData, allGenres, allTypes } from '../data';

export default function Recommendations() {
  const { theme, addToList, getUserListStatus } = useApp();
  const isDark = theme === 'dark';
  const [activeGenre, setActiveGenre] = useState('Todos');
  const [activeType, setActiveType] = useState('todos');
  const [sortBy, setSortBy] = useState<'rating' | 'popularity' | 'year'>('rating');

  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border';

  let filtered = [...catalogData];
  if (activeGenre !== 'Todos') filtered = filtered.filter(i => i.genres.includes(activeGenre));
  if (activeType !== 'todos') filtered = filtered.filter(i => i.type === activeType);

  filtered.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popularity') return b.popularity - a.popularity;
    return b.year - a.year;
  });

  const typeIcon = (type: string) => {
    switch (type) {
      case 'anime': return '🎬';
      case 'manga': return '📖';
      case 'manhwa': return '📱';
      case 'webtoon': return '📱';
      case 'donghua': return '🐉';
      case 'manhua': return '📜';
      default: return '📚';
    }
  };

  const listLabels: Record<string, string> = {
    want: '📋 Quiero ver',
    watching: '▶️ Viendo',
    completed: '✅ Completado',
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold ${text}`}>⭐ Recomendaciones</h1>
        <p className={`text-sm ${textMuted} mt-1`}>Listas curadas por género, tipo y puntuación</p>
      </div>

      {/* Filters */}
      <div className={`rounded-xl border p-4 mb-6 ${cardBg}`}>
        <div className="space-y-3">
          {/* Type Filter */}
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${textMuted} mb-2 block`}>Tipo</label>
            <div className="flex flex-wrap gap-2">
              {['todos', ...allTypes].map(type => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeType === type ? 'bg-neon-red text-white' : `${isDark ? 'bg-dark-surface text-gray-300 hover:bg-dark-border' : 'bg-light-surface text-gray-600 hover:bg-light-border'}`
                  }`}
                >
                  {type === 'todos' ? '🌐 Todos' : `${typeIcon(type)} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                </button>
              ))}
            </div>
          </div>
          {/* Genre Filter */}
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${textMuted} mb-2 block`}>Género</label>
            <div className="flex flex-wrap gap-2">
              {['Todos', ...allGenres.slice(0, 12)].map(genre => (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeGenre === genre ? 'bg-neon-blue text-white' : `${isDark ? 'bg-dark-surface text-gray-300 hover:bg-dark-border' : 'bg-light-surface text-gray-600 hover:bg-light-border'}`
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}>Ordenar:</label>
            {(['rating', 'popularity', 'year'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  sortBy === s ? 'bg-neon-purple text-white' : `${isDark ? 'bg-dark-surface text-gray-300' : 'bg-light-surface text-gray-600'}`
                }`}
              >
                {s === 'rating' ? '⭐ Rating' : s === 'popularity' ? '🔥 Popularidad' : '📅 Año'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className={`text-sm ${textMuted} mb-4`}>{filtered.length} resultado{filtered.length !== 1 && 's'}</p>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, i) => {
          const listStatus = getUserListStatus(item.id);
          return (
            <div
              key={item.id}
              className={`rounded-xl border overflow-hidden card-hover ${cardBg} animate-fade-up`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="h-40 flex items-center justify-center text-5xl relative" style={{ background: item.image }}>
                {typeIcon(item.type)}
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className="badge bg-black/60 text-white">{item.type.toUpperCase()}</span>
                  <span className={`badge ${item.origin === 'japan' ? 'bg-red-500/80' : item.origin === 'korea' ? 'bg-blue-500/80' : 'bg-yellow-500/80'} text-white`}>
                    {item.origin === 'japan' ? '🇯🇵' : item.origin === 'korea' ? '🇰🇷' : '🇨🇳'}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="badge bg-yellow-500 text-black font-bold">⭐ {item.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className={`text-base font-bold mb-1 ${text}`}>{item.title}</h3>
                <p className={`text-xs ${textMuted} mb-2`}>{item.titleJp}</p>
                <p className={`text-xs ${textMuted} line-clamp-2 mb-3`}>{item.synopsis}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.genres.slice(0, 3).map(g => (
                    <span key={g} className={`text-[10px] px-2 py-0.5 rounded-full ${isDark ? 'bg-dark-surface text-gray-300' : 'bg-light-surface text-gray-600'}`}>{g}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className={`text-xs ${textMuted}`}>
                    {item.episodes ? `${item.episodes} eps` : `${item.chapters} caps`} • {item.status}
                  </div>
                  {listStatus ? (
                    <span className="text-xs text-green-400 font-medium">{listLabels[listStatus]}</span>
                  ) : (
                    <div className="flex gap-1">
                      <button onClick={() => addToList(item.id, 'want')} className="text-[10px] px-2 py-1 rounded bg-neon-red/10 text-neon-red hover:bg-neon-red/20" title="Quiero ver">📋</button>
                      <button onClick={() => addToList(item.id, 'watching')} className="text-[10px] px-2 py-1 rounded bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20" title="Viendo">▶️</button>
                      <button onClick={() => addToList(item.id, 'completed')} className="text-[10px] px-2 py-1 rounded bg-green-500/10 text-green-400 hover:bg-green-500/20" title="Completado">✅</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
=======
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { allContent, genres } from '../data/content';
import ContentCard from '../components/ContentCard';
import { Filter, SlidersHorizontal, X } from 'lucide-react';

export default function Recommendations() {
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const urlType = searchParams.get('tipo') || '';
  const urlGenre = searchParams.get('genero') || '';

  const [filters, setFilters] = useState({
    type: urlType,
    genre: urlGenre,
    status: '',
    year: '',
    minRating: 0,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  const types = ['', 'anime', 'manga', 'webtoon', 'manhua', 'manhwa', 'donghua'];
  const statuses = ['', 'En emisión', 'Finalizado', 'En pausa', 'Anunciado'];
  const years = ['', '2025', '2024', '2023', '2022', '2021'];

  const filtered = useMemo(() => {
    let result = [...allContent];
    if (filters.type) result = result.filter(c => c.type === filters.type);
    if (filters.genre) result = result.filter(c => c.genres.includes(filters.genre));
    if (filters.status) result = result.filter(c => c.status === filters.status);
    if (filters.year) result = result.filter(c => c.year === parseInt(filters.year));
    if (filters.minRating > 0) result = result.filter(c => c.rating >= filters.minRating);

    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.year - a.year); break;
      case 'oldest': result.sort((a, b) => a.year - b.year); break;
      case 'title': result.sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return result;
  }, [filters, sortBy]);

  const clearFilters = () => {
    setFilters({ type: '', genre: '', status: '', year: '', minRating: 0 });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '' && v !== 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>Recomendaciones</h1>
          <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
            Descubre anime, manga, webtoons y más seleccionados para ti
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2 rounded-xl border text-sm outline-none ${isDark ? 'bg-dark-card border-dark-border text-white' : 'bg-white border-light-border text-text-light'}`}
          >
            <option value="rating">Mejor valorados</option>
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="title">A-Z</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              showFilters ? 'bg-primary text-white border-primary' : isDark ? 'bg-dark-card border-dark-border text-text-muted-dark' : 'bg-white border-light-border text-text-muted-light'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filtros
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={`rounded-2xl border p-5 mb-8 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Tipo</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-text-light'}`}
              >
                <option value="">Todos</option>
                {types.slice(1).map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Género</label>
              <select
                value={filters.genre}
                onChange={(e) => setFilters(f => ({ ...f, genre: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-text-light'}`}
              >
                <option value="">Todos</option>
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Estado</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-text-light'}`}
              >
                <option value="">Todos</option>
                {statuses.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Año</label>
              <select
                value={filters.year}
                onChange={(e) => setFilters(f => ({ ...f, year: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-text-light'}`}
              >
                <option value="">Todos</option>
                {years.slice(1).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Rating mínimo: {filters.minRating}</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={filters.minRating}
                onChange={(e) => setFilters(f => ({ ...f, minRating: parseFloat(e.target.value) }))}
                className="w-full accent-primary"
              />
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors"
            >
              <X className="w-3 h-3" /> Limpiar filtros
            </button>
          )}
        </motion.div>
      )}

      <div className="mb-4">
        <span className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          {filtered.length} resultados encontrados
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((item, i) => (
          <ContentCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Filter className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>No se encontraron resultados</p>
          <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Intenta ajustar los filtros</p>
        </div>
      )}
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
    </div>
  );
}
