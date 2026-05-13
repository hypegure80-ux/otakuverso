import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { newsData } from '../data/content';
import NewsCard from '../components/NewsCard';
import CommentSection from '../components/CommentSection';
import { Calendar, User, Eye, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function News() {
  const { isDark } = useTheme();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', ...Array.from(new Set(newsData.map(n => n.category)))];

  if (id) {
    const news = newsData.find(n => n.id === id);
    if (!news) return <div className="max-w-7xl mx-auto px-4 py-20 text-center">Noticia no encontrada</div>;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
        <Link to="/noticias" className={`flex items-center gap-2 text-sm mb-6 transition-colors hover:text-primary ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          <ArrowLeft className="w-4 h-4" /> Volver a noticias
        </Link>
        <article>
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold mb-3 inline-block">
                {news.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-bold text-white">{news.title}</h1>
            </div>
          </div>
          <div className={`flex flex-wrap items-center gap-4 mb-8 text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {news.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {news.date}</span>
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {news.views.toLocaleString()} vistas</span>
            <button
              onClick={() => navigator.share?.({ title: news.title, text: news.excerpt, url: window.location.href }) || navigator.clipboard.writeText(window.location.href)}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Share2 className="w-4 h-4" /> Compartir
            </button>
          </div>
          <div className={`prose max-w-none mb-8 ${isDark ? 'prose-invert' : ''}`}>
            <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
              {news.content}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-12">
            {news.tags.map(tag => (
              <span key={tag} className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${isDark ? 'bg-dark-surface text-text-muted-dark' : 'bg-light-surface text-text-muted-light'}`}>
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
          <CommentSection articleId={news.id} />
        </article>
      </div>
    );
  }

  const filteredNews = selectedCategory === 'Todas'
    ? newsData
    : newsData.filter(n => n.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>Noticias Geek</h1>
        <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          Las últimas novedades del mundo del anime, manga y cultura asiática
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-primary text-white'
                : isDark ? 'bg-dark-card text-text-muted-dark hover:bg-dark-surface' : 'bg-white text-text-muted-light hover:bg-light-surface border border-light-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((news, i) => (
          <NewsCard key={news.id} news={news} variant="featured" index={i} />
        ))}
      </div>
    </div>
  );
}
