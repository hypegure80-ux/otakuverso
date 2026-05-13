import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, Flame, Star, Clock } from 'lucide-react';
import { getTrending, getNewReleases, allContent } from '../data/content';
import { Link } from 'react-router-dom';

export default function TrendingWidget() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'rated'>('trending');

  const tabs = [
    { id: 'trending' as const, label: 'Tendencias', icon: Flame },
    { id: 'new' as const, label: 'Nuevos', icon: Clock },
    { id: 'rated' as const, label: 'Mejor valorados', icon: Star },
  ];

  const getData = () => {
    switch (activeTab) {
      case 'trending': return getTrending().slice(0, 10);
      case 'new': return getNewReleases().slice(0, 10);
      case 'rated': return [...allContent].sort((a, b) => b.rating - a.rating).slice(0, 10);
    }
  };

  const data = getData();

  return (
    <div className={`rounded-2xl border p-5 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-text-light'}`}>En tendencia</h3>
      </div>

      <div className="flex gap-1 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : isDark ? 'text-text-muted-dark hover:bg-dark-surface' : 'text-text-muted-light hover:bg-light-surface'
            }`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {data.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/recomendaciones`}
              className={`flex items-center gap-3 p-2 rounded-xl transition-colors group ${isDark ? 'hover:bg-dark-surface' : 'hover:bg-light-surface'}`}
            >
              <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold ${
                i < 3 ? 'bg-primary text-white' : isDark ? 'bg-dark-surface text-text-muted-dark' : 'bg-light-surface text-text-muted-light'
              }`}>
                {i + 1}
              </span>
              <img src={item.cover} alt={item.title} className="w-10 h-14 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate group-hover:text-primary transition-colors ${isDark ? 'text-white' : 'text-text-light'}`}>
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{item.type} &bull; {item.year}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                <Star className="w-3 h-3 fill-primary" />
                {item.rating}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
