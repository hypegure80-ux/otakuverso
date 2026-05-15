import { useState, useEffect } from 'react';
import { useApp } from '../context';
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