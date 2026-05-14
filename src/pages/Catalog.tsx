import { useState } from 'react';
import { useApp } from '../context';
import { catalogData, allGenres, allStatus } from '../data';

export default function Catalog() {
  const { theme, addToList, getUserListStatus } = useApp();
  const isDark = theme === 'dark';
  const [filterGenre, setFilterGenre] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterType, setFilterType] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'rating' | 'popularity' | 'year' | 'title'>('popularity');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border';
  const surfaceBg = isDark ? 'bg-dark-surface' : 'bg-light-surface';

  // Filter manga/webtoon types
  const relevantTypes = ['todos', 'manga', 'webtoon', 'anime'];
  let filtered = catalogData.filter(i => ['manga', 'webtoon', 'anime', 'manhwa'].includes(i.type));
  if (filterType !== 'todos') filtered = filtered.filter(i => i.type === filterType);
  if (filterGenre !== 'Todos') filtered = filtered.filter(i => i.genres.includes(filterGenre));
  if (filterStatus !== 'Todos') filtered = filtered.filter(i => i.status === filterStatus);
  filtered.sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popularity') return b.popularity - a.popularity;
    if (sortBy === 'year') return b.year - a.year;
    return a.title.localeCompare(b.title);
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

  const selected = catalogData.find(i => i.id === selectedId);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${text}`}>📚 Manga / Webtoon / Anime</h1>
          <p className={`text-sm ${textMuted} mt-1`}>Catálogo completo con sinopsis, géneros y rating</p>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-neon-red text-white' : surfaceBg}`}>▦</button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-neon-red text-white' : surfaceBg}`}>☰</button>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl border p-4 mb-6 ${cardBg} space-y-3`}>
        <div className="flex flex-wrap gap-2">
          {relevantTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterType === type ? 'bg-neon-red text-white' : `${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`
              }`}
            >
              {type === 'todos' ? '🌐 Todos' : `${typeIcon(type)} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {['Todos', ...allGenres.slice(0, 10)].map(g => (
            <button
              key={g}
              onClick={() => setFilterGenre(g)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterGenre === g ? 'bg-neon-blue text-white' : `${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-2">
            {['Todos', ...allStatus].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filterStatus === s ? 'bg-green-500 text-white' : `${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className={`px-3 py-1.5 rounded-full text-xs border ${isDark ? 'bg-dark-surface border-dark-border text-gray-300' : 'bg-light-surface border-light-border text-gray-600'}`}
          >
            <option value="popularity">🔥 Popularidad</option>
            <option value="rating">⭐ Rating</option>
            <option value="year">📅 Año</option>
            <option value="title">🔤 Título</option>
          </select>
        </div>
      </div>

      <p className={`text-sm ${textMuted} mb-4`}>{filtered.length} resultado{filtered.length !== 1 && 's'}</p>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`text-left rounded-xl border overflow-hidden card-hover ${cardBg} animate-fade-up`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="h-36 flex items-center justify-center text-5xl relative" style={{ background: item.image }}>
                {typeIcon(item.type)}
                <span className="absolute top-2 left-2 badge bg-black/60 text-white text-[10px]">{item.type.toUpperCase()}</span>
                <span className="absolute top-2 right-2 badge bg-yellow-500 text-black font-bold text-[10px]">⭐{item.rating}</span>
              </div>
              <div className="p-3">
                <h3 className={`text-sm font-bold line-clamp-1 ${text}`}>{item.title}</h3>
                <p className={`text-[10px] ${textMuted} mt-0.5`}>{item.genres.slice(0, 2).join(' • ')}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-[10px] ${item.status === 'En emisión' ? 'text-green-400' : item.status === 'Completado' ? 'text-blue-400' : 'text-yellow-400'}`}>
                    {item.status === 'En emisión' ? '🟢' : item.status === 'Completado' ? '🔵' : '🟡'} {item.status}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border ${cardBg} card-hover animate-fade-up`}
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl shrink-0" style={{ background: item.image }}>
                {typeIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-bold ${text}`}>{item.title}</h3>
                <p className={`text-xs ${textMuted}`}>{item.type.toUpperCase()} • {item.genres.slice(0, 3).join(', ')} • {item.year}</p>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <div className="text-sm font-bold text-yellow-400">⭐ {item.rating}</div>
                <div className={`text-xs ${item.status === 'En emisión' ? 'text-green-400' : 'text-blue-400'}`}>{item.status}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[90] modal-overlay flex items-center justify-center p-4" onClick={() => setSelectedId(null)}>
          <div className={`w-full max-w-2xl rounded-2xl overflow-hidden ${isDark ? 'bg-dark-card' : 'bg-light-card'} shadow-2xl max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="h-48 flex items-center justify-center text-7xl relative" style={{ background: selected.image }}>
              {typeIcon(selected.type)}
              <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center">✕</button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-neon-red text-white">{selected.type.toUpperCase()}</span>
                <span className={`badge ${selected.status === 'En emisión' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>{selected.status}</span>
                <span className="badge bg-yellow-500/10 text-yellow-400">⭐ {selected.rating}</span>
              </div>
              <h2 className={`text-2xl font-bold mb-1 ${text}`}>{selected.title}</h2>
              <p className={`text-sm ${textMuted} mb-4`}>{selected.titleJp}</p>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{selected.synopsis}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`p-3 rounded-lg ${surfaceBg}`}>
                  <p className={`text-xs ${textMuted}`}>Año</p>
                  <p className={`text-sm font-bold ${text}`}>{selected.year}</p>
                </div>
                <div className={`p-3 rounded-lg ${surfaceBg}`}>
                  <p className={`text-xs ${textMuted}`}>Estudio</p>
                  <p className={`text-sm font-bold ${text}`}>{selected.studio || 'N/A'}</p>
                </div>
                <div className={`p-3 rounded-lg ${surfaceBg}`}>
                  <p className={`text-xs ${textMuted}`}>{selected.episodes ? 'Episodios' : 'Capítulos'}</p>
                  <p className={`text-sm font-bold ${text}`}>{selected.episodes || selected.chapters}</p>
                </div>
                <div className={`p-3 rounded-lg ${surfaceBg}`}>
                  <p className={`text-xs ${textMuted}`}>Origen</p>
                  <p className={`text-sm font-bold ${text}`}>{selected.origin === 'japan' ? '🇯🇵 Japón' : selected.origin === 'korea' ? '🇰🇷 Corea' : '🇨🇳 China'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {selected.genres.map(g => (
                  <span key={g} className={`px-3 py-1 rounded-full text-xs ${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{g}</span>
                ))}
              </div>
              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {getUserListStatus(selected.id) ? (
                  <span className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 text-sm font-medium">
                    ✅ En tu lista
                  </span>
                ) : (
                  <>
                    <button onClick={() => addToList(selected.id, 'want')} className="px-4 py-2 rounded-lg bg-neon-red/10 text-neon-red text-sm font-medium hover:bg-neon-red/20">📋 Quiero ver</button>
                    <button onClick={() => addToList(selected.id, 'watching')} className="px-4 py-2 rounded-lg bg-neon-blue/10 text-neon-blue text-sm font-medium hover:bg-neon-blue/20">▶️ Viendo</button>
                    <button onClick={() => addToList(selected.id, 'completed')} className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 text-sm font-medium hover:bg-green-500/20">✅ Completado</button>
                  </>
                )}
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>🔗 Compartir</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
