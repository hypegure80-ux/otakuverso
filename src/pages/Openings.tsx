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
    </div>
  );
}
