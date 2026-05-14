import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { allContent } from '../data/content';
import ContentCard from '../components/ContentCard';
import { Heart, Bookmark, Check, Play, Edit, Save, X } from 'lucide-react';

export default function Profile() {
  const { isDark } = useTheme();
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'favorites' | 'watchlist' | 'completed' | 'watching'>('favorites');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editBio, setEditBio] = useState(user?.bio || '');

  if (!user) {
    navigate('/login');
    return null;
  }

  const tabs = [
    { id: 'favorites' as const, label: 'Favoritos', icon: Heart },
    { id: 'watchlist' as const, label: 'Por ver', icon: Bookmark },
    { id: 'watching' as const, label: 'Viendo', icon: Play },
    { id: 'completed' as const, label: 'Completados', icon: Check },
  ];

  const listItems = allContent.filter(c => user[activeTab].includes(c.id));

  const handleSave = () => {
    updateUser({ name: editName, bio: editBio });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Profile Header */}
      <div className={`rounded-2xl border p-6 md:p-8 mb-8 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover" />
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={`w-full max-w-xs px-3 py-2 rounded-xl border text-sm outline-none ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-text-light'}`}
                />
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={2}
                  className={`w-full max-w-md px-3 py-2 rounded-xl border text-sm outline-none resize-none ${isDark ? 'bg-dark-surface border-dark-border text-white' : 'bg-light-surface border-light-border text-text-light'}`}
                />
                <div className="flex gap-2">
                  <button onClick={handleSave} className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors flex items-center gap-1">
                    <Save className="w-3 h-3" /> Guardar
                  </button>
                  <button onClick={() => { setIsEditing(false); setEditName(user.name); setEditBio(user.bio); }} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${isDark ? 'bg-dark-surface text-text-muted-dark' : 'bg-light-surface text-text-muted-light'}`}>
                    <X className="w-3 h-3 inline" /> Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-text-light'}`}>{user.name}</h1>
                  <button onClick={() => setIsEditing(true)} className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-surface text-text-muted-dark' : 'hover:bg-light-surface text-text-muted-light'}`}>
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <p className={`text-sm mb-3 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>{user.bio}</p>
                <div className={`flex items-center gap-4 text-xs ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                  <span>Miembro desde {user.joined}</span>
                  <span>{user.favorites.length} favoritos</span>
                  <span>{user.completed.length} completados</span>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="px-4 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : isDark ? 'bg-dark-card text-text-muted-dark hover:bg-dark-surface' : 'bg-white text-text-muted-light hover:bg-light-surface border border-light-border'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${activeTab === tab.id ? 'bg-white/20' : isDark ? 'bg-dark-surface' : 'bg-light-surface'}`}>
              {user[tab.id].length}
            </span>
          </button>
        ))}
      </div>

      {/* Content Grid */}
      {listItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {listItems.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className={`text-center py-16 rounded-2xl border ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-text-light'}`}>No hay elementos</p>
          <p className={`text-sm ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
            Agrega contenido a esta lista desde las páginas de recomendaciones
          </p>
        </div>
      )}
    </div>
  );
}
