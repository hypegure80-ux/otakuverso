import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Mail, Send, Check } from 'lucide-react';

export default function Newsletter() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const subs = JSON.parse(localStorage.getItem('otakuverse-newsletter') || '[]');
      if (!subs.includes(email)) {
        subs.push(email);
        localStorage.setItem('otakuverse-newsletter', JSON.stringify(subs));
      }
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className={`rounded-2xl border p-8 md:p-10 text-center ${isDark ? 'bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30' : 'bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20'}`}>
      <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
        <Mail className="w-7 h-7 text-primary" />
      </div>
      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>
        Suscríbete al newsletter
      </h3>
      <p className={`text-sm mb-6 max-w-md mx-auto ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
        Recibe las últimas noticias de anime, manga y cultura geek asiática directamente en tu correo.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className={`flex-1 px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
            isDark ? 'bg-dark-bg border-dark-border text-white placeholder-gray-500' : 'bg-white border-light-border text-text-light placeholder-gray-400'
          }`}
        />
        <button
          type="submit"
          disabled={subscribed}
          className="px-6 py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {subscribed ? (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
              <Check className="w-4 h-4" /> ¡Suscrito!
            </motion.span>
          ) : (
            <>
              <Send className="w-4 h-4" /> Suscribirse
            </>
          )}
        </button>
      </form>
    </div>
  );
}
