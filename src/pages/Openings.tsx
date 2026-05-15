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