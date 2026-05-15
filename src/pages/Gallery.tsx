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