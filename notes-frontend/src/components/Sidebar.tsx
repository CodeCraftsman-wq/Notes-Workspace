// import { Folder, Plus, Sun, Moon, Inbox, Trash2 } from 'lucide-react';
// import { useTheme } from './ThemeProvider';
// import { useStore } from '../store/useStore';
// import { motion } from 'framer-motion';
// import { useUser } from '@clerk/clerk-react';

// export default function Sidebar() {
//   const { theme, setTheme } = useTheme();
//   const isDark = theme === 'dark';

//   // State from Zustand
//   const folders = useStore((state) => state.folders);
//   const activeFolderId = useStore((state) => state.activeFolderId);
//   const setActiveFolderId = useStore((state) => state.setActiveFolderId);
//   const addFolder = useStore((state) => state.addFolder);
//   const deleteFolder = useStore((state) => state.deleteFolder);

//   // User from Clerk
//   const { user } = useUser();

//   // Handle creating a new cloud-synced folder
//   const handleCreateFolder = () => {
//     // 1. Ensure the user is logged in before asking for a folder name
//     if (!user?.id) {
//       alert("You must be logged in to create a folder.");
//       return;
//     }

//     // 2. Ask for the folder name
//     const folderName = window.prompt('Enter new folder name:');
    
//     // 3. If they typed a name (and didn't hit cancel), save it to the cloud!
//     if (folderName && folderName.trim() !== '') {
//       addFolder(folderName.trim(), user.id); 
//     }
//   };

//   const folderItemClass = (isActive: boolean) => `
//     group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
//     ${isActive 
//       ? (isDark ? 'bg-yellow-500/20 text-yellow-500' : 'bg-yellow-100 text-yellow-700') 
//       : (isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-black/5')
//     }
//   `;

//   return (
//     <aside className={`w-56 flex-shrink-0 backdrop-blur-[40px] border-r hidden md:flex flex-col justify-between transition-all duration-500 z-10 ${
//       isDark ? 'bg-[#2c2c2e]/30 border-white/[0.05]' : 'bg-white/30 border-white/50'
//     }`}>
//       <div className="flex-1 overflow-y-auto p-4 pt-6 space-y-6">
        
//         {/* Top Level: All Notes */}
//         <div>
//           <div 
//             onClick={() => setActiveFolderId(null)}
//             className={folderItemClass(activeFolderId === null)}
//           >
//             <div className="flex items-center gap-3">
//               <Inbox size={18} className={activeFolderId === null ? "text-yellow-500" : (isDark ? "text-gray-400" : "text-gray-500")} />
//               <span className="text-sm font-medium">All Notes</span>
//             </div>
//           </div>
//         </div>

//         {/* User Folders Section */}
//         <div>
//           <div className="flex items-center justify-between px-2 mb-2 group">
//             <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider drop-shadow-sm"></h2>
//             <button 
//               onClick={handleCreateFolder}
//               className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${isDark ? 'hover:bg-white/20' : 'hover:bg-black/10'}`}
//               title="New Folder"
//             >
//               <Plus size={14} className="text-gray-500" />
//             </button>
//           </div>

//           <div className="space-y-0.5">
//             {folders.map(folder => (
//               <div 
//                 key={folder.id} 
//                 onClick={() => setActiveFolderId(folder.id)}
//                 className={folderItemClass(activeFolderId === folder.id)}
//               >
//                 <div className="flex items-center gap-3 overflow-hidden">
//                   <Folder size={18} className={activeFolderId === folder.id ? "text-yellow-500 fill-yellow-500/20" : "text-blue-400 fill-blue-400/20"} />
//                   <span className="text-sm font-medium truncate">{folder.name}</span>
//                 </div>
                

//                 {/* Delete Folder Button (Only shows on hover) */}
//                 {folder.id !== 'default' && (
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if(window.confirm(`Delete "${folder.name}" and all its notes?`)) deleteFolder(folder.id);
//                     }}
//                     className={`opacity-0 group-hover:opacity-100 p-1.5 rounded-md transition-colors ${
//                       isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-100 text-red-500'
//                     }`}
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>





//       {/* Theme Toggle at bottom */}
//       <div className={`p-4 border-t ${isDark ? 'border-white/[0.05]' : 'border-black/5'}`}>
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setTheme(isDark ? 'light' : 'dark')}
//           className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
//             isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'
//           }`}
//         >
//           {isDark ? <Sun size={18} /> : <Moon size={18} />}
//           {isDark ? 'Light Mode' : 'Dark Mode'}
//         </motion.button>
//       </div>
//     </aside>
//   );
// }


import { Folder, Plus, Sun, Moon, Inbox, Trash2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  // State from Zustand
  const folders = useStore((state) => state.folders);
  const activeFolderId = useStore((state) => state.activeFolderId);
  const setActiveFolderId = useStore((state) => state.setActiveFolderId);
  const addFolder = useStore((state) => state.addFolder);
  const deleteFolder = useStore((state) => state.deleteFolder);

  // User from Clerk
  const { user } = useUser();

  // Handle creating a new cloud-synced folder
  const handleCreateFolder = () => {
    // 1. Ensure the user is logged in before asking for a folder name
    if (!user?.id) {
      alert("You must be logged in to create a folder.");
      return;
    }

    // 2. Ask for the folder name
    const folderName = window.prompt('Enter new folder name:');
    
    // 3. If they typed a name (and didn't hit cancel), save it to the cloud!
    if (folderName && folderName.trim() !== '') {
      addFolder(folderName.trim(), user.id); 
    }
  };

  const folderItemClass = (isActive: boolean) => `
    group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
    ${isActive 
      ? (isDark ? 'bg-yellow-500/20 text-yellow-500' : 'bg-yellow-100 text-yellow-700') 
      : (isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-black/5')
    }
  `;

  return (
    <aside className={`w-56 flex-shrink-0 backdrop-blur-[40px] border-r hidden md:flex flex-col justify-between transition-all duration-500 z-10 ${
      isDark ? 'bg-[#2c2c2e]/30 border-white/[0.05]' : 'bg-white/30 border-white/50'
    }`}>
      <div className="flex-1 overflow-y-auto p-4 pt-6 space-y-6">
        
        {/* Top Level: All Notes */}
        <div>
          <div 
            onClick={() => setActiveFolderId(null)}
            className={folderItemClass(activeFolderId === null)}
          >
            <div className="flex items-center gap-3">
              <Inbox size={18} className={activeFolderId === null ? "text-yellow-500" : (isDark ? "text-gray-400" : "text-gray-500")} />
              <span className="text-sm font-medium">All Notes</span>
            </div>
          </div>
        </div>

        {/* User Folders Section */}
        <div>
          {/* ================= FOLDERS HEADER (NEW PREMIUM BUTTON) ================= */}
          <div className="flex items-center justify-between px-3 mb-3">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Folders
            </span>
            
            <button 
              onClick={handleCreateFolder}
              className={`p-1 rounded-md flex items-center justify-center transition-all duration-200 ${
                isDark 
                  ? 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 shadow-sm' 
                  : 'bg-black/5 text-gray-500 border border-black/5 hover:bg-black/10 hover:text-black hover:border-black/10 shadow-sm'
              }`}
              title="Create New Folder"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>

          <div className="space-y-0.5">
            {folders.map(folder => (
              <div 
                key={folder.id} 
                onClick={() => setActiveFolderId(folder.id)}
                className={folderItemClass(activeFolderId === folder.id)}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Folder size={18} className={activeFolderId === folder.id ? "text-yellow-500 fill-yellow-500/20" : "text-blue-400 fill-blue-400/20"} />
                  <span className="text-sm font-medium truncate">{folder.name}</span>
                </div>
                
                {/* Delete Folder Button (Only shows on hover) */}
                {folder.id !== 'default' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if(window.confirm(`Delete "${folder.name}" and all its notes?`)) deleteFolder(folder.id);
                    }}
                    className={`opacity-0 group-hover:opacity-100 p-1.5 rounded-md transition-colors ${
                      isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-100 text-red-500'
                    }`}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Theme Toggle at bottom */}
      <div className={`p-4 border-t ${isDark ? 'border-white/[0.05]' : 'border-black/5'}`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'
          }`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </motion.button>
      </div>
    </aside>
  );
}