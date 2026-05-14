<<<<<<< HEAD
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
=======
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { manhwaData, webtoonData } from '../data/content';
import ContentCard from '../components/ContentCard';
import { Globe, Star, Music, Tv } from 'lucide-react';

export default function Korea() {
  const { isDark } = useTheme();

  const kpopArtists = [
    { name: 'BTS', genre: 'K-pop', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80' },
    { name: 'NewJeans', genre: 'K-pop', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80' },
    { name: 'Stray Kids', genre: 'K-pop', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&q=80' },
    { name: 'BLACKPINK', genre: 'K-pop', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>Corea del Sur</h1>
        <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          Manhwa, webtoons coreanos, K-pop y cultura pop surcoreana
        </p>
      </div>

      {/* K-pop Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Music className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>K-pop & Cultura</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {kpopArtists.map((artist, i) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}
            >
              <div className="aspect-square overflow-hidden">
                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-text-light'}`}>{artist.name}</h3>
                <p className="text-xs text-gray-500">{artist.genre}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className={`rounded-2xl border p-6 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
          <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-text-light'}`}>Colaboraciones K-pop × Anime</h3>
          <ul className={`space-y-3 text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
            <li className="flex items-start gap-2">
              <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>NewJeans canta el opening de una serie original de Netflix producida en Japón</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Stray Kids participa en el soundtrack de Solo Leveling Season 2</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>BTS colabora con un estudio de animación japonés para un proyecto original</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>IVE interpreta el ending de Tower of God Season 2</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Manhwa */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Manhwa</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {manhwaData.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Webtoon Coreano */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Tv className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Webtoon Coreano</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {webtoonData.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
    </div>
  );
}
