import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Heart, Twitter, Instagram, Youtube, Github, Mail } from 'lucide-react';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t mt-20 ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-light-border'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold">O</span>
              </div>
              <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-text-light'}`}>
                Otaku<span className="text-primary">Verse</span>
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
              Tu portal definitivo para la cultura geek asiática. Noticias, reseñas, recomendaciones y comunidad en un solo lugar.
            </p>
          </div>
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-text-light'}`}>Contenido</h4>
            <ul className="space-y-2">
              {['Anime', 'Manga', 'Manhwa', 'Webtoon', 'Donghua'].map(item => (
                <li key={item}>
                  <Link to={`/recomendaciones?tipo=${item.toLowerCase()}`} className={`text-sm transition-colors hover:text-primary ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-text-light'}`}>Comunidad</h4>
            <ul className="space-y-2">
              {['Noticias', 'Galería', 'Openings', 'Comunidad', 'Foro'].map(item => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className={`text-sm transition-colors hover:text-primary ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-text-light'}`}>Síguenos</h4>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
                { icon: Github, label: 'GitHub' },
                { icon: Mail, label: 'Email' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-dark-card hover:bg-primary/20 text-text-muted-dark hover:text-primary' : 'bg-light-surface hover:bg-primary/10 text-text-muted-light hover:text-primary'}`}
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={`mt-10 pt-6 border-t text-center text-sm flex items-center justify-center gap-1 ${isDark ? 'border-dark-border text-text-muted-dark' : 'border-light-border text-text-muted-light'}`}>
          Hecho con <Heart className="w-3 h-3 text-primary inline" /> por OtakuVerse &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
