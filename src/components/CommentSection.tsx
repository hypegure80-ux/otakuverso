import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { MessageCircle, ThumbsUp, Send, User } from 'lucide-react';
import type { Comment } from '../data/content';

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(`otakuverse-comments-${articleId}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const saveComments = (updated: Comment[]) => {
    setComments(updated);
    localStorage.setItem(`otakuverse-comments-${articleId}`, JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: 'c' + Date.now(),
      userId: user?.id || 'anon',
      userName: user?.name || 'Anónimo',
      userAvatar: user?.avatar || '',
      content: newComment.trim(),
      date: new Date().toISOString(),
      likes: 0,
    };

    saveComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLike = (commentId: string) => {
    if (likedComments.has(commentId)) return;
    const updated = comments.map(c =>
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    );
    saveComments(updated);
    setLikedComments(prev => new Set(prev).add(commentId));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className={`rounded-2xl border p-6 ${isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'}`}>
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-text-light'}`}>
          Comentarios ({comments.length})
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className={`flex gap-3 p-3 rounded-xl border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-light-surface border-light-border'}`}>
          {user ? (
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
          ) : (
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-dark-card' : 'bg-light-surface'}`}>
              <User className="w-4 h-4 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={user ? 'Escribe un comentario...' : 'Inicia sesión para comentar'}
              disabled={!user}
              rows={2}
              className={`w-full bg-transparent text-sm resize-none outline-none ${isDark ? 'text-white placeholder-gray-500' : 'text-text-light placeholder-gray-400'} ${!user ? 'cursor-not-allowed opacity-50' : ''}`}
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!user || !newComment.trim()}
                className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                <Send className="w-3 h-3" /> Enviar
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        <AnimatePresence>
          {comments.map((comment, i) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.05 }}
              className={`flex gap-3 p-4 rounded-xl ${isDark ? 'bg-dark-surface/50' : 'bg-light-surface/50'}`}
            >
              {comment.userAvatar ? (
                <img src={comment.userAvatar} alt={comment.userName} className="w-9 h-9 rounded-full object-cover shrink-0" />
              ) : (
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-dark-card' : 'bg-light-surface'}`}>
                  <User className="w-4 h-4 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-text-light'}`}>{comment.userName}</span>
                  <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
                  {comment.content}
                </p>
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-1 mt-2 text-xs transition-colors ${
                    likedComments.has(comment.id) ? 'text-primary' : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  <ThumbsUp className={`w-3 h-3 ${likedComments.has(comment.id) ? 'fill-primary' : ''}`} />
                  {comment.likes}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {comments.length === 0 && (
          <p className={`text-center text-sm py-8 ${isDark ? 'text-text-muted-dark' : 'text-text-muted-light'}`}>
            Sé el primero en comentar
          </p>
        )}
      </div>
    </div>
  );
}
