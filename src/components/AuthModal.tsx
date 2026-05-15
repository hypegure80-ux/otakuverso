import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { X } from 'lucide-react';

export function AuthModal() {
  const { login, register } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!showModal) return null;

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
      setError(errorMsg);
    } else {
      setShowModal(false);
      navigate('/perfil');
    }
  };

  const bg = isDark ? 'bg-dark-card' : 'bg-white';
  const border = isDark ? 'border-dark-border' : 'border-light-border';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isDark ? 'bg-dark-surface' : 'bg-light-surface';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-2xl border ${bg} ${border} shadow-2xl`}>
        <div className="flex items-center justify-between p-4 border-b border-inherit">
          <h2 className={`text-lg font-bold ${text}`}>
            {authMode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </h2>
          <button onClick={() => setShowModal(false)} className="p-1 hover:bg-black/10 rounded">
            <X className={`w-5 h-5 ${text}`} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">{error}</div>
          )}

          {authMode === 'register' && (
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${inputBg} ${border} ${text} placeholder:${textMuted} focus:outline-none focus:border-primary`}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${inputBg} ${border} ${text} placeholder:${textMuted} focus:outline-none focus:border-primary`}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${inputBg} ${border} ${text} placeholder:${textMuted} focus:outline-none focus:border-primary`}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? 'Cargando...' : authMode === 'login' ? 'Entrar' : 'Registrarse'}
          </button>
        </form>

        <div className={`p-4 text-center border-t border-inherit ${textMuted}`}>
          {authMode === 'login' ? (
            <>
              ¿No tienes cuenta?{' '}
              <button onClick={() => setAuthMode('register')} className="text-primary hover:underline">
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{' '}
              <button onClick={() => setAuthMode('login')} className="text-primary hover:underline">
                Inicia sesión
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Also export for external use
export default AuthModal;
