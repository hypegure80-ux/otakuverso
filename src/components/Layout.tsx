import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context';
import { catalogData } from '../data';

// ─── HEADER ───────────────────────────────────────────────
export function Header() {
  // Extraer user para mostrar - usar user de useApp con cast
  const { user, profile, logout, setShowAuth, setAuthMode } = useApp();
  const displayName = profile?.username || user?.email?.split('@')[0] || 'Usuario';
  const displayAvatar = profile?.avatar || '👤';
  const displayEmail = user?.email || '';
  const [mobileMenu, setMobileMenu] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<typeof catalogData>([]);

  const navItems: { key: string; label: string; icon: string }[] = [
    { key: 'home', label: 'Inicio', icon: '🏠' },
    { key: 'news', label: 'Noticias', icon: '📰' },
    { key: 'recommendations', label: 'Recomendaciones', icon: '⭐' },
    { key: 'catalog', label: 'Manga/Webtoon', icon: '📚' },
    { key: 'manhua', label: 'Manhua/Donghua', icon: '🐉' },
    { key: 'korea', label: 'Corea', icon: '🇰🇷' },
    { key: 'mangakas', label: 'Mangakas', icon: '✍️' },
    { key: 'gallery', label: 'Galería', icon: '🎨' },
    { key: 'openings', label: 'OPs & EDs', icon: '🎵' },
    { key: 'community', label: 'Comunidad', icon: '💬' },
  ];

  useEffect(() => {
    if (showSearch && searchRef.current) searchRef.current.focus();
  }, [showSearch]);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const q = searchQuery.toLowerCase();
      const results = catalogData.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.genres.some(g => g.toLowerCase().includes(q)) ||
        item.type.includes(q)
      ).slice(0, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-dark-bg/95 border-dark-border' : 'bg-light-bg/95 border-light-border';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl ${bg} border-b`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => setPage('home')} className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">⛩️</span>
            <span className={`text-xl font-bold ${text}`}>
              <span className="text-gradient">Otaku</span>Verse
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => { setPage(item.key as any); setMobileMenu(false); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  page === item.key
                    ? 'bg-neon-red/10 text-neon-red'
                    : `${textMuted} hover:text-neon-red hover:bg-neon-red/5`
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 rounded-lg transition-colors ${textMuted} hover:text-neon-blue`}
            >
              🔍
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${textMuted} hover:text-yellow-400`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* User */}
            {user ? (
              <div className="relative group">
                <button className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'hover:bg-dark-surface' : 'hover:bg-light-surface'}`}>
                  <span className="text-xl">{displayAvatar}</span>
                  <span className={`text-sm font-medium hidden sm:block ${text}`}>{displayName}</span>
                </button>
                <div className={`absolute right-0 top-full mt-1 w-48 rounded-xl shadow-2xl border ${isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border'} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all`}>
                  <div className="p-3 border-b border-dark-border">
                    <p className={`text-sm font-medium ${text}`}>{displayName}</p>
                    <p className={`text-xs ${textMuted}`}>{displayEmail}</p>
                  </div>
                  <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-neon-red hover:bg-neon-red/10 rounded-b-xl">
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setShowAuth(true); setAuthMode('login'); }}
                className="px-4 py-2 rounded-lg bg-neon-red text-white text-sm font-medium hover:bg-neon-red/90 transition-colors"
              >
                Entrar
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className={`lg:hidden p-2 rounded-lg ${textMuted}`}
            >
              {mobileMenu ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="pb-4 animate-fade-up">
            <div className="relative">
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar anime, manga, webtoon, manhua..."
                className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-dark-surface border-dark-border text-white placeholder-gray-500' : 'bg-light-surface border-light-border text-gray-900 placeholder-gray-400'} focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue`}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className={`absolute right-3 top-3 ${textMuted}`}>✕</button>
              )}
            </div>
            {searchResults.length > 0 && (
              <div className={`mt-2 rounded-xl border ${isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border'} shadow-2xl overflow-hidden`}>
                {searchResults.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPage('catalog');
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left ${isDark ? 'hover:bg-dark-surface' : 'hover:bg-light-surface'} transition-colors`}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: item.image }}>
                      {item.type === 'anime' ? '🎬' : item.type === 'manga' ? '📖' : item.type === 'manhwa' ? '📱' : item.type === 'donghua' ? '🐉' : '📚'}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${text}`}>{item.title}</p>
                      <p className={`text-xs ${textMuted}`}>{item.type.toUpperCase()} • {item.genres.slice(0, 2).join(', ')} • ⭐ {item.rating}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className={`lg:hidden pb-4 border-t ${isDark ? 'border-dark-border' : 'border-light-border'} animate-fade-up`}>
            <nav className="grid grid-cols-2 gap-1 pt-3">
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => { setPage(item.key as any); setMobileMenu(false); }}
                  className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                    page === item.key
                      ? 'bg-neon-red/10 text-neon-red'
                      : `${textMuted} hover:text-neon-red`
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── AUTH MODAL ────────────────────────────────────────────
export function AuthModal() {
  const { showAuth, setShowAuth, authMode, setAuthMode, login, register, theme } = useApp();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isDark = theme === 'dark';

  if (!showAuth) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) return;
    if (authMode === 'login') await login(email, password);
    else await register(username, email, password);
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-4" onClick={() => setShowAuth(false)}>
      <div className={`w-full max-w-md rounded-2xl p-6 ${isDark ? 'bg-dark-card' : 'bg-light-card'} shadow-2xl`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {authMode === 'login' ? '🔑 Iniciar Sesión' : '✨ Registro'}
          </h2>
          <button onClick={() => setShowAuth(false)} className="text-gray-400 hover:text-gray-300">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Nombre de usuario</label>
            <input
              value={username} onChange={e => setUsername(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-gray-900'} focus:outline-none focus:border-neon-red`}
              placeholder="Tu nombre otaku"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-gray-900'} focus:outline-none focus:border-neon-red`}
              placeholder="tu@email.com"
            />
          </div>
          {authMode === 'register' && (
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Contraseña</label>
              <input
                type="password"
                className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-gray-900'} focus:outline-none focus:border-neon-red`}
                placeholder="••••••••"
              />
            </div>
          )}
          <button type="submit" className="w-full py-3 rounded-xl bg-neon-red text-white font-bold hover:bg-neon-red/90 transition-colors">
            {authMode === 'login' ? 'Entrar' : 'Crear Cuenta'}
          </button>
        </form>
        <p className={`text-center mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {authMode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            className="text-neon-red font-medium hover:underline"
          >
            {authMode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
export function Footer() {
  const { theme, setPage } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const isDark = theme === 'dark';

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className={`border-t ${isDark ? 'bg-dark-bg border-dark-border' : 'bg-gray-100 border-light-border'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⛩️</span>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-gradient">Otaku</span>Verse
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
              Tu portal definitivo de cultura geek asiática. Anime, manga, webtoon, manhua, donghua y mucho más.
            </p>
            <div className="flex gap-3">
              {['🐦', '📸', '💬', '📺'].map((icon, i) => (
                <button key={i} className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-dark-surface hover:bg-dark-border' : 'bg-light-surface hover:bg-light-border'} transition-colors`}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Secciones</h4>
            <div className="space-y-2">
              {[
                { k: 'news', l: 'Noticias' }, { k: 'catalog', l: 'Catálogo' },
                { k: 'recommendations', l: 'Recomendaciones' }, { k: 'gallery', l: 'Galería' },
                { k: 'openings', l: 'Openings & Endings' }, { k: 'community', l: 'Comunidad' },
              ].map(item => (
                <button key={item.k} onClick={() => setPage(item.k as any)} className={`block text-sm ${isDark ? 'text-gray-400 hover:text-neon-red' : 'text-gray-500 hover:text-neon-red'} transition-colors`}>
                  {item.l}
                </button>
              ))}
            </div>
          </div>

          {/* More Links */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contenido</h4>
            <div className="space-y-2">
              {[
                { k: 'manhua', l: 'Manhua & Donghua' }, { k: 'korea', l: 'Corea del Sur' },
                { k: 'mangakas', l: 'Mangakas' },
              ].map(item => (
                <button key={item.k} onClick={() => setPage(item.k as any)} className={`block text-sm ${isDark ? 'text-gray-400 hover:text-neon-red' : 'text-gray-500 hover:text-neon-red'} transition-colors`}>
                  {item.l}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>📧 Newsletter</h4>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
              Recibe las últimas noticias de anime y manga directamente en tu correo.
            </p>
            {subscribed ? (
              <div className="py-3 px-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium">
                ✅ ¡Suscrito exitosamente!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  value={email} onChange={e => setEmail(e.target.value)}
                  type="email" placeholder="tu@email.com"
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-gray-900'} focus:outline-none focus:border-neon-red`}
                />
                <button type="submit" className="px-4 py-2 rounded-lg bg-neon-red text-white text-sm font-medium hover:bg-neon-red/90 shrink-0">
                  OK
                </button>
              </form>
            )}
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${isDark ? 'border-dark-border' : 'border-light-border'} text-center`}>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            © 2025 OtakuVerse. Todos los derechos reservados. Hecho con ❤️ para la comunidad otaku.
          </p>
        </div>
      </div>
    </footer>
  );
}
