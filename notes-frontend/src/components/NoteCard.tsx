import type { Note } from '../types/Note'; // (Make sure the casing matches your file, usually 'note' is lowercase)
import { format } from 'date-fns';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

interface NoteCardProps {
  note: Note;
  isActive: boolean;
  onClick: () => void;
}

export default function NoteCard({ note, isActive, onClick }: NoteCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const previewText = note.content.replace(/<[^>]*>?/gm, '') || 'No additional text';

  return (
    <motion.div 
      layout /* This makes the cards smoothly slide into place when others are deleted */
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        group p-3 mb-1.5 rounded-xl cursor-pointer transition-all duration-200 ease-out border
        ${isActive 
          ? (isDark 
              ? 'bg-yellow-500/10 border-yellow-500/30 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]' 
              : 'bg-yellow-100 border-yellow-300 shadow-[inset_0_1px_5px_rgba(0,0,0,0.05)]')
          : (isDark 
              ? 'bg-transparent border-transparent hover:bg-white/5' 
              : 'bg-transparent border-transparent hover:bg-black/5')
        }
      `}
    >
      <h3 className={`font-semibold truncate transition-colors ${
        isActive 
          ? (isDark ? 'text-yellow-500' : 'text-yellow-900') 
          : (isDark ? 'text-gray-100' : 'text-gray-900')
      }`}>
        {note.title || "New Note"}
      </h3>
      
      <div className="flex items-center gap-2 mt-1">
        <span className={`text-xs shrink-0 font-medium transition-colors ${
          isActive 
            ? (isDark ? 'text-yellow-500/80' : 'text-yellow-700') 
            : (isDark ? 'text-gray-400' : 'text-gray-500')
        }`}>
          {format(note.updatedAt, 'h:mm a')}
        </span>
        <p className={`text-xs truncate transition-colors ${
          isActive 
            ? (isDark ? 'text-yellow-500/60' : 'text-yellow-600') 
            : (isDark ? 'text-gray-500' : 'text-gray-400')
        }`}>
          {previewText}
        </p>
      </div>
    </motion.div>
  );
}