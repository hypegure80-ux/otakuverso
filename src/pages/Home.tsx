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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
