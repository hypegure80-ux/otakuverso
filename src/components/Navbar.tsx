import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  Search, Menu, X, Sun, Moon, User, LogOut, Heart,
  BookOpen, Tv, Music, Image, Newspaper, Users, Globe, ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', path: '/', icon: null },
    { label: 'Noticias', path: '/noticias', icon: Newspaper },
    { label: 'Recomendaciones', path: '/recomendaciones', icon: Heart },
    { label: 'Galería', path: '/galeria', icon: Image },
    { label: 'OP/ED', path: '/openings', icon: Music },
    { label: 'Manga/Webtoon', path: '/manga', icon: BookOpen },
    { label: 'Manhua/Donghua', path: '/manhua', icon: Tv },
    { label: 'Corea', path: '/corea', icon: Globe },
    { label: 'Japón', path: '/japon', icon: Globe },
    { label: 'Comunidad', path: '/comunidad', icon: Users },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/buscar?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDark ? 'bg-dark-bg/80 border-dark-border' : 'bg-white/80 border-light-border'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className={`font-bold text-xl hidden sm:block ${isDark ? 'text-white' : 'text-text-light'}`}>
                Otaku<span className="text-primary">Verse</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 6).map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : isDark ? 'text-text-muted-dark hover:text-white hover:bg-dark-surface' : 'text-text-muted-light hover:text-text-light hover:bg-light-surface'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    isDark ? 'text-text-muted-dark hover:text-white hover:bg-dark-surface' : 'text-text-muted-light hover:text-text-light hover:bg-light-surface'
                  }`}
                >
                  Más <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className={`absolute top-full right-0 mt-2 w-48 rounded-xl border shadow-xl overflow-hidden ${
                        isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
                      }`}
                    >
                      {navLinks.slice(6).map(link => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setDropdownOpen(false)}
                          className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                            location.pathname === link.path
                              ? 'text-primary bg-primary/5'
                              : isDark ? 'text-text-muted-dark hover:text-white hover:bg-dark-surface' : 'text-text-muted-light hover:text-text-light hover:bg-light-surface'
                          }`}
                        >
                          {link.icon && <link.icon className="w-4 h-4" />}
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-surface text-text-muted-dark' : 'hover:bg-light-surface text-text-muted-light'}`}
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-surface text-text-muted-dark' : 'hover:bg-light-surface text-text-muted-light'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              {user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/perfil" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors">
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-text-light'}`}>{user.name}</span>
                  </Link>
                  <button onClick={logout} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-surface text-text-muted-dark' : 'hover:bg-light-surface text-text-muted-light'}`}>
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-white hover:bg-dark-surface' : 'text-text-light hover:bg-light-surface'}`}>
                    Iniciar sesión
                  </Link>
                  <Link to="/registro" className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors">
                    Registrarse
                  </Link>
                </div>
              )}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-surface text-text-muted-dark' : 'hover:bg-light-surface text-text-muted-light'}`}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`border-t overflow-hidden ${isDark ? 'border-dark-border bg-dark-surface' : 'border-light-border bg-light-surface'}`}
            >
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto px-4 py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar anime, manga, noticias..."
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      isDark ? 'bg-dark-card border-dark-border text-white placeholder-gray-500' : 'bg-white border-light-border text-text-light placeholder-gray-400'
                    }`}
                    autoFocus
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 right-0 z-50 w-80 shadow-2xl lg:hidden ${isDark ? 'bg-dark-card border-l border-dark-border' : 'bg-white border-l border-light-border'}`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-text-light'}`}>Menú</span>
                <button onClick={() => setMobileOpen(false)} className={`p-2 rounded-lg ${isDark ? 'hover:bg-dark-surface' : 'hover:bg-light-surface'}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary bg-primary/10'
                        : isDark ? 'text-text-muted-dark hover:text-white hover:bg-dark-surface' : 'text-text-muted-light hover:text-text-light hover:bg-light-surface'
                    }`}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                {user ? (
                  <div className="space-y-2">
                    <Link to="/perfil" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-text-light'}`}>{user.name}</p>
                        <p className="text-xs text-gray-500">Ver perfil</p>
                      </div>
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 w-full text-left">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Cerrar sesión</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className={`block px-4 py-3 rounded-xl text-sm font-medium text-center transition-colors ${isDark ? 'text-white hover:bg-dark-surface' : 'text-text-light hover:bg-light-surface'}`}>
                      Iniciar sesión
                    </Link>
                    <Link to="/registro" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-center bg-primary text-white hover:bg-primary-dark transition-colors">
                      Registrarse
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
