import NoteCard from './NoteCard';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function NoteList() {
  // Only one set of these hooks!
  const notes = useStore((state) => state.notes);
  const activeNoteId = useStore((state) => state.activeNoteId);
  const setActiveNoteId = useStore((state) => state.setActiveNoteId);
  const searchQuery = useStore((state) => state.searchQuery);
  const activeFolderId = useStore((state) => state.activeFolderId); 

  // ---> MERGED FILTER LOGIC <---
  const filteredNotes = notes.filter((note) => {
    // 1. Does it match the search bar?
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Does it belong to the currently clicked folder?
    // (If activeFolderId is null, it means we are in "All Notes", so we show everything)
    const matchesFolder = activeFolderId === null || note.folderId === activeFolderId;

    // 3. Keep the note only if it passes BOTH tests
    return matchesSearch && matchesFolder;
  });

  if (filteredNotes.length === 0) {
    return <p className="text-center text-sm text-gray-400 mt-10">No notes found</p>;
  }

  return (
    <div className="flex flex-col px-3 pb-4 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {filteredNotes.map((note) => (
          <NoteCard 
            key={note.id} 
            note={note} 
            isActive={activeNoteId === note.id}
            onClick={() => setActiveNoteId(note.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}