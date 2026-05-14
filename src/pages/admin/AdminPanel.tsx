// ================================================================
// src/pages/admin/AdminPanel.tsx
// Panel de administrador con CRUD completo para todas las secciones
// Coloca este archivo en: src/pages/admin/AdminPanel.tsx
// ================================================================

import { useState, useEffect } from 'react';
import { useApp } from '../../context';
import { supabase } from '../../lib/supabase';
import type { NewsItem, CatalogItem, Mangaka, Opening, GalleryImage, ForumPost } from '../../lib/supabase';

// ─── TIPOS DE SECCIÓN ────────────────────────────────────────
type AdminSection = 'dashboard' | 'news' | 'catalog' | 'mangakas' | 'openings' | 'gallery' | 'forum' | 'users';

// ─── COMPONENTE PRINCIPAL ────────────────────────────────────
export default function AdminPanel() {
  const { theme, isAdmin, setPage } = useApp();
  const isDark = theme === 'dark';
  const [section, setSection] = useState<AdminSection>('dashboard');

  // Proteger la ruta: solo admins
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <span className="text-6xl">🔒</span>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Acceso denegado</h2>
        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No tienes permisos de administrador.</p>
        <button onClick={() => setPage('home')} className="px-6 py-2 rounded-xl bg-neon-red text-white font-medium">
          Volver al inicio
        </button>
      </div>
    );
  }

  const bg = isDark ? 'bg-dark-bg' : 'bg-light-bg';
  const cardBg = isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';

  const menuItems: { key: AdminSection; label: string; icon: string }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'news', label: 'Noticias', icon: '📰' },
    { key: 'catalog', label: 'Catálogo', icon: '📚' },
    { key: 'mangakas', label: 'Mangakas', icon: '✍️' },
    { key: 'openings', label: 'Openings/EDs', icon: '🎵' },
    { key: 'gallery', label: 'Galería', icon: '🎨' },
    { key: 'forum', label: 'Foro', icon: '💬' },
    { key: 'users', label: 'Usuarios', icon: '👥' },
  ];

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className={`w-56 shrink-0 rounded-2xl border p-4 h-fit sticky top-20 ${cardBg}`}>
        <div className="flex items-center gap-2 mb-6 px-2">
          <span className="text-xl">⚙️</span>
          <span className={`font-bold ${text}`}>Admin</span>
        </div>
        <nav className="space-y-1">
          {menuItems.map(item => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                section === item.key
                  ? 'bg-neon-red/10 text-neon-red'
                  : `${textMuted} hover:text-neon-red hover:bg-neon-red/5`
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-6 pt-4 border-t border-dark-border">
          <button
            onClick={() => setPage('home')}
            className={`w-full text-sm ${textMuted} hover:text-neon-red flex items-center gap-2 px-3 py-2`}
          >
            ← Volver al sitio
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 min-w-0">
        {section === 'dashboard' && <AdminDashboard theme={theme} />}
        {section === 'news' && <AdminNews theme={theme} />}
        {section === 'catalog' && <AdminCatalog theme={theme} />}
        {section === 'mangakas' && <AdminMangakas theme={theme} />}
        {section === 'openings' && <AdminOpenings theme={theme} />}
        {section === 'gallery' && <AdminGallery theme={theme} />}
        {section === 'forum' && <AdminForum theme={theme} />}
        {section === 'users' && <AdminUsers theme={theme} />}
      </main>
    </div>
  );
}

// ─── ESTILOS REUTILIZABLES ────────────────────────────────────
function useStyles(theme: string) {
  const isDark = theme === 'dark';
  return {
    isDark,
    text: isDark ? 'text-white' : 'text-gray-900',
    textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
    cardBg: isDark ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border',
    surfaceBg: isDark ? 'bg-dark-surface' : 'bg-light-surface',
    inputCls: `w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-gray-900'} focus:outline-none focus:border-neon-red`,
  };
}

// ─── DASHBOARD ───────────────────────────────────────────────
function AdminDashboard({ theme }: { theme: string }) {
  const s = useStyles(theme);
  const [counts, setCounts] = useState({ news: 0, catalog: 0, mangakas: 0, openings: 0, gallery: 0, forum: 0, users: 0 });

  useEffect(() => {
    const tables = ['news', 'catalog', 'mangakas', 'openings', 'gallery', 'forum_posts', 'profiles'] as const;
    const keys = ['news', 'catalog', 'mangakas', 'openings', 'gallery', 'forum', 'users'] as const;
    Promise.all(tables.map(t => supabase.from(t).select('*', { count: 'exact', head: true }))).then(results => {
      const newCounts = { ...counts };
      results.forEach((r, i) => { (newCounts as any)[keys[i]] = r.count ?? 0; });
      setCounts(newCounts);
    });
  }, []);

  const stats = [
    { label: 'Noticias', value: counts.news, icon: '📰', color: 'text-blue-400' },
    { label: 'Catálogo', value: counts.catalog, icon: '📚', color: 'text-purple-400' },
    { label: 'Mangakas', value: counts.mangakas, icon: '✍️', color: 'text-yellow-400' },
    { label: 'Openings', value: counts.openings, icon: '🎵', color: 'text-green-400' },
    { label: 'Galería', value: counts.gallery, icon: '🎨', color: 'text-pink-400' },
    { label: 'Posts foro', value: counts.forum, icon: '💬', color: 'text-orange-400' },
    { label: 'Usuarios', value: counts.users, icon: '👥', color: 'text-cyan-400' },
  ];

  return (
    <div>
      <h1 className={`text-2xl font-bold mb-6 ${s.text}`}>📊 Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className={`rounded-2xl border p-4 ${s.cardBg}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
            </div>
            <p className={`text-sm ${s.textMuted}`}>{stat.label}</p>
          </div>
        ))}
      </div>
      <div className={`mt-6 rounded-2xl border p-6 ${s.cardBg}`}>
        <h2 className={`font-bold mb-3 ${s.text}`}>ℹ️ Instrucciones rápidas</h2>
        <ul className={`text-sm space-y-2 ${s.textMuted}`}>
          <li>• Selecciona una sección del menú izquierdo para gestionar el contenido.</li>
          <li>• Cada sección tiene botón <strong className="text-neon-red">+ Nuevo</strong> para agregar registros.</li>
          <li>• Los cambios se guardan inmediatamente en Supabase.</li>
          <li>• En <strong>Usuarios</strong> puedes cambiar roles (user/admin).</li>
        </ul>
      </div>
    </div>
  );
}

// ─── CRUD GENÉRICO ─────────────────────────────────────────────
// Componente reutilizable para las secciones simples

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (val: any, row: T) => React.ReactNode;
}

interface CrudSectionProps<T extends { id: number }> {
  title: string;
  icon: string;
  table: string;
  theme: string;
  columns: Column<T>[];
  FormComponent: React.ComponentType<{ item: Partial<T> | null; onSave: (data: Partial<T>) => void; onCancel: () => void; theme: string }>;
  orderBy?: string;
}

function CrudSection<T extends { id: number }>({ title, icon, table, theme, columns, FormComponent, orderBy = 'id' }: CrudSectionProps<T>) {
  const s = useStyles(theme);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<T> | null | undefined>(undefined); // undefined = cerrado, null = nuevo
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    setLoading(true);
    const { data } = await supabase.from(table).select('*').order(orderBy);
    if (data) setItems(data as T[]);
    setLoading(false);
  }

  async function handleSave(formData: Partial<T>) {
    if (editing && (editing as any).id) {
      // Editar
      await supabase.from(table).update(formData).eq('id', (editing as any).id);
    } else {
      // Crear nuevo
      await supabase.from(table).insert(formData);
    }
    setEditing(undefined);
    fetchItems();
  }

  async function handleDelete(id: number) {
    setDeleting(id);
    await supabase.from(table).delete().eq('id', id);
    setItems(prev => prev.filter(i => i.id !== id));
    setDeleting(null);
  }

  const filtered = items.filter(item =>
    Object.values(item as any).some(v =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  if (editing !== undefined) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setEditing(undefined)} className={`text-sm ${s.textMuted} hover:text-neon-red`}>
            ← Volver
          </button>
          <h1 className={`text-xl font-bold ${s.text}`}>
            {editing ? `✏️ Editar` : `➕ Nuevo`} {title.replace(/s$/, '')}
          </h1>
        </div>
        <FormComponent item={editing} onSave={handleSave} onCancel={() => setEditing(undefined)} theme={theme} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${s.text}`}>{icon} {title}</h1>
        <button
          onClick={() => setEditing(null)}
          className="px-4 py-2 rounded-xl bg-neon-red text-white text-sm font-medium hover:bg-neon-red/90"
        >
          + Nuevo
        </button>
      </div>

      {/* Búsqueda */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={`Buscar en ${title.toLowerCase()}...`}
        className={`${s.inputCls} mb-4`}
      />

      {/* Tabla */}
      {loading ? (
        <div className={`text-center py-12 ${s.textMuted}`}>⏳ Cargando...</div>
      ) : filtered.length === 0 ? (
        <div className={`text-center py-12 ${s.textMuted}`}>No hay registros.</div>
      ) : (
        <div className={`rounded-2xl border overflow-hidden ${s.cardBg}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={s.surfaceBg}>
                <tr>
                  {columns.map(col => (
                    <th key={String(col.key)} className={`px-4 py-3 text-left font-medium ${s.textMuted}`}>
                      {col.label}
                    </th>
                  ))}
                  <th className={`px-4 py-3 text-right font-medium ${s.textMuted}`}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr key={item.id} className={`border-t ${s.isDark ? 'border-dark-border' : 'border-light-border'} ${idx % 2 === 0 ? '' : s.surfaceBg}`}>
                    {columns.map(col => (
                      <td key={String(col.key)} className={`px-4 py-3 ${s.text} max-w-[200px] truncate`}>
                        {col.render ? col.render((item as any)[col.key], item) : String((item as any)[col.key] ?? '')}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditing(item)}
                          className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => { if (confirm('¿Eliminar este registro?')) handleDelete(item.id); }}
                          disabled={deleting === item.id}
                          className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 disabled:opacity-50"
                        >
                          {deleting === item.id ? '...' : '🗑️'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className={`mt-3 text-xs ${s.textMuted}`}>{filtered.length} registros</p>
    </div>
  );
}

// ─── FORMULARIO: NOTICIAS ─────────────────────────────────────
function NewsForm({ item, onSave, onCancel, theme }: any) {
  const s = useStyles(theme);
  const def = { title: '', summary: '', content: '', category: 'Anime', date: new Date().toISOString().split('T')[0], image: '', featured: false, tags: [] };
  const [form, setForm] = useState({ ...def, ...item });
  const [tagsStr, setTagsStr] = useState((item?.tags || []).join(', '));

  const categories = ['Anime', 'Manga', 'Webtoon', 'Donghua', 'Manhua', 'Manhwa', 'Industria'];

  const handle = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  return (
    <div className={`rounded-2xl border p-6 space-y-4 ${s.cardBg}`}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Título *</label>
          <input value={form.title} onChange={e => handle('title', e.target.value)} className={s.inputCls} placeholder="Título de la noticia" />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Categoría</label>
          <select value={form.category} onChange={e => handle('category', e.target.value)} className={s.inputCls}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Fecha</label>
          <input type="date" value={form.date} onChange={e => handle('date', e.target.value)} className={s.inputCls} />
        </div>
        <div className="col-span-2">
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Resumen *</label>
          <textarea value={form.summary} onChange={e => handle('summary', e.target.value)} rows={2} className={s.inputCls} placeholder="Breve descripción para la lista" />
        </div>
        <div className="col-span-2">
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Contenido completo *</label>
          <textarea value={form.content} onChange={e => handle('content', e.target.value)} rows={6} className={s.inputCls} placeholder="Cuerpo completo del artículo" />
        </div>
        <div className="col-span-2">
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Imagen (URL o gradiente CSS)</label>
          <input value={form.image} onChange={e => handle('image', e.target.value)} className={s.inputCls} placeholder="https://... o linear-gradient(...)" />
        </div>
        <div className="col-span-2">
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Tags (separados por coma)</label>
          <input value={tagsStr} onChange={e => { setTagsStr(e.target.value); handle('tags', e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean)); }} className={s.inputCls} placeholder="Anime, Shonen, ..." />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="featured" checked={form.featured} onChange={e => handle('featured', e.target.checked)} className="accent-neon-red" />
          <label htmlFor="featured" className={`text-sm ${s.text}`}>⭐ Destacada (aparece en el hero del home)</label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} className="px-6 py-2 rounded-xl bg-neon-red text-white font-medium text-sm hover:bg-neon-red/90">
          💾 Guardar
        </button>
        <button onClick={onCancel} className={`px-6 py-2 rounded-xl text-sm ${s.textMuted} hover:text-neon-red`}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

// ─── ADMIN NOTICIAS ───────────────────────────────────────────
function AdminNews({ theme }: { theme: string }) {
  const columns: Column<NewsItem>[] = [
    { key: 'title', label: 'Título' },
    { key: 'category', label: 'Categoría' },
    { key: 'date', label: 'Fecha' },
    { key: 'featured', label: '⭐', render: v => v ? '✅' : '—' },
  ];
  return <CrudSection<NewsItem> title="Noticias" icon="📰" table="news" theme={theme} columns={columns} FormComponent={NewsForm} orderBy="date" />;
}

// ─── FORMULARIO: CATÁLOGO ─────────────────────────────────────
function CatalogForm({ item, onSave, onCancel, theme }: any) {
  const s = useStyles(theme);
  const def = { title: '', title_jp: '', type: 'anime', genres: [], rating: 8.0, status: 'En emisión', year: new Date().getFullYear(), origin: 'japan', synopsis: '', image: '', popularity: 50, studio: '' };
  const [form, setForm] = useState({ ...def, ...item });
  const [genresStr, setGenresStr] = useState((item?.genres || []).join(', '));
  const handle = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  return (
    <div className={`rounded-2xl border p-6 space-y-4 ${s.cardBg}`}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Título *</label>
          <input value={form.title} onChange={e => handle('title', e.target.value)} className={s.inputCls} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Título JP/Original</label>
          <input value={form.title_jp} onChange={e => handle('title_jp', e.target.value)} className={s.inputCls} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Tipo</label>
          <select value={form.type} onChange={e => handle('type', e.target.value)} className={s.inputCls}>
            {['anime','manga','webtoon','manhua','manhwa','donghua'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Origen</label>
          <select value={form.origin} onChange={e => handle('origin', e.target.value)} className={s.inputCls}>
            <option value="japan">🇯🇵 Japón</option>
            <option value="korea">🇰🇷 Corea</option>
            <option value="china">🇨🇳 China</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Estado</label>
          <select value={form.status} onChange={e => handle('status', e.target.value)} className={s.inputCls}>
            {['En emisión','Completado','Próximamente'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Rating (0-10)</label>
          <input type="number" min="0" max="10" step="0.1" value={form.rating} onChange={e => handle('rating', parseFloat(e.target.value))} className={s.inputCls} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Año</label>
          <input type="number" value={form.year} onChange={e => handle('year', parseInt(e.target.value))} className={s.inputCls} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Popularidad (0-100)</label>
          <input type="number" min="0" max="100" value={form.popularity} onChange={e => handle('popularity', parseInt(e.target.value))} className={s.inputCls} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Episodios (si aplica)</label>
          <input type="number" value={form.episodes || ''} onChange={e => handle('episodes', e.target.value ? parseInt(e.target.value) : null)} className={s.inputCls} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Capítulos (si aplica)</label>
          <input type="number" value={form.chapters || ''} onChange={e => handle('chapters', e.target.value ? parseInt(e.target.value) : null)} className={s.inputCls} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Estudio/Plataforma</label>
          <input value={form.studio || ''} onChange={e => handle('studio', e.target.value)} className={s.inputCls} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Temporada</label>
          <select value={form.season || ''} onChange={e => handle('season', e.target.value || null)} className={s.inputCls}>
            <option value="">— Sin temporada —</option>
            {['Primavera','Verano','Otoño','Invierno'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Géneros (separados por coma)</label>
          <input value={genresStr} onChange={e => { setGenresStr(e.target.value); handle('genres', e.target.value.split(',').map((g: string) => g.trim()).filter(Boolean)); }} className={s.inputCls} placeholder="Acción, Aventura, ..." />
        </div>
        <div className="col-span-2">
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Sinopsis</label>
          <textarea value={form.synopsis} onChange={e => handle('synopsis', e.target.value)} rows={3} className={s.inputCls} />
        </div>
        <div className="col-span-2">
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Imagen (URL o gradiente CSS)</label>
          <input value={form.image} onChange={e => handle('image', e.target.value)} className={s.inputCls} placeholder="https://... o linear-gradient(...)" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} className="px-6 py-2 rounded-xl bg-neon-red text-white font-medium text-sm">💾 Guardar</button>
        <button onClick={onCancel} className={`px-6 py-2 rounded-xl text-sm ${s.textMuted}`}>Cancelar</button>
      </div>
    </div>
  );
}

function AdminCatalog({ theme }: { theme: string }) {
  const columns: Column<CatalogItem>[] = [
    { key: 'title', label: 'Título' },
    { key: 'type', label: 'Tipo' },
    { key: 'origin', label: 'Origen' },
    { key: 'rating', label: '⭐', render: v => `${v}/10` },
    { key: 'status', label: 'Estado' },
  ];
  return <CrudSection<CatalogItem> title="Catálogo" icon="📚" table="catalog" theme={theme} columns={columns} FormComponent={CatalogForm} orderBy="popularity" />;
}

// ─── FORMULARIO: MANGAKAS ─────────────────────────────────────
function MangakaForm({ item, onSave, onCancel, theme }: any) {
  const s = useStyles(theme);
  const def = { name: '', name_jp: '', photo: '✍️', birth_date: '', nationality: 'Japonés', bio: '', works: [], awards: [], active: true };
  const [form, setForm] = useState({ ...def, ...item });
  const [worksStr, setWorksStr] = useState((item?.works || []).join(', '));
  const [awardsStr, setAwardsStr] = useState((item?.awards || []).join(', '));
  const handle = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  return (
    <div className={`rounded-2xl border p-6 space-y-4 ${s.cardBg}`}>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Nombre *</label><input value={form.name} onChange={e => handle('name', e.target.value)} className={s.inputCls} /></div>
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Nombre original</label><input value={form.name_jp} onChange={e => handle('name_jp', e.target.value)} className={s.inputCls} /></div>
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Foto (emoji o URL)</label><input value={form.photo} onChange={e => handle('photo', e.target.value)} className={s.inputCls} /></div>
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Fecha de nacimiento</label><input value={form.birth_date} onChange={e => handle('birth_date', e.target.value)} className={s.inputCls} placeholder="1 de enero, 1990" /></div>
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Nacionalidad</label><input value={form.nationality} onChange={e => handle('nationality', e.target.value)} className={s.inputCls} /></div>
        <div className="flex items-center gap-2 pt-5">
          <input type="checkbox" id="active" checked={form.active} onChange={e => handle('active', e.target.checked)} className="accent-neon-red" />
          <label htmlFor="active" className={`text-sm ${s.text}`}>Activo actualmente</label>
        </div>
        <div className="col-span-2"><label className={`block text-sm font-medium mb-1 ${s.text}`}>Biografía</label><textarea value={form.bio} onChange={e => handle('bio', e.target.value)} rows={4} className={s.inputCls} /></div>
        <div className="col-span-2"><label className={`block text-sm font-medium mb-1 ${s.text}`}>Obras (separadas por coma)</label><input value={worksStr} onChange={e => { setWorksStr(e.target.value); handle('works', e.target.value.split(',').map((w: string) => w.trim()).filter(Boolean)); }} className={s.inputCls} /></div>
        <div className="col-span-2"><label className={`block text-sm font-medium mb-1 ${s.text}`}>Premios (separados por coma)</label><input value={awardsStr} onChange={e => { setAwardsStr(e.target.value); handle('awards', e.target.value.split(',').map((a: string) => a.trim()).filter(Boolean)); }} className={s.inputCls} /></div>
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} className="px-6 py-2 rounded-xl bg-neon-red text-white font-medium text-sm">💾 Guardar</button>
        <button onClick={onCancel} className={`px-6 py-2 rounded-xl text-sm ${s.textMuted}`}>Cancelar</button>
      </div>
    </div>
  );
}

function AdminMangakas({ theme }: { theme: string }) {
  const columns: Column<Mangaka>[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'nationality', label: 'Nacionalidad' },
    { key: 'active', label: 'Activo', render: v => v ? '✅' : '—' },
  ];
  return <CrudSection<Mangaka> title="Mangakas" icon="✍️" table="mangakas" theme={theme} columns={columns} FormComponent={MangakaForm} orderBy="name" />;
}

// ─── FORMULARIO: OPENINGS ─────────────────────────────────────
function OpeningForm({ item, onSave, onCancel, theme }: any) {
  const s = useStyles(theme);
  const def = { title: '', anime: '', artist: '', type: 'OP', season: 'Otoño', year: new Date().getFullYear(), video_url: '' };
  const [form, setForm] = useState({ ...def, ...item });
  const handle = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));
  return (
    <div className={`rounded-2xl border p-6 space-y-4 ${s.cardBg}`}>
      <div className="grid grid-cols-2 gap-4">
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Título de la canción *</label><input value={form.title} onChange={e => handle('title', e.target.value)} className={s.inputCls} /></div>
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Anime *</label><input value={form.anime} onChange={e => handle('anime', e.target.value)} className={s.inputCls} /></div>
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Artista *</label><input value={form.artist} onChange={e => handle('artist', e.target.value)} className={s.inputCls} /></div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Tipo</label>
          <select value={form.type} onChange={e => handle('type', e.target.value)} className={s.inputCls}>
            <option value="OP">Opening (OP)</option>
            <option value="ED">Ending (ED)</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${s.text}`}>Temporada</label>
          <select value={form.season} onChange={e => handle('season', e.target.value)} className={s.inputCls}>
            {['Primavera','Verano','Otoño','Invierno'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Año</label><input type="number" value={form.year} onChange={e => handle('year', parseInt(e.target.value))} className={s.inputCls} /></div>
        <div className="col-span-2"><label className={`block text-sm font-medium mb-1 ${s.text}`}>URL de YouTube</label><input value={form.video_url} onChange={e => handle('video_url', e.target.value)} className={s.inputCls} placeholder="https://www.youtube.com/watch?v=..." /></div>
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} className="px-6 py-2 rounded-xl bg-neon-red text-white font-medium text-sm">💾 Guardar</button>
        <button onClick={onCancel} className={`px-6 py-2 rounded-xl text-sm ${s.textMuted}`}>Cancelar</button>
      </div>
    </div>
  );
}

function AdminOpenings({ theme }: { theme: string }) {
  const columns: Column<Opening>[] = [
    { key: 'title', label: 'Canción' },
    { key: 'anime', label: 'Anime' },
    { key: 'artist', label: 'Artista' },
    { key: 'type', label: 'Tipo' },
    { key: 'year', label: 'Año' },
  ];
  return <CrudSection<Opening> title="Openings & EDs" icon="🎵" table="openings" theme={theme} columns={columns} FormComponent={OpeningForm} orderBy="year" />;
}

// ─── FORMULARIO: GALERÍA ──────────────────────────────────────
function GalleryForm({ item, onSave, onCancel, theme }: any) {
  const s = useStyles(theme);
  const def = { title: '', artist: '', series: '', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '🎨', likes: 0 };
  const [form, setForm] = useState({ ...def, ...item });
  const handle = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));
  return (
    <div className={`rounded-2xl border p-6 space-y-4 ${s.cardBg}`}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2"><label className={`block text-sm font-medium mb-1 ${s.text}`}>Título *</label><input value={form.title} onChange={e => handle('title', e.target.value)} className={s.inputCls} /></div>
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Artista</label><input value={form.artist} onChange={e => handle('artist', e.target.value)} className={s.inputCls} placeholder="@usuario" /></div>
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Serie</label><input value={form.series} onChange={e => handle('series', e.target.value)} className={s.inputCls} /></div>
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Emoji representativo</label><input value={form.emoji} onChange={e => handle('emoji', e.target.value)} className={s.inputCls} placeholder="🎨" /></div>
        <div><label className={`block text-sm font-medium mb-1 ${s.text}`}>Likes iniciales</label><input type="number" value={form.likes} onChange={e => handle('likes', parseInt(e.target.value))} className={s.inputCls} /></div>
        <div className="col-span-2"><label className={`block text-sm font-medium mb-1 ${s.text}`}>Gradiente CSS (fondo de la imagen)</label><input value={form.gradient} onChange={e => handle('gradient', e.target.value)} className={s.inputCls} placeholder="linear-gradient(135deg, #color1, #color2)" /></div>
        <div className="col-span-2">
          <div className="h-20 rounded-xl" style={{ background: form.gradient }}></div>
          <p className={`text-xs mt-1 ${s.textMuted}`}>Previsualización del gradiente</p>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} className="px-6 py-2 rounded-xl bg-neon-red text-white font-medium text-sm">💾 Guardar</button>
        <button onClick={onCancel} className={`px-6 py-2 rounded-xl text-sm ${s.textMuted}`}>Cancelar</button>
      </div>
    </div>
  );
}

function AdminGallery({ theme }: { theme: string }) {
  const columns: Column<GalleryImage>[] = [
    { key: 'title', label: 'Título' },
    { key: 'artist', label: 'Artista' },
    { key: 'series', label: 'Serie' },
    { key: 'likes', label: '❤️ Likes' },
  ];
  return <CrudSection<GalleryImage> title="Galería" icon="🎨" table="gallery" theme={theme} columns={columns} FormComponent={GalleryForm} orderBy="likes" />;
}

// ─── ADMIN FORO ───────────────────────────────────────────────
function AdminForum({ theme }: { theme: string }) {
  const s = useStyles(theme);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('forum_posts').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setPosts(data as ForumPost[]);
      setLoading(false);
    });
  }, []);

  const togglePin = async (post: ForumPost) => {
    await supabase.from('forum_posts').update({ pinned: !post.pinned }).eq('id', post.id);
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, pinned: !p.pinned } : p));
  };

  const deletePost = async (id: number) => {
    if (!confirm('¿Eliminar este post?')) return;
    await supabase.from('forum_posts').delete().eq('id', id);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div>
      <h1 className={`text-2xl font-bold mb-6 ${s.text}`}>💬 Moderar Foro</h1>
      {loading ? <div className={`text-center py-12 ${s.textMuted}`}>⏳ Cargando...</div> : (
        <div className={`rounded-2xl border overflow-hidden ${s.cardBg}`}>
          {posts.map((post, idx) => (
            <div key={post.id} className={`flex items-center gap-4 px-4 py-3 ${idx > 0 ? `border-t ${s.isDark ? 'border-dark-border' : 'border-light-border'}` : ''}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {post.pinned && <span className="text-xs bg-neon-red/10 text-neon-red px-2 py-0.5 rounded-full">📌 Fijado</span>}
                  <span className={`text-sm font-medium truncate ${s.text}`}>{post.title}</span>
                </div>
                <p className={`text-xs ${s.textMuted}`}>{post.author_name} · {post.category} · {post.replies} respuestas</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => togglePin(post)} className={`px-3 py-1 rounded-lg text-xs ${post.pinned ? 'bg-neon-red/10 text-neon-red' : `bg-gray-500/10 ${s.textMuted}`} hover:opacity-80`}>
                  📌 {post.pinned ? 'Desfijar' : 'Fijar'}
                </button>
                <button onClick={() => deletePost(post.id)} className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20">
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ADMIN USUARIOS ───────────────────────────────────────────
function AdminUsers({ theme }: { theme: string }) {
  const s = useStyles(theme);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('profiles').select('*').order('created_at').then(({ data }) => {
      if (data) setUsers(data as Profile[]);
      setLoading(false);
    });
  }, []);

  const changeRole = async (userId: string, newRole: 'user' | 'admin') => {
    if (!confirm(`¿Cambiar rol a "${newRole}"?`)) return;
    await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  return (
    <div>
      <h1 className={`text-2xl font-bold mb-6 ${s.text}`}>👥 Usuarios</h1>
      <p className={`text-sm mb-4 ${s.textMuted}`}>Gestiona roles de usuario. ⚠️ Ten cuidado al asignar rol admin.</p>
      {loading ? <div className={`text-center py-12 ${s.textMuted}`}>⏳ Cargando...</div> : (
        <div className={`rounded-2xl border overflow-hidden ${s.cardBg}`}>
          <table className="w-full text-sm">
            <thead className={s.surfaceBg}>
              <tr>
                <th className={`px-4 py-3 text-left font-medium ${s.textMuted}`}>Usuario</th>
                <th className={`px-4 py-3 text-left font-medium ${s.textMuted}`}>Rol actual</th>
                <th className={`px-4 py-3 text-left font-medium ${s.textMuted}`}>Registrado</th>
                <th className={`px-4 py-3 text-right font-medium ${s.textMuted}`}>Cambiar rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} className={`border-t ${s.isDark ? 'border-dark-border' : 'border-light-border'} ${idx % 2 === 0 ? '' : s.surfaceBg}`}>
                  <td className={`px-4 py-3 ${s.text}`}>
                    <span className="mr-2">{user.avatar}</span>
                    {user.username}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-neon-red/10 text-neon-red' : 'bg-gray-500/10 text-gray-400'}`}>
                      {user.role === 'admin' ? '⚙️ Admin' : '👤 Usuario'}
                    </span>
                  </td>
                  <td className={`px-4 py-3 ${s.textMuted}`}>
                    {new Date(user.created_at).toLocaleDateString('es')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {user.role === 'admin' ? (
                      <button onClick={() => changeRole(user.id, 'user')} className="px-3 py-1 rounded-lg bg-gray-500/10 text-gray-400 text-xs hover:bg-gray-500/20">
                        Quitar admin
                      </button>
                    ) : (
                      <button onClick={() => changeRole(user.id, 'admin')} className="px-3 py-1 rounded-lg bg-neon-red/10 text-neon-red text-xs hover:bg-neon-red/20">
                        Hacer admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className={`mt-3 text-xs ${s.textMuted}`}>{users.length} usuarios registrados</p>
    </div>
  );
}
