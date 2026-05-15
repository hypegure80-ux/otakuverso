import { useState } from 'react';
import { useApp } from '../context';
import { catalogData, newsData } from '../data';

export default function ManhuaDonghua() {
  const { theme, addToList, getUserListStatus } = useApp();
  const isDark = theme === 'dark';
  const [tab, setTab] = useState<'all' | 'manhua' | 'donghua'>('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border';
  const surfaceBg = isDark ? 'bg-dark-surface' : 'bg-light-surface';

  const chinaItems = catalogData.filter(i => i.origin === 'china');
  const filtered = tab === 'all' ? chinaItems : chinaItems.filter(i => i.type === tab);
  const chinaNews = newsData.filter(n => n.category === 'Donghua' || n.tags.some(t => ['Donghua', 'Manhua', 'China'].includes(t)));

  const selected = catalogData.find(i => i.id === selectedId);

  const typeIcon = (type: string) => type === 'donghua' ? '🐉' : '📜';

  return (
    <div>
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8" style={{ height: '240px' }}>
        <img src="/images/donghua-art.jpg" alt="Donghua" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🇨🇳 Manhua & Donghua</h1>
            <p className="text-gray-300 text-sm">Explora lo mejor del entretenimiento chino: manhua, donghua y novelas web</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'all', label: '🌐 Todo', count: chinaItems.length },
          { key: 'manhua', label: '📜 Manhua', count: chinaItems.filter(i => i.type === 'manhua').length },
          { key: 'donghua', label: '🐉 Donghua', count: chinaItems.filter(i => i.type === 'donghua').length },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-neon-red text-white' : `${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Catalog */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filtered.map((item, i) => {
              const listStatus = getUserListStatus(item.id);
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border overflow-hidden card-hover ${cardBg} animate-fade-up`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <button onClick={() => setSelectedId(item.id)} className="w-full text-left">
                    <div className="h-32 flex items-center justify-center text-4xl relative" style={{ background: item.image }}>
                      {typeIcon(item.type)}
                      <span className="absolute top-2 left-2 badge bg-yellow-600/80 text-white">{item.type.toUpperCase()}</span>
                      <span className="absolute top-2 right-2 badge bg-yellow-500 text-black">⭐{item.rating}</span>
                    </div>
                    <div className="p-3">
                      <h3 className={`text-sm font-bold line-clamp-1 ${text}`}>{item.title}</h3>
                      <p className={`text-[10px] ${textMuted} mt-0.5`}>{item.titleJp}</p>
                      <p className={`text-xs ${textMuted} line-clamp-2 mt-1`}>{item.synopsis}</p>
                    </div>
                  </button>
                  <div className="px-3 pb-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] ${item.status === 'En emisión' ? 'text-green-400' : 'text-blue-400'}`}>{item.status}</span>
                      {listStatus ? (
                        <span className="text-[10px] text-green-400">✅ En lista</span>
                      ) : (
                        <div className="flex gap-1">
                          <button onClick={() => addToList(item.id, 'want')} className="text-[10px] px-2 py-0.5 rounded bg-neon-red/10 text-neon-red">📋</button>
                          <button onClick={() => addToList(item.id, 'completed')} className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400">✅</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* China News */}
          <div className={`rounded-xl border p-5 ${cardBg}`}>
            <h3 className={`text-lg font-bold mb-4 ${text}`}>📰 Noticias de China</h3>
            <div className="space-y-4">
              {chinaNews.map(news => (
                <div key={news.id} className={`pb-3 border-b last:border-0 ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
                  <h4 className={`text-sm font-bold ${text} line-clamp-2 mb-1`}>{news.title}</h4>
                  <p className={`text-xs ${textMuted} line-clamp-2`}>{news.summary}</p>
                  <span className={`text-[10px] ${textMuted} mt-1 block`}>{news.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-xl p-5 bg-gradient-to-br from-yellow-500/10 to-red-500/10 border border-yellow-500/20">
            <h3 className={`text-lg font-bold mb-2 ${text}`}>🎓 ¿Qué es el Donghua?</h3>
            <p className={`text-sm ${textMuted}`}>
              Donghua (动画) es el término para la animación china. En los últimos años, la industria del donghua ha crecido enormemente, con producciones que rivalizan con el anime japonés en calidad visual y narrativa.
            </p>
          </div>

          <div className="rounded-xl p-5 bg-gradient-to-br from-red-500/10 to-yellow-500/10 border border-red-500/20">
            <h3 className={`text-lg font-bold mb-2 ${text}`}>📜 ¿Qué es el Manhua?</h3>
            <p className={`text-sm ${textMuted}`}>
              Manhua (漫画) es el cómic chino. Se lee de izquierda a derecha y muchas veces se adapta de novelas web populares. Plataformas como Bilibili Comics y KuaiKan han popularizado el formato digitalmente.
            </p>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[90] modal-overlay flex items-center justify-center p-4" onClick={() => setSelectedId(null)}>
          <div className={`w-full max-w-xl rounded-2xl overflow-hidden ${isDark ? 'bg-dark-card' : 'bg-light-card'} shadow-2xl`} onClick={e => e.stopPropagation()}>
            <div className="h-40 flex items-center justify-center text-6xl relative" style={{ background: selected.image }}>
              {typeIcon(selected.type)}
              <button onClick={() => setSelectedId(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center">✕</button>
            </div>
            <div className="p-6">
              <h2 className={`text-xl font-bold mb-1 ${text}`}>{selected.title}</h2>
              <p className={`text-sm ${textMuted} mb-3`}>{selected.titleJp}</p>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{selected.synopsis}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selected.genres.map(g => (
                  <span key={g} className={`px-3 py-1 rounded-full text-xs ${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{g}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { addToList(selected.id, 'want'); setSelectedId(null); }} className="px-4 py-2 rounded-lg bg-neon-red text-white text-sm font-medium">📋 Añadir a lista</button>
                <button onClick={() => setSelectedId(null)} className={`px-4 py-2 rounded-lg text-sm ${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}