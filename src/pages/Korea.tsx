import { useState } from 'react';
import { useApp } from '../context';
import { catalogData, newsData } from '../data';

export default function Korea() {
  const { theme, addToList, getUserListStatus } = useApp();
  const isDark = theme === 'dark';
  const [tab, setTab] = useState<'all' | 'manhwa' | 'webtoon'>('all');

  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border';
  const surfaceBg = isDark ? 'bg-dark-surface' : 'bg-light-surface';

  const koreaItems = catalogData.filter(i => i.origin === 'korea');
  const filtered = tab === 'all' ? koreaItems : koreaItems.filter(i => i.type === tab);
  const koreaNews = newsData.filter(n =>
    n.tags.some(t => ['Manhwa', 'Solo Leveling', 'K-pop', 'Corea del Sur', 'Webtoon', 'Tower of God'].includes(t)) ||
    n.category === 'Webtoon'
  );

  const kpopHighlights = [
    { artist: 'YOASOBI', song: 'Idol', anime: 'Oshi no Ko', emoji: '🎤' },
    { artist: 'TXT', song: 'LEveL', anime: 'Solo Leveling', emoji: '🎵' },
    { artist: 'BLACKPINK', song: 'Colaboración Anime', anime: 'Varios', emoji: '🎶' },
    { artist: 'Stray Kids', song: 'Case 143', anime: 'Tower of God', emoji: '🎸' },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8" style={{ height: '240px' }}>
        <img src="/images/hero-korea.jpg" alt="Korea" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🇰🇷 Corea del Sur</h1>
            <p className="text-gray-300 text-sm">Manhwa, webtoon coreano, K-drama animado y cultura pop</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'all', label: '🌐 Todo', count: koreaItems.length },
          { key: 'manhwa', label: '📱 Manhwa', count: koreaItems.filter(i => i.type === 'manhwa').length },
          { key: 'webtoon', label: '📱 Webtoon', count: koreaItems.filter(i => i.type === 'webtoon').length },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-neon-blue text-white' : `${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Catalog */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filtered.map((item, i) => {
              const listStatus = getUserListStatus(item.id);
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border overflow-hidden card-hover ${cardBg} animate-fade-up`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="h-32 flex items-center justify-center text-4xl relative" style={{ background: item.image }}>
                    📱
                    <span className="absolute top-2 left-2 badge bg-blue-600/80 text-white">{item.type.toUpperCase()}</span>
                    <span className="absolute top-2 right-2 badge bg-yellow-500 text-black">⭐{item.rating}</span>
                  </div>
                  <div className="p-3">
                    <h3 className={`text-sm font-bold line-clamp-1 ${text}`}>{item.title}</h3>
                    <p className={`text-[10px] ${textMuted} mt-0.5`}>{item.titleJp}</p>
                    <p className={`text-xs ${textMuted} line-clamp-2 mt-1`}>{item.synopsis}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-[10px] ${item.status === 'En emisión' ? 'text-green-400' : 'text-blue-400'}`}>{item.status}</span>
                      {listStatus ? (
                        <span className="text-[10px] text-green-400">✅ En lista</span>
                      ) : (
                        <div className="flex gap-1">
                          <button onClick={() => addToList(item.id, 'want')} className="text-[10px] px-2 py-0.5 rounded bg-neon-blue/10 text-neon-blue">📋</button>
                          <button onClick={() => addToList(item.id, 'completed')} className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400">✅</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* K-pop & Anime */}
          <div className={`rounded-xl border p-5 ${cardBg}`}>
            <h3 className={`text-lg font-bold mb-4 ${text}`}>🎵 K-pop × Anime</h3>
            <p className={`text-sm ${textMuted} mb-4`}>Colaboraciones entre artistas coreanos y la industria del anime</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {kpopHighlights.map((item, i) => (
                <div key={i} className={`p-4 rounded-lg ${surfaceBg} flex items-center gap-3`}>
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <p className={`text-sm font-bold ${text}`}>{item.artist}</p>
                    <p className={`text-xs ${textMuted}`}>{item.song} • {item.anime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Korea News */}
          <div className={`rounded-xl border p-5 ${cardBg}`}>
            <h3 className={`text-lg font-bold mb-4 ${text}`}>📰 Noticias de Corea</h3>
            <div className="space-y-4">
              {koreaNews.map(news => (
                <div key={news.id} className={`pb-3 border-b last:border-0 ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
                  <h4 className={`text-sm font-bold ${text} line-clamp-2 mb-1`}>{news.title}</h4>
                  <p className={`text-xs ${textMuted} line-clamp-2`}>{news.summary}</p>
                  <span className={`text-[10px] ${textMuted} mt-1 block`}>{news.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Culture Box */}
          <div className="rounded-xl p-5 bg-gradient-to-br from-blue-500/10 to-pink-500/10 border border-blue-500/20">
            <h3 className={`text-lg font-bold mb-2 ${text}`}>🎭 Cultura Pop Coreana</h3>
            <p className={`text-sm ${textMuted} mb-3`}>
              Corea del Sur se ha convertido en un gigante cultural global. Desde el K-pop hasta los webtoons, pasando por los K-dramas y el manhwa, la Hallyu (ola coreana) sigue conquistando corazones en todo el mundo.
            </p>
            <div className="flex flex-wrap gap-2">
              {['#Manhwa', '#Webtoon', '#KPop', '#KDrama', '#Hallyu'].map(tag => (
                <span key={tag} className={`text-xs px-2 py-1 rounded-full ${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div className={`rounded-xl border p-5 ${cardBg}`}>
            <h3 className={`text-lg font-bold mb-3 ${text}`}>📱 Plataformas Populares</h3>
            <div className="space-y-2">
              {[
                { name: 'Naver Webtoon', desc: 'La plataforma más grande de webtoons', emoji: '🟢' },
                { name: 'Kakao Page', desc: 'Manhwa y novelas web premium', emoji: '🟡' },
                { name: 'Lezhin Comics', desc: 'Webtoons para adultos y premium', emoji: '🔴' },
                { name: 'Tapas', desc: 'Webtoons en inglés y español', emoji: '🟣' },
              ].map((p, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${surfaceBg}`}>
                  <span className="text-xl">{p.emoji}</span>
                  <div>
                    <p className={`text-sm font-bold ${text}`}>{p.name}</p>
                    <p className={`text-[10px] ${textMuted}`}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>