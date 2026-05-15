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