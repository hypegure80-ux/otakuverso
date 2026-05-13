import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { isDark } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(email, password)) {
      navigate('/');
    } else {
      setError('Credenciales incorrectas. Prueba registrándote primero.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md rounded-2xl border p-8 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-7 h-7 text-primary" />
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>Bienvenido de vuelta</h1>
          <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
            Inicia sesión para acceder a tu cuenta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  isDark ? 'bg-dark-surface border-dark-border text-white placeholder-gray-500' : 'bg-light-surface border-light-border text-text-light placeholder-gray-400'
                }`}
              />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  isDark ? 'bg-dark-surface border-dark-border text-white placeholder-gray-500' : 'bg-light-surface border-light-border text-text-light placeholder-gray-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500">
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors"
          >
            Iniciar sesión
          </button>
        </form>

        <p className={`text-center text-sm mt-6 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-primary hover:text-primary-dark font-medium">
            Regístrate
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
