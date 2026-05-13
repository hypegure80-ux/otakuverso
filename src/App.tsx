import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import News from './pages/News';
import Recommendations from './pages/Recommendations';
import Gallery from './pages/Gallery';
import Openings from './pages/Openings';
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
