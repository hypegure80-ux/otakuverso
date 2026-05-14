import { useState } from 'react';
import { useApp } from '../context';
import { forumData, catalogData } from '../data';

export default function Community() {
  const { theme, user, setShowAuth, getUserListStatus } = useApp();
  const isDark = theme === 'dark';
  const [tab, setTab] = useState<'forum' | 'profile'>('forum');
  const [filterCat, setFilterCat] = useState('Todos');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border';
  const surfaceBg = isDark ? 'bg-dark-surface' : 'bg-light-surface';

  const categories = ['Todos', ...Array.from(new Set(forumData.map(f => f.category)))];
  const filtered = filterCat === 'Todos' ? forumData : forumData.filter(f => f.category === filterCat);

  const userList = user ? catalogData.filter(i => getUserListStatus(i.id)) : [];
  const wantList = userList.filter(i => getUserListStatus(i.id) === 'want');
  const watchingList = userList.filter(i => getUserListStatus(i.id) === 'watching');
  const completedList = userList.filter(i => getUserListStatus(i.id) === 'completed');

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold ${text}`}>💬 Comunidad</h1>
        <p className={`text-sm ${textMuted} mt-1`}>Foro, listas personales y perfiles de usuario</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('forum')}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
            tab === 'forum' ? 'bg-neon-red text-white' : `${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`
          }`}
        >
          💬 Foro
        </button>
        <button
          onClick={() => { if (!user) { setShowAuth(true); return; } setTab('profile'); }}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
            tab === 'profile' ? 'bg-neon-blue text-white' : `${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`
          }`}
        >
          👤 Mi Perfil
        </button>
      </div>

      {tab === 'forum' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Forum Posts */}
          <div className="lg:col-span-2 space-y-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCat(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    filterCat === cat ? 'bg-neon-red text-white' : `${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* New Post Button */}
            <button
              onClick={() => { if (!user) { setShowAuth(true); return; } setShowNewPost(!showNewPost); }}
              className="w-full py-3 rounded-xl border-2 border-dashed border-neon-red/30 text-neon-red text-sm font-medium hover:bg-neon-red/5 transition-colors"
            >
              ✏️ Crear nueva publicación
            </button>

            {/* New Post Form */}
            {showNewPost && (
              <div className={`rounded-xl border p-4 ${cardBg} animate-fade-up`}>
                <input
                  value={newPostTitle}
                  onChange={e => setNewPostTitle(e.target.value)}
                  placeholder="Título de tu publicación"
                  className={`w-full px-4 py-3 rounded-xl border mb-3 text-sm ${isDark ? 'bg-dark-surface border-dark-border text-white placeholder-gray-500' : 'bg-light-surface border-light-border text-gray-900 placeholder-gray-400'} focus:outline-none focus:border-neon-red`}
                />
                <textarea
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  placeholder="Escribe tu publicación..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border mb-3 text-sm ${isDark ? 'bg-dark-surface border-dark-border text-white placeholder-gray-500' : 'bg-light-surface border-light-border text-gray-900 placeholder-gray-400'} focus:outline-none focus:border-neon-red resize-none`}
                />
                <div className="flex gap-2">
                  <button className="px-6 py-2 rounded-lg bg-neon-red text-white text-sm font-medium">Publicar</button>
                  <button onClick={() => setShowNewPost(false)} className={`px-6 py-2 rounded-lg ${surfaceBg} text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Cancelar</button>
                </div>
              </div>
            )}

            {/* Posts */}
            {filtered.map((post, i) => (
              <div
                key={post.id}
                className={`rounded-xl border p-5 ${cardBg} card-hover animate-fade-up`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {post.pinned && (
                  <span className="badge bg-neon-red text-white mb-2 inline-block">📌 Fijado</span>
                )}
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${surfaceBg} shrink-0`}>
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-bold ${text} mb-1`}>{post.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium ${text}`}>{post.author}</span>
                      <span className={`text-xs ${textMuted}`}>• {post.date}</span>
                      <span className={`badge ${isDark ? 'bg-dark-surface text-gray-300' : 'bg-light-surface text-gray-600'}`}>{post.category}</span>
                    </div>
                    <p className={`text-sm ${textMuted} line-clamp-2 mb-3`}>{post.content}</p>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs ${textMuted}`}>💬 {post.replies} respuestas</span>
                      <span className={`text-xs ${textMuted}`}>👁️ {post.views.toLocaleString()}</span>
                      <span className={`text-xs ${textMuted}`}>❤️ {post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className={`rounded-xl border p-5 ${cardBg}`}>
              <h3 className={`text-lg font-bold mb-4 ${text}`}>📊 Estadísticas</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Publicaciones', value: '1,247', emoji: '📝' },
                  { label: 'Usuarios', value: '8,532', emoji: '👥' },
                  { label: 'Comentarios', value: '24,891', emoji: '💬' },
                  { label: 'En línea', value: '342', emoji: '🟢' },
                ].map((stat, i) => (
                  <div key={i} className={`p-3 rounded-lg text-center ${surfaceBg}`}>
                    <span className="text-xl block mb-1">{stat.emoji}</span>
                    <p className={`text-lg font-bold ${text}`}>{stat.value}</p>
                    <p className={`text-[10px] ${textMuted}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className={`rounded-xl border p-5 ${cardBg}`}>
              <h3 className={`text-lg font-bold mb-4 ${text}`}>🏆 Top Contribuidores</h3>
              <div className="space-y-3">
                {[
                  { name: 'OtakuMaster', avatar: '🎭', posts: 234, rank: 1 },
                  { name: 'MangaFan99', avatar: '📚', posts: 189, rank: 2 },
                  { name: 'AnimeLover', avatar: '🌸', posts: 167, rank: 3 },
                  { name: 'WebtoonAddict', avatar: '📱', posts: 145, rank: 4 },
                  { name: 'DonghuaFan', avatar: '🐉', posts: 123, rank: 5 },
                ].map((user, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`text-sm font-bold w-5 ${i < 3 ? 'text-neon-red' : textMuted}`}>{user.rank}</span>
                    <span className="text-xl">{user.avatar}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${text}`}>{user.name}</p>
                      <p className={`text-[10px] ${textMuted}`}>{user.posts} publicaciones</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="rounded-xl p-5 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border border-neon-blue/20">
              <h3 className={`text-lg font-bold mb-2 ${text}`}>📜 Reglas del Foro</h3>
              <ul className={`text-xs ${textMuted} space-y-1`}>
                <li>✅ Sé respetuoso con todos</li>
                <li>✅ Usa spoiler tags cuando sea necesario</li>
                <li>✅ No spam ni autopromoción</li>
                <li>✅ Mantén las discusiones relevantes</li>
                <li>✅ Reporta contenido inapropiado</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Profile Tab */
        <div>
          {user ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className={`rounded-xl border p-6 ${cardBg} text-center`}>
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl mb-4 ${surfaceBg}`}>
                  {user.avatar}
                </div>
                <h2 className={`text-xl font-bold ${text}`}>{user.name}</h2>
                <p className={`text-sm ${textMuted} mb-2`}>{user.email}</p>
                <p className={`text-xs ${textMuted} mb-4`}>Miembro desde {user.joined}</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className={`p-3 rounded-lg ${surfaceBg}`}>
                    <p className={`text-lg font-bold ${text}`}>{wantList.length}</p>
                    <p className={`text-[10px] ${textMuted}`}>Pendiente</p>
                  </div>
                  <div className={`p-3 rounded-lg ${surfaceBg}`}>
                    <p className={`text-lg font-bold ${text}`}>{watchingList.length}</p>
                    <p className={`text-[10px] ${textMuted}`}>Viendo</p>
                  </div>
                  <div className={`p-3 rounded-lg ${surfaceBg}`}>
                    <p className={`text-lg font-bold ${text}`}>{completedList.length}</p>
                    <p className={`text-[10px] ${textMuted}`}>Completado</p>
                  </div>
                </div>
              </div>

              {/* User Lists */}
              <div className="lg:col-span-2 space-y-6">
                {[
                  { title: '📋 Quiero Ver', items: wantList, color: 'text-neon-red' },
                  { title: '▶️ Viendo', items: watchingList, color: 'text-neon-blue' },
                  { title: '✅ Completado', items: completedList, color: 'text-green-400' },
                ].map((section) => (
                  <div key={section.title} className={`rounded-xl border p-5 ${cardBg}`}>
                    <h3 className={`text-lg font-bold mb-3 ${section.color}`}>{section.title} ({section.items.length})</h3>
                    {section.items.length > 0 ? (
                      <div className="space-y-2">
                        {section.items.map(item => (
                          <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg ${surfaceBg}`}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0" style={{ background: item.image }}>
                              {item.type === 'anime' ? '🎬' : '📖'}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-bold ${text}`}>{item.title}</p>
                              <p className={`text-xs ${textMuted}`}>{item.type.toUpperCase()} • ⭐ {item.rating}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className={`text-sm ${textMuted}`}>No hay elementos en esta lista. ¡Explora el catálogo y agrega títulos!</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4">🔒</span>
              <h2 className={`text-xl font-bold mb-2 ${text}`}>Inicia sesión para ver tu perfil</h2>
              <p className={`text-sm ${textMuted} mb-4`}>Crea tu lista personal, comenta y participa en la comunidad</p>
              <button onClick={() => setShowAuth(true)} className="px-6 py-3 rounded-xl bg-neon-red text-white font-medium">
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
