// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import type { Note } from '../types/Note'; 




// export interface Folder {
//   id: string;
//   name: string;
//   createdAt: number;
// }


// interface NoteStore {
//   // Data State
//   notes: Note[];
//   folders: Folder[];
//   activeNoteId: string | null;
//   activeFolderId: string | null; // 'null' means "All Notes"
//   searchQuery: string;
//   wordCount: number;
//   charCount: number;
  
//   // Mobile UI State
//   isMobileSidebarOpen: boolean;
//   toggleSidebar: () => void;
//   closeSidebar: () => void;
  
//   // Actions
//   setActiveNoteId: (id: string | null) => void;
//   setActiveFolderId: (id: string | null) => void;
//   setSearchQuery: (query: string) => void;
//   setEditorStats: (words: number, chars: number) => void;
  
//   addFolder: (name: string) => void;
//   deleteFolder: (id: string) => void;
  
//   addNote: () => void;
//   updateNote: (id: string, updates: Partial<Note>) => void;
//   deleteNote: (id: string) => void;
// }




// // 2. THE STORE
// export const useStore = create<NoteStore>()(
//   persist(
//     (set, get) => ({
//       // --- Initial State ---
//       notes: [],
//       folders: [{ id: 'default', name: 'Notes', createdAt: Date.now() }],
//       activeNoteId: null,
//       activeFolderId: null,
//       searchQuery: '',
//       wordCount: 0,
//       charCount: 0,
//       isMobileSidebarOpen: false,



//       // --- Mobile UI Actions ---
//       toggleSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
//       closeSidebar: () => set({ isMobileSidebarOpen: false }),

//       // --- Core Actions ---
//       setActiveNoteId: (id) => set({ activeNoteId: id }),
      
//       setActiveFolderId: (id) => set({ activeFolderId: id, activeNoteId: null }),
      
//       setSearchQuery: (query) => set({ searchQuery: query }),
      
//       setEditorStats: (words, chars) => set({ wordCount: words, charCount: chars }),

//       addFolder: (name) => set((state) => ({
//         folders: [...state.folders, { id: crypto.randomUUID(), name, createdAt: Date.now() }]
//       })),

//       deleteFolder: (id) => set((state) => ({
//         folders: state.folders.filter(f => f.id !== id),
//         activeFolderId: state.activeFolderId === id ? null : state.activeFolderId,
//         notes: state.notes.filter(n => n.folderId !== id)
//       })),

//       addNote: () => set((state) => {
//         const newNote = {
//           id: crypto.randomUUID(),
//           title: 'New Note',
//           content: '',
//           updatedAt: Date.now(),
//           folderId: state.activeFolderId, 
//         } as Note; 
        
//         return {
//           notes: [newNote, ...state.notes],
//           activeNoteId: newNote.id,
//           isMobileSidebarOpen: false, 
//         };
//       }),

//       updateNote: (id, updates) => set((state) => {
//         const updatedNotes = state.notes.map((note) =>
//           note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note
//         );
        
//         updatedNotes.sort((a, b) => b.updatedAt - a.updatedAt);
        
//         return { notes: updatedNotes };
//       }),

//       deleteNote: (id) => set((state) => {
//         const filteredNotes = state.notes.filter((note) => note.id !== id);
//         return {
//           notes: filteredNotes,
//           activeNoteId: state.activeNoteId === id ? (filteredNotes[0]?.id || null) : state.activeNoteId,
//         };
//       }),
//     }),
//     { name: 'notes-storage' }
//   )
// );





// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import type { Note } from '../types/Note'; 


// export interface Folder {
//   id: string;
//   name: string;
//   createdAt: number;
// }

// interface NoteStore {
//   // Data State
//   notes: Note[];
//   folders: Folder[];
//   activeNoteId: string | null;
//   activeFolderId: string | null; 
//   searchQuery: string;
//   wordCount: number;
//   charCount: number;
  
  
//   // Mobile UI State
//   isMobileSidebarOpen: boolean;
//   toggleSidebar: () => void;
//   closeSidebar: () => void;
  
//   // Actions
//   setActiveNoteId: (id: string | null) => void;
//   setActiveFolderId: (id: string | null) => void;
//   setSearchQuery: (query: string) => void;
//   setEditorStats: (words: number, chars: number) => void;
  
//   addFolder: (name: string) => void;
//   deleteFolder: (id: string) => void;
  
//   // --- NEW CLOUD SYNC ACTIONS ---
//   fetchNotes: (userId: string) => Promise<void>;
//   fetchFolders: (userId: string) => Promise<void>;
//   addNote: (userId: string) => Promise<void>;
//   updateNote: (id: string, updates: Partial<Note>) => void;
//   deleteNote: (id: string) => void;
// }

// const API_URL = 'http://localhost:5000/api/notes';

// export const useStore = create<NoteStore>()(
//   persist(
//     (set, get) => ({
//       // --- Initial State ---
//       notes: [],
//       folders: [{ id: 'default', name: 'Notes', createdAt: Date.now() }],
//       activeNoteId: null,
//       activeFolderId: null,
//       searchQuery: '',
//       wordCount: 0,
//       charCount: 0,
//       isMobileSidebarOpen: false,

//       // --- Mobile UI Actions ---
//       toggleSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
//       closeSidebar: () => set({ isMobileSidebarOpen: false }),

//       // --- Core Actions ---
//       setActiveNoteId: (id) => set({ activeNoteId: id }),
//       setActiveFolderId: (id) => set({ activeFolderId: id, activeNoteId: null }),
//       setSearchQuery: (query) => set({ searchQuery: query }),
//       setEditorStats: (words, chars) => set({ wordCount: words, charCount: chars }),

//       // 1. Fetch Folders from Cloud
//       fetchFolders: async (userId: string) => {
//         try {
//           const res = await fetch(`http://localhost:5000/api/folders?userId=${userId}`);
//           if (res.ok) {
//             const cloudFolders = await res.json();
//             // We keep the "default" Notes folder, and add the cloud ones!
//             set({ folders: [{ id: 'default', name: 'Notes', createdAt: Date.now() }, ...cloudFolders] });
//           }
//         } catch (error) {
//           console.error("Failed to fetch folders:", error);
//         }
//       },


//       // 2. Create Folder in Cloud
//       addFolder: async (name: string, userId: string) => {
//         const newFolderId = crypto.randomUUID();
        
//         set((state) => ({
//           folders: [...state.folders, { id: newFolderId, name, createdAt: Date.now() }],
//           activeFolderId: newFolderId // This automatically selects the new folder!
//         }));

//         // BACKGROUND SYNC: Send to Postgres
//         try {
//           await fetch('http://localhost:5000/api/folders', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ id: newFolderId, name, userId })
//           });
//         } catch (error) {
//           console.error("Failed to sync folder:", error);
//         }
//       },



//       // 3. Delete Folder in Cloud
//       deleteFolder: async (id: string) => {
        
//         set((state) => ({
//           folders: state.folders.filter(f => f.id !== id),
//           activeFolderId: state.activeFolderId === id ? null : state.activeFolderId,
//           notes: state.notes.map(n => n.folderId === id ? { ...n, folderId: null } : n)
//         }));

//         try {
//           await fetch(`http://localhost:5000/api/folders/${id}`, {
//             method: 'DELETE'
//           });
//         } catch (error) {
//           console.error("Failed to delete folder in cloud:", error);
//         }
//       },




//       // CLOUD SYNC 
//       fetchNotes: async (userId: string) => {
//         try {
//           const res = await fetch(`${API_URL}?userId=${userId}`);
//           if (res.ok) {
//             const cloudNotes = await res.json();
//             set({ notes: cloudNotes });
//           }
//         } catch (error) {
//           console.error("Failed to fetch notes from cloud:", error);
//         }
//       },


//       addNote: async (userId: string) => {
//         try {
         
//           const currentFolderId = get().activeFolderId;
        
//           const res = await fetch(API_URL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ 
//               title: 'New Note', 
//               content: '', 
//               userId: userId,
//               folderId: currentFolderId 
//             })
//           });
          
//           if (res.ok) {
//             const newCloudNote = await res.json();
//             set((state) => ({
//               notes: [newCloudNote, ...state.notes],
//               activeNoteId: newCloudNote.id,
//               isMobileSidebarOpen: false, 
//             }));
//           }
//         } catch (error) {
//           console.error("Failed to create note:", error);
//         }
//       },



//       updateNote: (id, updates) => {
       
//         set((state) => {
//           const updatedNotes = state.notes.map((note) =>
//             note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note
//           );
//           updatedNotes.sort((a, b) => b.updatedAt - a.updatedAt);
//           return { notes: updatedNotes };
//         });

      
//         fetch(`${API_URL}/${id}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(updates)
//         }).catch(err => console.error("Failed to sync update:", err));
//       },

//       deleteNote: (id) => {
//         // 1. OPTIMISTIC UI: Instantly remove from screen
//         set((state) => {
//           const filteredNotes = state.notes.filter((note) => note.id !== id);
//           return {
//             notes: filteredNotes,
//             activeNoteId: state.activeNoteId === id ? (filteredNotes[0]?.id || null) : state.activeNoteId,
//           };
//         });

//         // 2. BACKGROUND SYNC: Silently tell PostgreSQL to delete it
//         fetch(`${API_URL}/${id}`, {
//           method: 'DELETE'
//         }).catch(err => console.error("Failed to delete note:", err));
//       },
//     }),
//     { name: 'notes-storage' } 
//   )
// );



import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note } from '../types/Note'; 

export interface Folder {
  id: string;
  name: string;
  createdAt: number;
}

// 1. Define what a queued action looks like
interface SyncAction {
  id: string;
  url: string;
  method: 'POST' | 'PUT' | 'DELETE';
  body?: any;
}

interface NoteStore {
  notes: Note[];
  folders: Folder[];
  activeNoteId: string | null;
  activeFolderId: string | null; 
  searchQuery: string;
  wordCount: number;
  charCount: number;
  isMobileSidebarOpen: boolean;
  
  // --- OFFLINE STATE ---
  isOnline: boolean;
  actionQueue: SyncAction[];
  setOnlineStatus: (status: boolean) => void;
  processQueue: () => Promise<void>;
  
  // Actions
  toggleSidebar: () => void;
  closeSidebar: () => void;
  setActiveNoteId: (id: string | null) => void;
  setActiveFolderId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setEditorStats: (words: number, chars: number) => void;
  
  fetchNotes: (userId: string) => Promise<void>;
  fetchFolders: (userId: string) => Promise<void>;
  addFolder: (name: string, userId: string) => void;
  deleteFolder: (id: string) => void;
  addNote: (userId: string) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}

const API_URL = 'http://localhost:5000/api/notes';

export const useStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      notes: [],
      folders: [{ id: 'default', name: 'Notes', createdAt: Date.now() }],
      activeNoteId: null,
      activeFolderId: null,
      searchQuery: '',
      wordCount: 0,
      charCount: 0,
      isMobileSidebarOpen: false,

      // --- OFFLINE LOGIC ---
      isOnline: navigator.onLine,
      actionQueue: [],
      
      setOnlineStatus: (status) => {
        set({ isOnline: status });
        if (status === true) {
          get().processQueue(); 
        }
      },

      processQueue: async () => {
        const queue = get().actionQueue;
        if (queue.length === 0) return;

        console.log(`📡 Internet restored! Processing ${queue.length} offline actions...`);
        
        for (const action of queue) {
          try {
            await fetch(action.url, {
              method: action.method,
              headers: { 'Content-Type': 'application/json' },
              body: action.body ? JSON.stringify(action.body) : undefined
            });
          } catch (error) {
            console.error("Failed to sync queued action:", action, error);
          }
        }
        
        // Clear the queue after successful sync
        set({ actionQueue: [] });
      },

      // --- UI ACTIONS ---
      toggleSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
      closeSidebar: () => set({ isMobileSidebarOpen: false }),
      setActiveNoteId: (id) => set({ activeNoteId: id }),
      setActiveFolderId: (id) => set({ activeFolderId: id, activeNoteId: null }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setEditorStats: (words, chars) => set({ wordCount: words, charCount: chars }),

      // --- CLOUD & OFFLINE SYNC ACTIONS ---
      fetchNotes: async (userId) => {
        if (!get().isOnline) return; // Don't fetch if offline
        try {
          const res = await fetch(`${API_URL}?userId=${userId}`);
          if (res.ok) set({ notes: await res.json() });
        } catch (error) { console.error(error); }
      },

      fetchFolders: async (userId) => {
        if (!get().isOnline) return;
        try {
          const res = await fetch(`http://localhost:5000/api/folders?userId=${userId}`);
          if (res.ok) {
            const cloudFolders = await res.json();
            set({ folders: [{ id: 'default', name: 'Notes', createdAt: Date.now() }, ...cloudFolders] });
          }
        } catch (error) { console.error(error); }
      },

      addFolder: (name, userId) => {
        const newFolderId = crypto.randomUUID();
        set((state) => ({
          folders: [...state.folders, { id: newFolderId, name, createdAt: Date.now() }],
          activeFolderId: newFolderId
        }));

        const payload = { id: newFolderId, name, userId };
        
        if (get().isOnline) {
          fetch('http://localhost:5000/api/folders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        } else {
          set(state => ({ actionQueue: [...state.actionQueue, { id: crypto.randomUUID(), url: 'http://localhost:5000/api/folders', method: 'POST', body: payload }] }));
        }
      },

      deleteFolder: (id) => {
        set((state) => ({
          folders: state.folders.filter(f => f.id !== id),
          activeFolderId: state.activeFolderId === id ? null : state.activeFolderId,
          notes: state.notes.map(n => n.folderId === id ? { ...n, folderId: null } : n)
        }));

        const url = `http://localhost:5000/api/folders/${id}`;
        if (get().isOnline) {
          fetch(url, { method: 'DELETE' });
        } else {
          set(state => ({ actionQueue: [...state.actionQueue, { id: crypto.randomUUID(), url, method: 'DELETE' }] }));
        }
      },

      addNote: (userId) => {
        const newNoteId = crypto.randomUUID();
        const currentFolderId = get().activeFolderId;
        
        // 1. Instantly update UI (Optimistic)
        const newNote = { id: newNoteId, title: 'New Note', content: '', updatedAt: Date.now(), folderId: currentFolderId, userId } as Note;
        set((state) => ({ notes: [newNote, ...state.notes], activeNoteId: newNote.id, isMobileSidebarOpen: false }));

        const payload = { id: newNoteId, title: 'New Note', content: '', userId, folderId: currentFolderId };

        // 2. Network Check
        if (get().isOnline) {
          fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        } else {
          set(state => ({ actionQueue: [...state.actionQueue, { id: crypto.randomUUID(), url: API_URL, method: 'POST', body: payload }] }));
        }
      },

      updateNote: (id, updates) => {
        set((state) => {
          const updatedNotes = state.notes.map((note) => note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note);
          updatedNotes.sort((a, b) => b.updatedAt - a.updatedAt);
          return { notes: updatedNotes };
        });

        const url = `${API_URL}/${id}`;
        if (get().isOnline) {
          fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
        } else {
          // Update the queue instead of fetching!
          set(state => ({ actionQueue: [...state.actionQueue, { id: crypto.randomUUID(), url, method: 'PUT', body: updates }] }));
        }
      },

      deleteNote: (id) => {
        set((state) => {
          const filteredNotes = state.notes.filter((note) => note.id !== id);
          return { notes: filteredNotes, activeNoteId: state.activeNoteId === id ? (filteredNotes[0]?.id || null) : state.activeNoteId };
        });

        const url = `${API_URL}/${id}`;
        if (get().isOnline) {
          fetch(url, { method: 'DELETE' });
        } else {
          set(state => ({ actionQueue: [...state.actionQueue, { id: crypto.randomUUID(), url, method: 'DELETE' }] }));
        }
      },
    }),
    { name: 'notes-storage' }
  )
);