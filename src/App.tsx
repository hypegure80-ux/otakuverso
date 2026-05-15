import AdminPanel from './pages/admin/AdminPanel';
import { AppProvider, useApp } from './context';
import { Header, Footer, AuthModal } from './components/Layout';
import Home from './pages/Home';
import News from './pages/News';
import Recommendations from './pages/Recommendations';
import Gallery from './pages/Gallery';
import Openings from './pages/Openings';
import Catalog from './pages/Catalog';
import ManhuaDonghua from './pages/ManhuaDonghua';
import Korea from './pages/Korea';
import Mangakas from './pages/Mangakas';
import Community from './pages/Community';

function AppContent() {
  const { theme, page } = useApp();
  const isDark = theme === 'dark';

  const renderPage = () => {
    switch (page) {
      case 'admin': return <AdminPanel />;
      case 'home': return <Home />;
      case 'news': return <News />;
      case 'recommendations': return <Recommendations />;
      case 'gallery': return <Gallery />;
      case 'openings': return <Openings />;
      case 'catalog': return <Catalog />;
      case 'manhua': return <ManhuaDonghua />;
      case 'korea': return <Korea />;
      case 'mangakas': return <Mangakas />;
      case 'community': return <Community />;
      default: return <Home />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-dark-bg text-white' : 'bg-light-bg text-gray-900'}`}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderPage()}
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
