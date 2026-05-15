import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { manhwaData, webtoonData } from '../data/content';
import ContentCard from '../components/ContentCard';
import { Globe, Star, Music, Tv } from 'lucide-react';

export default function Korea() {
  const { isDark } = useTheme();

  const kpopArtists = [
    { name: 'BTS', genre: 'K-pop', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80' },
    { name: 'NewJeans', genre: 'K-pop', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80' },
    { name: 'Stray Kids', genre: 'K-pop', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&q=80' },
    { name: 'BLACKPINK', genre: 'K-pop', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>Corea del Sur</h1>
        <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          Manhwa, webtoons coreanos, K-pop y cultura pop surcoreana
        </p>
      </div>

      {/* K-pop Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Music className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>K-pop & Cultura</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {kpopArtists.map((artist, i) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}
            >
              <div className="aspect-square overflow-hidden">
                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-text-light'}`}>{artist.name}</h3>
                <p className="text-xs text-gray-500">{artist.genre}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className={`rounded-2xl border p-6 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
          <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-text-light'}`}>Colaboraciones K-pop × Anime</h3>
          <ul className={`space-y-3 text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
            <li className="flex items-start gap-2">
              <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>NewJeans canta el opening de una serie original de Netflix producida en Japón</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Stray Kids participa en el soundtrack de Solo Leveling Season 2</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>BTS colabora con un estudio de animación japonés para un proyecto original</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>IVE interpreta el ending de Tower of God Season 2</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Manhwa */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Manhwa</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {manhwaData.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Webtoon Coreano */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Tv className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Webtoon Coreano</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {webtoonData.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
