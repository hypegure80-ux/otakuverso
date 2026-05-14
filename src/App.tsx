<<<<<<< HEAD
import AdminPanel from './pages/admin/AdminPanel';
import { AppProvider, useApp } from './context';
import { Header, Footer, AuthModal } from './components/Layout';
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
import Home from './pages/Home';
import News from './pages/News';
import Recommendations from './pages/Recommendations';
import Gallery from './pages/Gallery';
import Openings from './pages/Openings';
<<<<<<< HEAD
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
=======
import MangaWebtoon from './pages/MangaWebtoon';
import ManhuaDonghua from './pages/ManhuaDonghua';
import Korea from './pages/Korea';
import Japan from './pages/Japan';
import Community from './pages/Community';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/noticias" element={<News />} />
                <Route path="/noticias/:id" element={<News />} />
                <Route path="/recomendaciones" element={<Recommendations />} />
                <Route path="/galeria" element={<Gallery />} />
                <Route path="/openings" element={<Openings />} />
                <Route path="/manga" element={<MangaWebtoon />} />
                <Route path="/manhua" element={<ManhuaDonghua />} />
                <Route path="/corea" element={<Korea />} />
                <Route path="/japon" element={<Japan />} />
                <Route path="/comunidad" element={<Community />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/buscar" element={<SearchResults />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
>>>>>>> 72d59d17bad9a5b81be272395c4e3868e0dfe94c
