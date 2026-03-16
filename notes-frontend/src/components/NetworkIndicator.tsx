import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from './ThemeProvider';

export default function NetworkIndicator() {
  const isOnline = useStore(state => state.isOnline);
  const actionQueue = useStore(state => state.actionQueue);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [showRestored, setShowRestored] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
      setShowRestored(false);
    } else if (isOnline && wasOffline) {
      // Internet just came back! Show the success pill.
      setShowRestored(true);
      
      // Hide the success pill after 4 seconds
      const timer = setTimeout(() => {
        setShowRestored(false);
        setWasOffline(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  // If we are online and haven't just recovered from an outage, render nothing.
  if (isOnline && !showRestored) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -50, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="fixed top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none"
      >
        <div className={`flex items-center gap-3 px-5 py-2.5 rounded-full shadow-2xl backdrop-blur-2xl border ${
          !isOnline 
            ? (isDark ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-50 border-red-200 text-red-600')
            : (isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600')
        }`}>
          
          {!isOnline ? (
            <>
              <WifiOff size={16} className="animate-pulse" />
              <span className="text-sm font-medium tracking-wide">
                Offline Mode • Changes saving locally
              </span>
            </>
          ) : (
            <>
              <Wifi size={16} />
              <span className="text-sm font-medium tracking-wide">
                Internet Restored • Synced {actionQueue.length} items
              </span>
            </>
          )}
          
        </div>
      </motion.div>
    </AnimatePresence>
  );
}