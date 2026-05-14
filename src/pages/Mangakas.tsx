import { useState } from 'react';
import { useApp } from '../context';
import { mangakaData } from '../data';

export default function Mangakas() {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterNat, setFilterNat] = useState('Todos');

  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border';
  const surfaceBg = isDark ? 'bg-dark-surface' : 'bg-light-surface';

  const nationalities = ['Todos', ...Array.from(new Set(mangakaData.map(m => m.nationality)))];
  const filtered = filterNat === 'Todos' ? mangakaData : mangakaData.filter(m => m.nationality === filterNat);
  const selected = mangakaData.find(m => m.id === selectedId);

  return (
    <div>
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8" style={{ height: '200px' }}>
        <img src="/images/manga-art.jpg" alt="Mangakas" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">✍️ Japón / Mangakas</h1>
            <p className="text-gray-300 text-sm">Perfiles de creadores, bibliografías y premios</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {nationalities.map(nat => (
          <button
            key={nat}
            onClick={() => setFilterNat(nat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterNat === nat ? 'bg-neon-red text-white' : `${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`
            }`}
          >
            {nat === 'Todos' ? '🌐 Todos' : nat === 'Japonés' || nat === 'Japonesa' ? `🇯🇵 ${nat}` : nat === 'Coreano' ? `🇰🇷 ${nat}` : `🇨🇳 ${nat}`}
          </button>
        ))}
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((creator, i) => (
          <button
            key={creator.id}
            onClick={() => setSelectedId(creator.id)}
            className={`text-left rounded-xl border overflow-hidden card-hover ${cardBg} animate-fade-up`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="p-6 text-center">
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 ${surfaceBg}`}>
                {creator.photo}
              </div>
              <h3 className={`text-base font-bold ${text}`}>{creator.name}</h3>
              <p className={`text-xs ${textMuted} mb-1`}>{creator.nameJp}</p>
              <p className={`text-xs ${textMuted} mb-3`}>
                {creator.nationality === 'Japonés' || creator.nationality === 'Japonesa' ? '🇯🇵' : creator.nationality === 'Coreano' ? '🇰🇷' : '🇨🇳'} {creator.nationality}
              </p>
              <div className="flex flex-wrap gap-1 justify-center mb-3">
                {creator.works.slice(0, 3).map(w => (
                  <span key={w} className={`text-[10px] px-2 py-0.5 rounded-full ${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{w}</span>
                ))}
              </div>
              <span className={`text-xs ${creator.active ? 'text-green-400' : 'text-yellow-400'}`}>
                {creator.active ? '🟢 Activo' : '🟡 Retirado'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[90] modal-overlay flex items-center justify-center p-4" onClick={() => setSelectedId(null)}>
          <div className={`w-full max-w-xl rounded-2xl overflow-hidden ${isDark ? 'bg-dark-card' : 'bg-light-card'} shadow-2xl max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            <div className="p-8 text-center bg-gradient-to-br from-neon-red/10 to-neon-purple/10">
              <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl mb-4 ${surfaceBg}`}>
                {selected.photo}
              </div>
              <h2 className={`text-2xl font-bold ${text}`}>{selected.name}</h2>
              <p className={`text-sm ${textMuted}`}>{selected.nameJp}</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className={`text-xs ${textMuted}`}>🎂 {selected.birthDate}</span>
                <span className={`text-xs ${selected.active ? 'text-green-400' : 'text-yellow-400'}`}>
                  {selected.active ? '🟢 Activo' : '🟡 Retirado'}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${textMuted} mb-2`}>Biografía</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{selected.bio}</p>
              </div>
              <div>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${textMuted} mb-2`}>Obras</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.works.map(w => (
                    <span key={w} className={`px-3 py-1.5 rounded-lg text-sm ${surfaceBg} ${text}`}>{w}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${textMuted} mb-2`}>Premios</h3>
                <div className="space-y-1">
                  {selected.awards.map(a => (
                    <div key={a} className="flex items-center gap-2">
                      <span className="text-yellow-400">🏆</span>
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setSelectedId(null)} className={`w-full py-2 rounded-lg text-sm ${surfaceBg} ${isDark ? 'text-gray-300' : 'text-gray-600'} hover:bg-neon-red/10 hover:text-neon-red transition-colors`}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Japan Culture Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`rounded-xl border p-6 ${cardBg}`}>
          <h3 className={`text-lg font-bold mb-3 ${text}`}>🎌 Convenciones</h3>
          <div className="space-y-3">
            {[
              { name: 'Comiket', location: 'Tokio', date: 'Agosto/Diciembre', emoji: '📚' },
              { name: 'AnimeJapan', location: 'Tokyo Big Sight', date: 'Marzo', emoji: '🎬' },
              { name: 'Jump Festa', location: 'Chiba', date: 'Diciembre', emoji: '⭐' },
              { name: 'Wonder Festival', location: 'Chiba', date: 'Feb/Jul', emoji: '🎭' },
            ].map((con, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${surfaceBg}`}>
                <span className="text-2xl">{con.emoji}</span>
                <div>
                  <p className={`text-sm font-bold ${text}`}>{con.name}</p>
                  <p className={`text-[10px] ${textMuted}`}>{con.location} • {con.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border p-6 ${cardBg}`}>
          <h3 className={`text-lg font-bold mb-3 ${text}`}>🏢 Estudios Destacados</h3>
          <div className="space-y-3">
            {[
              { name: 'MAPPA', known: 'JJK, AoT Final', emoji: '🔥' },
              { name: 'ufotable', known: 'Demon Slayer', emoji: '⚔️' },
              { name: 'Madhouse', known: 'Frieren, One Punch Man', emoji: '🌟' },
              { name: 'WIT Studio', known: 'Spy x Family, AoT', emoji: '💎' },
              { name: 'Bones', known: 'MHA, Mob Psycho', emoji: '💥' },
            ].map((s, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${surfaceBg}`}>
                <span className="text-2xl">{s.emoji}</span>
                <div>
                  <p className={`text-sm font-bold ${text}`}>{s.name}</p>
                  <p className={`text-[10px] ${textMuted}`}>{s.known}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border p-6 ${cardBg}`}>
          <h3 className={`text-lg font-bold mb-3 ${text}`}>📰 Revistas de Manga</h3>
          <div className="space-y-3">
            {[
              { name: 'Weekly Shonen Jump', pub: 'Shueisha', emoji: '📕' },
              { name: 'Weekly Shonen Magazine', pub: 'Kodansha', emoji: '📗' },
              { name: 'Monthly Shonen Sunday', pub: 'Shogakukan', emoji: '📘' },
              { name: 'Shonen Jump+', pub: 'Digital', emoji: '📱' },
              { name: 'Big Comic Spirits', pub: 'Shogakukan', emoji: '📙' },
            ].map((m, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${surfaceBg}`}>
                <span className="text-2xl">{m.emoji}</span>
                <div>
                  <p className={`text-sm font-bold ${text}`}>{m.name}</p>
                  <p className={`text-[10px] ${textMuted}`}>{m.pub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
