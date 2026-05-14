import { useState } from 'react';
<<<<<<< HEAD
import { useApp } from '../context';
//import { newsData } from '../data';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { NewsItem } from '../lib/supabase';

export default function News() {
  const { theme, newsDetailId, setNewsDetailId } = useApp();
  const isDark = theme === 'dark';
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', ...Array.from(new Set(newsData.map(n => n.category)))];

  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border';

  const filtered = filter === 'Todos' ? newsData : newsData.filter(n => n.category === filter);

  // Detail view
  if (newsDetailId) {
    const article = newsData.find(n => n.id === newsDetailId);
    if (!article) return null;
    return (
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setNewsDetailId(null)} className={`mb-4 text-sm ${textMuted} hover:text-neon-red`}>
          ← Volver a noticias
        </button>
        <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>
          <div className="h-48 md:h-64 flex items-center justify-center text-6xl" style={{ background: article.image }}>
            {article.category === 'Anime' ? '🎬' : article.category === 'Manga' ? '📖' : article.category === 'Donghua' ? '🐉' : '📰'}
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge bg-neon-red text-white">{article.category}</span>
              {article.tags.map(tag => (
                <span key={tag} className={`badge ${isDark ? 'bg-dark-surface text-gray-300' : 'bg-light-surface text-gray-600'}`}>
                  {tag}
                </span>
              ))}
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${text}`}>{article.title}</h1>
            <p className={`text-sm ${textMuted} mb-6`}>📅 {article.date}</p>
            <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{article.content}</p>
            <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{article.summary} Esta noticia ha generado gran expectación entre la comunidad de fans alrededor del mundo. Las redes sociales se han llenado de reacciones y teorías sobre lo que esto significa para el futuro de la serie y la industria en general.</p>

            {/* Share buttons */}
            <div className="flex items-center gap-3 mb-8">
              <span className={`text-sm font-medium ${text}`}>Compartir:</span>
              {[
                { icon: '🐦', label: 'Twitter', color: 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' },
                { icon: '📘', label: 'Facebook', color: 'bg-blue-600/10 text-blue-500 hover:bg-blue-600/20' },
                { icon: '📱', label: 'WhatsApp', color: 'bg-green-500/10 text-green-400 hover:bg-green-500/20' },
                { icon: '🔗', label: 'Copiar', color: `${isDark ? 'bg-dark-surface text-gray-300 hover:bg-dark-border' : 'bg-light-surface text-gray-600 hover:bg-light-border'}` },
              ].map((btn, i) => (
                <button key={i} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${btn.color}`}>
                  {btn.icon} {btn.label}
                </button>
              ))}
            </div>

            {/* Comments */}
            <div className={`border-t pt-6 ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
              <h3 className={`text-lg font-bold mb-4 ${text}`}>💬 Comentarios ({article.comments.length})</h3>
              {article.comments.length > 0 ? (
                <div className="space-y-4">
                  {article.comments.map(comment => (
                    <div key={comment.id} className={`p-4 rounded-xl ${isDark ? 'bg-dark-surface' : 'bg-light-surface'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{comment.avatar}</span>
                        <span className={`text-sm font-bold ${text}`}>{comment.user}</span>
                        <span className={`text-xs ${textMuted}`}>{comment.date}</span>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{comment.text}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button className={`text-xs ${textMuted} hover:text-neon-red`}>❤️ {comment.likes}</button>
                        <button className={`text-xs ${textMuted} hover:text-neon-blue`}>Responder</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-sm ${textMuted}`}>No hay comentarios aún. ¡Sé el primero en comentar!</p>
              )}
              <div className="mt-4">
                <textarea
                  placeholder="Escribe un comentario..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm ${isDark ? 'bg-dark-surface border-dark-border text-white placeholder-gray-500' : 'bg-light-surface border-light-border text-gray-900 placeholder-gray-400'} focus:outline-none focus:border-neon-red resize-none`}
                  rows={3}
                />
                <button className="mt-2 px-6 py-2 rounded-lg bg-neon-red text-white text-sm font-medium">Publicar</button>
              </div>
            </div>
          </div>
        </div>
=======
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
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
      </div>
    );
  }

<<<<<<< HEAD
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${text}`}>📰 Noticias Geek</h1>
          <p className={`text-sm ${textMuted} mt-1`}>Las últimas novedades del mundo anime, manga y cultura asiática</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-neon-red text-white'
                : `${isDark ? 'bg-dark-surface text-gray-300 hover:bg-dark-border' : 'bg-light-surface text-gray-600 hover:bg-light-border'}`
=======
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
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

<<<<<<< HEAD
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((news, i) => (
          <button
            key={news.id}
            onClick={() => setNewsDetailId(news.id)}
            className={`text-left rounded-xl border overflow-hidden card-hover ${cardBg} animate-fade-up`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="h-40 flex items-center justify-center text-5xl relative" style={{ background: news.image }}>
              {news.featured && <span className="absolute top-3 left-3 badge bg-neon-red text-white">🔥 Destacado</span>}
              {news.category === 'Anime' ? '🎬' : news.category === 'Manga' ? '📖' : news.category === 'Donghua' ? '🐉' : news.category === 'Webtoon' ? '📱' : news.category === 'Evento' ? '🎪' : '📰'}
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-neon-red/10 text-neon-red">{news.category}</span>
                <span className={`text-xs ${textMuted}`}>{news.date}</span>
              </div>
              <h3 className={`text-base font-bold mb-2 line-clamp-2 ${text}`}>{news.title}</h3>
              <p className={`text-sm ${textMuted} line-clamp-2`}>{news.summary}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className={`text-xs ${textMuted}`}>💬 {news.comments.length}</span>
                {news.tags.slice(0, 2).map(tag => (
                  <span key={tag} className={`text-xs ${textMuted}`}>#{tag}</span>
                ))}
              </div>
            </div>
          </button>
=======
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((news, i) => (
          <NewsCard key={news.id} news={news} variant="featured" index={i} />
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
        ))}
      </div>
    </div>
  );
}
