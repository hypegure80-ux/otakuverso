import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { mangakasData, animeData, mangaData } from '../data/content';
import ContentCard from '../components/ContentCard';
import { User, Award, BookOpen, Tv, MapPin, Calendar } from 'lucide-react';

export default function Japan() {
  const { isDark } = useTheme();

  const events = [
    { name: 'Comiket 106', date: '13-15 Agosto 2025', location: 'Tokyo Big Sight', description: 'La mayor convención de doujinshi del mundo con más de 600,000 asistentes esperados.' },
    { name: 'AnimeJapan 2025', date: 'Marzo 2025', location: 'Tokyo Big Sight', description: 'La convención de anime más grande de Japón con anuncios exclusivos y estrenos.' },
    { name: 'Jump Festa', date: 'Diciembre 2025', location: 'Makuhari Messe', description: 'Evento anual de Shueisha celebrando todo lo relacionado con Weekly Shonen Jump.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>Japón & Mangakas</h1>
        <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          Perfiles de creadores, cultura japonesa y eventos del mundo del anime y manga
        </p>
      </div>

      {/* Mangakas */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Mangakas Destacados</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mangakasData.map((mangaka, i) => (
            <motion.div
              key={mangaka.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${
                isDark ? 'bg-dark-card border-dark-border hover:border-primary/30' : 'bg-white border-light-border hover:border-primary/30'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={mangaka.image}
                    alt={mangaka.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-text-light'}`}>{mangaka.name}</h3>
                    <p className="text-xs text-gray-500">{mangaka.nationality}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" /> {mangaka.birthDate}
                    </p>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                  {mangaka.bio}
                </p>
                <div className="mb-3">
                  <h4 className={`text-xs font-semibold mb-2 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>Obras principales</h4>
                  <div className="flex flex-wrap gap-1">
                    {mangaka.works.map(work => (
                      <span key={work} className={`px-2 py-0.5 rounded-lg text-xs font-medium ${isDark ? 'bg-dark-surface text-text-muted-dark' : 'bg-light-surface text-text-muted-light'}`}>
                        {work}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-xs font-semibold mb-2 flex items-center gap-1 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                    <Award className="w-3 h-3" /> Premios
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {mangaka.awards.map(award => (
                      <span key={award} className="px-2 py-0.5 rounded-lg text-xs font-medium bg-primary/10 text-primary">
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Eventos en Japón</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((event, i) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-5 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}
            >
              <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>{event.name}</h3>
              <div className={`flex items-center gap-1 text-sm mb-1 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                <Calendar className="w-3.5 h-3.5" /> {event.date}
              </div>
              <div className={`flex items-center gap-1 text-sm mb-3 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                <MapPin className="w-3.5 h-3.5" /> {event.location}
              </div>
              <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>{event.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Anime & Manga from Japan */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Tv className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Anime Japonés</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {animeData.slice(0, 5).map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Manga Japonés</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mangaData.slice(0, 5).map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
