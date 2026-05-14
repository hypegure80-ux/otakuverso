import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { searchContent, newsData, allContent } from '../data/content';
import type { NewsItem, AnimeManga } from '../data/content';
import NewsCard from '../components/NewsCard';
import ContentCard from '../components/ContentCard';
import { Search } from 'lucide-react';

export default function SearchResults() {
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<{ news: NewsItem[]; content: AnimeManga[] }>({ news: [] as NewsItem[], content: [] as AnimeManga[] });
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'content'>('all');

  useEffect(() => {
    if (query) {
      setResults(searchContent(query));
    }
  }, [query]);

  const totalResults = results.news.length + results.content.length;

  const displayNews = activeTab === 'all' || activeTab === 'news' ? results.news : [];
  const displayContent = activeTab === 'all' || activeTab === 'content' ? results.content : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>
          Resultados de búsqueda
        </h1>
        <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
          {totalResults} resultados para "{query}"
        </p>
      </div>

      {totalResults > 0 && (
        <div className="flex gap-2 mb-8">
          {[
            { id: 'all' as const, label: `Todos (${totalResults})` },
            { id: 'news' as const, label: `Noticias (${results.news.length})` },
            { id: 'content' as const, label: `Contenido (${results.content.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : isDark ? 'bg-dark-card text-text-muted-dark hover:bg-dark-surface' : 'bg-white text-text-muted-light hover:bg-light-surface border border-light-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {displayNews.length > 0 && (
        <section className="mb-10">
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-text-light'}`}>Noticias</h2>
          <div className="space-y-4">
            {displayNews.map((news, i) => (
              <NewsCard key={news.id} news={news} index={i} />
            ))}
          </div>
        </section>
      )}

      {displayContent.length > 0 && (
        <section>
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-text-light'}`}>Anime, Manga y más</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayContent.map((item, i) => (
              <ContentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>
      )}

      {totalResults === 0 && (
        <div className="text-center py-20">
          <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>No se encontraron resultados</p>
          <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
            Intenta con otros términos de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
