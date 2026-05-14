<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useApp } from '../context';
import { newsData, catalogData, trendingTopics } from '../data';

export default function Home() {
  const { theme, setPage, setNewsDetailId } = useApp();
  const isDark = theme === 'dark';
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredNews = newsData.filter(n => n.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredNews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredNews.length]);

  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border';
  const surfaceBg = isDark ? 'bg-dark-surface' : 'bg-light-surface';

  const newReleases = catalogData.filter(c => c.year >= 2022).slice(0, 6);
  const topRated = [...catalogData].sort((a, b) => b.rating - a.rating).slice(0, 6);

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

  return (
    <div className="space-y-8">
      {/* Hero Carousel */}
      <section className="relative rounded-2xl overflow-hidden" style={{ minHeight: '420px' }}>
        <div className="absolute inset-0">
          <img
            src="/images/hero-banner.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-dark-bg via-dark-bg/80 to-transparent' : 'bg-gradient-to-r from-light-bg via-light-bg/80 to-transparent'}`} />
        </div>
        <div className="relative z-10 p-6 md:p-10 flex flex-col justify-end" style={{ minHeight: '420px' }}>
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge bg-neon-red text-white">🔥 Destacado</span>
              <span className={`badge ${isDark ? 'bg-dark-surface text-gray-300' : 'bg-light-surface text-gray-600'}`}>{featuredNews[currentSlide]?.category}</span>
            </div>
            <h1 className={`text-2xl md:text-4xl font-bold mb-3 leading-tight ${text}`}>
              {featuredNews[currentSlide]?.title}
            </h1>
            <p className={`text-sm md:text-base mb-4 ${textMuted} line-clamp-2`}>
              {featuredNews[currentSlide]?.summary}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setPage('news'); setNewsDetailId(featuredNews[currentSlide]?.id); }}
                className="px-6 py-2.5 rounded-xl bg-neon-red text-white font-medium hover:bg-neon-red/90 transition-colors text-sm"
              >
                Leer más →
              </button>
              <span className={`text-xs ${textMuted}`}>{featuredNews[currentSlide]?.date}</span>
            </div>
          </div>
          {/* Carousel dots */}
          <div className="flex gap-2 mt-6">
            {featuredNews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-neon-red' : `w-4 ${isDark ? 'bg-white/30' : 'bg-gray-400/30'}`}`}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Latest News */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${text}`}>📰 Últimas Noticias</h2>
              <button onClick={() => setPage('news')} className="text-sm text-neon-red hover:underline">Ver todas →</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newsData.slice(0, 4).map((news, i) => (
                <button
                  key={news.id}
                  onClick={() => { setPage('news'); setNewsDetailId(news.id); }}
                  className={`text-left rounded-xl border overflow-hidden card-hover ${cardBg} animate-fade-up`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="h-32 flex items-center justify-center text-4xl" style={{ background: news.image }}>
                    {news.category === 'Anime' ? '🎬' : news.category === 'Manga' ? '📖' : news.category === 'Donghua' ? '🐉' : news.category === 'Webtoon' ? '📱' : '📰'}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge bg-neon-red/10 text-neon-red">{news.category}</span>
                      <span className={`text-xs ${textMuted}`}>{news.date}</span>
                    </div>
                    <h3 className={`text-sm font-bold mb-1 line-clamp-2 ${text}`}>{news.title}</h3>
                    <p className={`text-xs ${textMuted} line-clamp-2`}>{news.summary}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* New Releases */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${text}`}>🆕 Nuevos Lanzamientos</h2>
              <button onClick={() => setPage('catalog')} className="text-sm text-neon-red hover:underline">Ver catálogo →</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {newReleases.map((item, i) => (
                <div
                  key={item.id}
                  className={`rounded-xl border overflow-hidden card-hover ${cardBg} animate-fade-up`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="h-36 flex items-center justify-center text-5xl relative" style={{ background: item.image }}>
                    {typeIcon(item.type)}
                    <span className="absolute top-2 right-2 badge bg-black/60 text-white">{item.type.toUpperCase()}</span>
                  </div>
                  <div className="p-3">
                    <h3 className={`text-sm font-bold mb-1 line-clamp-1 ${text}`}>{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${textMuted}`}>{item.genres[0]}</span>
                      <span className="text-xs text-yellow-400">⭐ {item.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Rated */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${text}`}>🏆 Mejor Valorados</h2>
              <button onClick={() => setPage('recommendations')} className="text-sm text-neon-red hover:underline">Recomendaciones →</button>
            </div>
            <div className="space-y-3">
              {topRated.map((item, i) => (
                <div key={item.id} className={`flex items-center gap-4 p-3 rounded-xl border ${cardBg} card-hover`}>
                  <span className={`text-2xl font-black ${i < 3 ? 'text-neon-red' : textMuted} w-8 text-center`}>
                    {i + 1}
                  </span>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0" style={{ background: item.image }}>
                    {typeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-bold ${text} truncate`}>{item.title}</h3>
                    <p className={`text-xs ${textMuted}`}>{item.type.toUpperCase()} • {item.genres.slice(0, 2).join(', ')}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-yellow-400">⭐ {item.rating}</div>
                    <div className={`text-xs ${textMuted}`}>{item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Widget */}
          <div className={`rounded-xl border p-5 ${cardBg}`}>
            <h3 className={`text-lg font-bold mb-4 ${text}`}>🔥 Tendencias</h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${i < 3 ? 'text-neon-red' : textMuted} w-5`}>{i + 1}</span>
                    <span className={`text-sm font-medium ${text}`}>{topic.tag}</span>
                  </div>
                  <span className={`text-xs ${textMuted}`}>{topic.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={`rounded-xl border p-5 ${cardBg}`}>
            <h3 className={`text-lg font-bold mb-4 ${text}`}>⚡ Acceso Rápido</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: '🇯🇵', label: 'Japón', page: 'mangakas' as const },
                { icon: '🇰🇷', label: 'Corea', page: 'korea' as const },
                { icon: '🇨🇳', label: 'China', page: 'manhua' as const },
                { icon: '🎬', label: 'Anime', page: 'catalog' as const },
                { icon: '📖', label: 'Manga', page: 'catalog' as const },
                { icon: '🎵', label: 'OPs/EDs', page: 'openings' as const },
                { icon: '🎨', label: 'Fanart', page: 'gallery' as const },
                { icon: '💬', label: 'Foro', page: 'community' as const },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setPage(item.page)}
                  className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium ${surfaceBg} ${text} hover:bg-neon-red/10 hover:text-neon-red transition-colors`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Japan/Korea Hero */}
          <div className="rounded-xl overflow-hidden relative" style={{ height: '200px' }}>
            <img src="/images/hero-korea.jpg" alt="Korea" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
              <div>
                <span className="badge bg-neon-blue text-white mb-2">🇰🇷 Corea del Sur</span>
                <p className="text-white text-sm font-bold">Explora manhwa, webtoon y cultura pop coreana</p>
                <button onClick={() => setPage('korea')} className="text-xs text-neon-blue mt-1 hover:underline">Explorar →</button>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="rounded-xl p-5 bg-gradient-to-br from-neon-red/10 to-neon-purple/10 border border-neon-red/20">
            <h3 className={`text-lg font-bold mb-2 ${text}`}>📧 Newsletter</h3>
            <p className={`text-xs ${textMuted} mb-3`}>Recibe las últimas noticias directamente en tu correo</p>
            <div className="flex gap-2">
              <input
                placeholder="tu@email.com"
                className={`flex-1 px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-gray-900'} focus:outline-none focus:border-neon-red`}
              />
              <button className="px-4 py-2 rounded-lg bg-neon-red text-white text-sm font-medium shrink-0">OK</button>
=======
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { newsData, getTrending, getNewReleases, allContent } from '../data/content';
import HeroCarousel from '../components/HeroCarousel';
import TrendingWidget from '../components/TrendingWidget';
import Newsletter from '../components/Newsletter';
import NewsCard from '../components/NewsCard';
import ContentCard from '../components/ContentCard';
import { ArrowRight, Flame, Sparkles, Star, Play, BookOpen, Tv, Globe } from 'lucide-react';

export default function Home() {
  const { isDark } = useTheme();
  const latestNews = newsData.slice(0, 6);
  const trending = getTrending().slice(0, 6);
  const newReleases = getNewReleases().slice(0, 6);

  const quickLinks = [
    { label: 'Anime', icon: Play, path: '/recomendaciones?tipo=anime', color: 'bg-blue-500/20 text-blue-400' },
    { label: 'Manga', icon: BookOpen, path: '/recomendaciones?tipo=manga', color: 'bg-green-500/20 text-green-400' },
    { label: 'Manhwa', icon: Star, path: '/recomendaciones?tipo=manhwa', color: 'bg-yellow-500/20 text-yellow-400' },
    { label: 'Donghua', icon: Tv, path: '/recomendaciones?tipo=donghua', color: 'bg-cyan-500/20 text-cyan-400' },
    { label: 'Webtoon', icon: Globe, path: '/recomendaciones?tipo=webtoon', color: 'bg-purple-500/20 text-purple-400' },
    { label: 'Manhua', icon: BookOpen, path: '/recomendaciones?tipo=manhua', color: 'bg-red-500/20 text-red-400' },
  ];

  return (
    <div className="animate-fade-in">
      <HeroCarousel />

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={link.path}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all hover:shadow-lg ${
                  isDark ? 'bg-dark-card border-dark-border hover:border-primary/30' : 'bg-white border-light-border hover:border-primary/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${link.color}`}>
                  <link.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Trending Content */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-primary" />
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Tendencias</h2>
                </div>
                <Link to="/recomendaciones" className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors">
                  Ver todo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {trending.map((item, i) => (
                  <ContentCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </section>

            {/* New Releases */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Nuevos lanzamientos</h2>
                </div>
                <Link to="/recomendaciones?filter=new" className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors">
                  Ver todo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {newReleases.map((item, i) => (
                  <ContentCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </section>

            {/* Latest News */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Últimas noticias</h2>
                </div>
                <Link to="/noticias" className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors">
                  Ver todo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {latestNews.map((news, i) => (
                  <NewsCard key={news.id} news={news} index={i} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <TrendingWidget />
            <Newsletter />
            
            {/* Popular Tags */}
            <div className={`rounded-2xl border p-5 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
              <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-text-light'}`}>Etiquetas populares</h3>
              <div className="flex flex-wrap gap-2">
                {['Shonen', 'Isekai', 'Romance', 'Acción', 'Fantasía', 'Drama', 'Comedia', 'Terror', 'BL', 'Sci-Fi'].map(tag => (
                  <Link
                    key={tag}
                    to={`/recomendaciones?genero=${tag}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isDark ? 'bg-dark-surface text-text-muted-dark hover:bg-primary/20 hover:text-primary' : 'bg-light-surface text-text-muted-light hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
