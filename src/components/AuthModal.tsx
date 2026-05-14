// ================================================================
// CAMBIOS EN src/components/Layout.tsx
// Solo reemplaza la función AuthModal completa.
// El Header y Footer no cambian.
// ================================================================

// Busca en Layout.tsx la función AuthModal y REEMPLÁZALA con esta:

export function AuthModal() {
  const { showAuth, setShowAuth, authMode, setAuthMode, login, register, theme, isAdmin, setPage } = useApp();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isDark = theme === 'dark';

  if (!showAuth) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) { setError('Completa todos los campos'); return; }
    if (authMode === 'register' && !username.trim()) { setError('El nombre de usuario es obligatorio'); return; }

    setLoading(true);
    let errorMsg: string | null;

    if (authMode === 'login') {
      errorMsg = await login(email, password);
    } else {
      errorMsg = await register(username, email, password);
    }

    setLoading(false);

    if (errorMsg) {
      // Traducir errores comunes de Supabase al español
      if (errorMsg.includes('Invalid login credentials')) setError('Email o contraseña incorrectos');
      else if (errorMsg.includes('User already registered')) setError('Este email ya está registrado');
      else if (errorMsg.includes('Password should be at least')) setError('La contraseña debe tener al menos 6 caracteres');
      else setError(errorMsg);
    } else {
      setUsername(''); setEmail(''); setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-4" onClick={() => setShowAuth(false)}>
      <div
        className={`w-full max-w-md rounded-2xl p-6 ${isDark ? 'bg-dark-card' : 'bg-light-card'} shadow-2xl`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {authMode === 'login' ? '🔑 Iniciar Sesión' : '✨ Crear Cuenta'}
          </h2>
          <button onClick={() => setShowAuth(false)} className="text-gray-400 hover:text-gray-300">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo username solo en registro */}
          {authMode === 'register' && (
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Nombre de usuario
              </label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-gray-900'} focus:outline-none focus:border-neon-red`}
                placeholder="Tu nombre otaku"
              />
            </div>
          )}

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-gray-900'} focus:outline-none focus:border-neon-red`}
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-gray-900'} focus:outline-none focus:border-neon-red`}
              placeholder="••••••••"
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-neon-red text-white font-bold hover:bg-neon-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Cargando...' : authMode === 'login' ? 'Entrar' : 'Crear Cuenta'}
          </button>
        </form>

        <p className={`text-center mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {authMode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button
            onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-neon-red font-medium hover:underline"
          >
            {authMode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}

// ================================================================
// TAMBIÉN en el Header: reemplaza el botón de usuario en "Right actions"
// Busca donde muestra el avatar del usuario y reemplaza esta parte:
// ================================================================

/*
  ANTES (en Header, busca el botón del usuario):
    const { ..., user, ... } = useApp();
    ...
    {user ? (
      <div className="...">
        <span>{user.avatar}</span>
        ...
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    ) : ( <button onClick={() => setShowAuth(true)}>...</button> )}

  DESPUÉS — agrega esto al principio del Header:
    const { ..., profile, logout, isAdmin, setPage, ... } = useApp();

  Y en el menú de usuario, agrega el botón de admin:
    {isAdmin && (
      <button onClick={() => { setPage('admin'); ... }}>
        ⚙️ Panel Admin
      </button>
    )}
*/
