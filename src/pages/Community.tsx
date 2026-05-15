import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, ThumbsUp, Eye, TrendingUp, User, Clock, Send } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  views: number;
  replies: number;
  category: string;
}

const forumPosts: ForumPost[] = [
  {
    id: 'p1',
    title: '¿Qué opinan del final de Jujutsu Kaisen?',
    author: 'OtakuMaster',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
    content: 'Después de 271 capítulos, la historia de Yuji y compañía ha llegado a su fin. ¿Creen que fue un buen cierre?',
    date: '2025-06-15',
    likes: 234,
    views: 3400,
    replies: 89,
    category: 'Manga'
  },
  {
    id: 'p2',
    title: 'Top 10 animes de verano 2025',
    author: 'AnimeFan2025',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    content: 'He visto todos los estrenos de la temporada y este es mi ranking personal. ¿Coinciden?',
    date: '2025-06-14',
    likes: 156,
    views: 2100,
    replies: 45,
    category: 'Anime'
  },
  {
    id: 'p3',
    title: 'Recomendaciones de manhwa de romance',
    author: 'WebtoonLover',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80',
    content: 'Busco manhwas de romance que no sean cliché. ¿Alguna recomendación?',
    date: '2025-06-13',
    likes: 98,
    views: 1200,
    replies: 34,
    category: 'Manhwa'
  },
  {
    id: 'p4',
    title: 'El donghua está mejorando increíblemente',
    author: 'ChinaAnime',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    content: 'La calidad de animación 3D en donghuas como Swallowed Star es impresionante.',
    date: '2025-06-12',
    likes: 187,
    views: 2800,
    replies: 56,
    category: 'Donghua'
  },
  {
    id: 'p5',
    title: 'Predicciones para la próxima temporada de Solo Leveling',
    author: 'ShadowMonarch',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    content: 'Basándome en el webtoon, creo que veremos la batalla contra los monarcas en la S3.',
    date: '2025-06-11',
    likes: 312,
    views: 4500,
    replies: 120,
    category: 'Anime'
  },
];

export default function Community() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [posts, setPosts] = useState(forumPosts);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const categories = ['Todas', 'Anime', 'Manga', 'Manhwa', 'Webtoon', 'Donghua', 'General'];

  const filtered = selectedCategory === 'Todas'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  const handleLike = (postId: string) => {
    if (likedPosts.has(postId)) return;
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    setLikedPosts(prev => new Set(prev).add(postId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim() || !user) return;

    const post: ForumPost = {
      id: 'p' + Date.now(),
      title: newPost.title,
      author: user.name,
      avatar: user.avatar,
      content: newPost.content,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      views: 0,
      replies: 0,
      category: 'General',
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>Comunidad</h1>
        <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          Únete a las discusiones, comparte opiniones y conecta con otros fans
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* New Post */}
          {user && (
            <div className={`rounded-2xl border p-5 mb-8 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
              <h3 className={`font-bold text-sm mb-4 ${isDark ? 'text-white' : 'text-text-light'}`}>Crear nueva discusión</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(p => ({ ...p, title: e.target.value }))}
                  placeholder="Título de la discusión"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${isDark ? 'bg-dark-surface border-dark-border text-white placeholder-gray-500' : 'bg-light-surface border-light-border text-text-light placeholder-gray-400'}`}
                />
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(p => ({ ...p, content: e.target.value }))}
                  placeholder="Escribe tu mensaje..."
                  rows={3}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none ${isDark ? 'bg-dark-surface border-dark-border text-white placeholder-gray-500' : 'bg-light-surface border-light-border text-text-light placeholder-gray-400'}`}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!newPost.title.trim() || !newPost.content.trim()}
                    className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Publicar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
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

          {/* Posts */}
          <div className="space-y-4">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border p-5 transition-all hover:shadow-lg ${
                  isDark ? 'bg-dark-card border-dark-border hover:border-primary/30' : 'bg-white border-light-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1">
                    <h3 className={`font-semibold text-sm mb-1 ${isDark ? 'text-white' : 'text-text-light'}`}>{post.title}</h3>
                    <div className={`flex items-center gap-3 text-xs ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.date}</span>
                      <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-medium">{post.category}</span>
                    </div>
                  </div>
                </div>
                <p className={`text-sm mb-4 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                  {post.content}
                </p>
                <div className={`flex items-center gap-4 text-xs ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 transition-colors ${likedPosts.has(post.id) ? 'text-primary' : 'hover:text-primary'}`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${likedPosts.has(post.id) ? 'fill-primary' : ''}`} />
                    {post.likes}
                  </button>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {post.replies}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className={`rounded-2xl border p-5 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Estadísticas</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Discusiones', value: posts.length },
                { label: 'Miembros activos', value: '1,240' },
                { label: 'Comentarios hoy', value: '89' },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>{stat.label}</span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl border p-5 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-text-light'}`}>Reglas de la comunidad</h3>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
              <li>1. Sé respetuoso con todos los miembros</li>
              <li>2. No spoilers sin etiqueta</li>
              <li>3. Comparte fuentes de noticias</li>
              <li>4. No contenido NSFW</li>
              <li>5. Usa las categorías correctas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
