<<<<<<< HEAD
import { useState } from 'react';
import { useApp } from '../context';
import { openingsData } from '../data';

export default function Openings() {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [filterType, setFilterType] = useState<'all' | 'OP' | 'ED'>('all');
  const [filterYear, setFilterYear] = useState('all');

  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border';

  const years = ['all', ...Array.from(new Set(openingsData.map(o => String(o.year)))).sort().reverse()];

  let filtered = [...openingsData];
  if (filterType !== 'all') filtered = filtered.filter(o => o.type === filterType);
  if (filterYear !== 'all') filtered = filtered.filter(o => String(o.year) === filterYear);

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold ${text}`}>🎵 Openings & Endings</h1>
        <p className={`text-sm ${textMuted} mt-1`}>Los mejores OPs y EDs del anime por temporada y año</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-2">
          {(['all', 'OP', 'ED'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterType === t ? 'bg-neon-red text-white' : `${isDark ? 'bg-dark-surface text-gray-300' : 'bg-light-surface text-gray-600'}`
              }`}
            >
              {t === 'all' ? '🎵 Todos' : t === 'OP' ? '🎬 Openings' : '🌙 Endings'}
            </button>
          ))}
        </div>
        <select
          value={filterYear}
          onChange={e => setFilterYear(e.target.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium border ${isDark ? 'bg-dark-surface border-dark-border text-gray-300' : 'bg-light-surface border-light-border text-gray-600'} focus:outline-none`}
        >
          {years.map(y => (
            <option key={y} value={y}>{y === 'all' ? '📅 Todos los años' : y}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((op, i) => (
          <a
            key={op.id}
            href={op.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group rounded-xl border overflow-hidden card-hover ${cardBg} animate-fade-up`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div
              className="h-36 flex items-center justify-center relative"
              style={{ background: gradients[i % gradients.length] }}
            >
              <span className="text-5xl group-hover:scale-110 transition-transform">🎵</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-4xl">▶️</span>
              </div>
              <span className={`absolute top-2 left-2 badge ${op.type === 'OP' ? 'bg-neon-red' : 'bg-neon-blue'} text-white`}>
                {op.type}
              </span>
            </div>
            <div className="p-4">
              <h3 className={`text-sm font-bold mb-1 ${text}`}>{op.title}</h3>
              <p className={`text-xs ${textMuted} mb-1`}>{op.anime}</p>
              <p className={`text-xs ${textMuted}`}>🎤 {op.artist}</p>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-[10px] ${textMuted}`}>{op.season} {op.year}</span>
                <span className="text-[10px] text-neon-red font-medium">▶ Ver en YouTube</span>
              </div>
            </div>
          </a>
        ))}
      </div>
=======
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { openingsData } from '../data/content';
import { Play, Music, ExternalLink, Filter } from 'lucide-react';

export default function Openings() {
  const { isDark } = useTheme();
  const [selectedSeason, setSelectedSeason] = useState('Todas');
  const [selectedYear, setSelectedYear] = useState('Todas');
  const [selectedType, setSelectedType] = useState('Todas');

  const seasons = ['Todas', ...Array.from(new Set(openingsData.map(o => o.season)))];
  const years = ['Todas', ...Array.from(new Set(openingsData.map(o => o.year.toString())))];
  const types = ['Todas', 'OP', 'ED'];

  const filtered = useMemo(() => {
    return openingsData.filter(o => {
      if (selectedSeason !== 'Todas' && o.season !== selectedSeason) return false;
      if (selectedYear !== 'Todas' && o.year.toString() !== selectedYear) return false;
      if (selectedType !== 'Todas' && o.type !== selectedType) return false;
      return true;
    });
  }, [selectedSeason, selectedYear, selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>Openings & Endings</h1>
        <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          Los mejores OPs y EDs del anime organizados por temporada y año
        </p>
      </div>

      <div className={`rounded-2xl border p-5 mb-8 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-primary" />
          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-text-light'}`}>Filtros</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Temporada</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-text-light'}`}
            >
              {seasons.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Año</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-text-light'}`}
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Tipo</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-text-light'}`}
            >
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`group rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${
              isDark ? 'bg-dark-card border-dark-border hover:border-primary/30' : 'bg-white border-light-border hover:border-primary/30'
            }`}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-white hover:bg-primary transition-colors"
                >
                  <Play className="w-5 h-5 ml-0.5" />
                </a>
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                  item.type === 'OP' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                }`}>
                  {item.type} {item.number}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className={`font-semibold text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors ${isDark ? 'text-white' : 'text-text-light'}`}>
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 mb-2">{item.anime}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Music className="w-3 h-3" />
                  {item.artist}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className={`mt-2 text-xs ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                {item.season} {item.year}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Music className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-text-light'}`}>No se encontraron resultados</p>
        </div>
      )}
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
    </div>
  );
}
