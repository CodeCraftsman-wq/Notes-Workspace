'use client';

import React, { useEffect } from 'react'; // Added useEffect
import { Search, Plus, Folder, Menu, X } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import NoteList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { UserButton, useUser } from "@clerk/clerk-react"; // Added useUser
import Sidebar from '../components/Sidebar';
import NetworkIndicator from '../components/NetworkIndicator';



export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const addNote = useStore((state) => state.addNote);
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const notes = useStore((state) => state.notes);
  const wordCount = useStore((state) => state.wordCount);
  const charCount = useStore((state) => state.charCount);

  const isMobileSidebarOpen = useStore((state) => state.isMobileSidebarOpen);
  const closeSidebar = useStore((state) => state.closeSidebar);

  // --- CLOUD SYNC LOGIC ---
  const { user } = useUser(); // Grab the logged-in user securely
  const fetchNotes = useStore(state => state.fetchNotes);

  const setOnlineStatus = useStore(state => state.setOnlineStatus);
  const isOnline = useStore(state => state.isOnline);


  // Automatically fetch notes from PostgreSQL when the app loads
  useEffect(() => {
    if (user?.id) {
      fetchNotes(user.id);
      useStore.getState().fetchFolders(user.id);
    }

  // Event listeners to detect Wi-Fi drops and connections
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [user?.id, fetchNotes, setOnlineStatus]);





  return (
    <div className={`flex flex-col h-screen w-full overflow-hidden font-sans transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-[#131318] via-[#1c1c22] to-[#0a0a0c] text-gray-100' 
        : 'bg-gradient-to-br from-[#d4d9ed] via-[#e2e6f3] to-[#f4f5fa] text-gray-900'
    }`}>

    <NetworkIndicator />



      {/* ================= CINEMATIC AMBIENT LIGHTING ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute w-[45vw] h-[45vw] rounded-full blur-[120px] animate-blob mix-blend-screen ${isDark ? 'bg-yellow-600/10' : 'bg-yellow-300/30'} -top-[10%] -left-[10%]`} />
        <div className={`absolute w-[40vw] h-[40vw] rounded-full blur-[120px] animate-blob mix-blend-screen ${isDark ? 'bg-orange-600/10' : 'bg-orange-300/30'} bottom-[10%] right-[-5%]`} style={{ animationDelay: '3s' }} />
        <div className={`absolute w-[30vw] h-[30vw] rounded-full blur-[100px] animate-blob mix-blend-screen ${isDark ? 'bg-amber-500/5' : 'bg-amber-200/40'} top-[40%] left-[30%]`} style={{ animationDelay: '5s' }} />
      </div>

      {/* ================= HEADER ================= */}
      <header className={`h-14 flex-shrink-0 flex items-center justify-between px-6 backdrop-blur-[40px] border-b transition-all duration-500 z-30 relative ${
        isDark ? 'bg-[#1c1c1e]/40 border-white/[0.05]' : 'bg-white/40 border-white/50'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-inner ${
            isDark ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-yellow-300 to-yellow-500'
          }`}>
            <span className="text-white font-bold text-lg leading-none">N</span>
          </div>
          <span className="font-semibold tracking-wide drop-shadow-sm">Notes Workspace</span>
        </div>

        <div className={`flex items-center pl-4 border-l ${isDark ? 'border-white/10' : 'border-gray-300'}`}>
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8 shadow-inner" 
              }
            }}
          />
        </div>
      </header>

      {/* ================= MAIN WORKSPACE ================= */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* MOBILE BACKDROP */}
        {isMobileSidebarOpen && (
          <div 
            onClick={closeSidebar}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          />
        )}

        {/* SIDEBAR WRAPPER */}
        <aside className={`
          absolute md:relative inset-y-0 left-0 z-50 flex h-full max-w-[90vw]
          transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] 
          ${isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0 md:shadow-none'}
        `}>

          {/* LEFT SIDEBAR */}
          <Sidebar />

          {/* NOTES COLUMN */}
          <section className={`w-72 flex-shrink-0 backdrop-blur-[30px] border-r flex flex-col transition-all duration-500 z-10 ${
            isDark 
              ? 'bg-[#1c1c1e]/50 border-white/[0.05] shadow-[1px_0_15px_rgba(0,0,0,0.1)]' 
              : 'bg-white/50 border-white/50 shadow-[1px_0_15px_rgba(0,0,0,0.02)]'
          }`}>
            <div className="p-4 pt-8 flex items-center justify-between">
              <h1 className="text-xl font-semibold drop-shadow-sm">Notes</h1>

              {/* NEW NOTE BUTTON (Updated to send user.id to backend) */}
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (user?.id) addNote(user.id);
                }} 
                className={`p-1 rounded-md transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/40'}`}
              >
                <Plus size={20} className="text-yellow-500 drop-shadow-sm" />
              </motion.button>
            </div>

            {/* SEARCH */}
            <div className="px-4 pb-2">
              <div className="relative">
                <Search size={16} className={`absolute left-2.5 top-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />

                <input 
                  type="text" 
                  placeholder="Search" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full text-sm rounded-md py-1.5 pl-8 pr-3 outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all backdrop-blur-md border ${
                    isDark 
                      ? 'bg-black/20 border-white/5 placeholder-gray-500' 
                      : 'bg-white/40 border-white/60 placeholder-gray-500 shadow-inner'
                  }`}
                />
              </div>
            </div>

            {/* NOTE LIST */}
            <div className="flex-1 overflow-y-auto mt-2">
              <NoteList />
            </div>
          </section>
        </aside>

        {/* EDITOR */}
        <main className={`flex-1 flex flex-col min-w-0 relative transition-all duration-500 z-20 ${
          isDark ? 'bg-[#1e1e1e]/95 backdrop-blur-xl' : 'bg-[#ffffff]/90 backdrop-blur-xl'
        }`}>
          <NoteEditor />
        </main>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className={`h-8 flex-shrink-0 flex items-center justify-between px-4 text-xs backdrop-blur-md border-t transition-all duration-500 z-30 ${
        isDark ? 'bg-[#151515]/60 border-white/[0.05] text-gray-500' : 'bg-[#e8eaf1]/60 border-white/50 text-gray-500'
      }`}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 hover:text-gray-400 cursor-pointer transition-colors">
            <Folder size={12} className="text-green-500" /> All notes synced
          </span>
          <span>{notes.length} Notes</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-400">
            {wordCount} Words | {charCount} Characters
          </span>
          <span className="cursor-pointer hover:text-gray-400 transition-colors">
            Markdown Supported
          </span>
        </div>
      </footer>

    </div>
  );
}