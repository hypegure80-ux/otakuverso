import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { manhuaData, donghuaData } from '../data/content';
import ContentCard from '../components/ContentCard';
import { BookOpen, Tv } from 'lucide-react';

export default function ManhuaDonghua() {
  const { isDark } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>Manhua & Donghua</h1>
        <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          Descubre el mundo del cómic y animación chinos
        </p>
      </div>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Manhua</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {manhuaData.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <Tv className="w-5 h-5 text-primary" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>Donghua</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {donghuaData.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
