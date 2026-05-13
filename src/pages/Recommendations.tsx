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
    </div>
  );
}
