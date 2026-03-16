import React from 'react';
import { motion } from 'framer-motion';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Edit3, WifiOff, CloudLightning, Shield, ChevronRight, Layout } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';

export default function LandingPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const features = [
    {
      icon: <WifiOff className="text-yellow-500" size={24} />,
      title: 'Offline-First Architecture',
      description:
        'Keep writing even when the Wi-Fi drops. Your data saves locally and automatically syncs the second you reconnect.',
    },
    {
      icon: <CloudLightning className="text-blue-500" size={24} />,
      title: 'Instant PostgreSQL Sync',
      description:
        'Powered by a high-performance Neon database, your workspace is instantly available across all your devices.',
    },
    {
      icon: <Shield className="text-emerald-500" size={24} />,
      title: 'Enterprise-Grade Security',
      description:
        'Your data is locked down with industry-standard authentication, ensuring your private notes stay private.',
    },
  ];

  return (
    <div
      className={`h-screen w-full overflow-y-auto overflow-x-hidden font-sans transition-colors duration-500 relative flex flex-col ${
        isDark ? 'bg-[#0B0F19] text-white' : 'bg-[#F7F7F5] text-gray-900'
      }`}
    >
      {/* ================= NOTION-STYLE SPOTLIGHT & GRID ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top Center Spotlight - Changed to a warm yellow/orange glow */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[150px] opacity-60 mix-blend-screen ${
            isDark ? 'bg-yellow-600/20' : 'bg-yellow-300/30'
          }`}
        />

        {/* Subtle background grid pattern */}
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTUwLCAxNTAsIDE1MCwgMC4yKSIvPjwvc3ZnPg==')] opacity-[0.15]`}
        />
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Yellow Gradient Logo */}
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-inner ${
              isDark ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-yellow-300 to-yellow-500'
            }`}
          >
            <span className="text-white font-bold text-lg leading-none">N</span>
          </div>
          <span className="font-semibold tracking-wide text-lg">Notes</span>
        </div>
        <div className="flex items-center gap-6">
          <SignInButton mode="modal">
            <button
              className={`text-sm font-medium transition-colors ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Log in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            {/* Yellow Get Started Button */}
            <button className="text-sm font-medium bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors shadow-sm">
              Get Notes free
            </button>
          </SignUpButton>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <main className="relative z-10 flex flex-col items-center justify-start pt-20 px-6 text-center max-w-5xl mx-auto w-full flex-shrink-0">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
            Write, plan, and organize. <br className="hidden md:block" />
            {/* Yellow Gradient Text for the highlight */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              All in one place.
            </span>
          </h1>
          <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            The connected workspace where better, faster work happens. Powered by an offline-first architecture and
            instant cloud sync.
          </p>

          <div className="flex items-center justify-center gap-4">
            <SignUpButton mode="modal">
              {/* Yellow Hero CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-yellow-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-500/25 mx-auto"
                aria-label="Get Notes free"
              >
                <Edit3 size={20} />
                Get Notes free
                <ChevronRight size={20} />
              </motion.button>
            </SignUpButton>
          </div>
        </motion.div>

        {/* ================= APP PREVIEW WINDOW ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full mt-16 relative"
        >
          <div
            className={`w-full rounded-2xl overflow-hidden border shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col ${
              isDark ? 'bg-[#1c1c1e] border-white/10' : 'bg-white border-gray-200'
            }`}
          >
            {/* Mac Window Header */}
            <div className={`h-12 w-full flex items-center px-4 gap-2 border-b ${isDark ? 'bg-[#2c2c2e] border-white/5' : 'bg-gray-100 border-gray-200'}`}>
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="flex-1 flex justify-center">
                <div className={`px-4 py-1 rounded-md text-xs font-medium flex items-center gap-2 ${isDark ? 'bg-black/20 text-gray-400' : 'bg-white text-gray-500 shadow-sm'}`}>
                  <Layout size={12} /> workspace.notes.app
                </div>
              </div>
            </div>

            {/* App Screenshot Image */}
            <div className="relative w-full aspect-[16/9] bg-black/5 overflow-hidden">
              <img
                src="/app-preview.png"
                alt="App Workspace Preview"
                className="w-full h-full object-contain object-center"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = 'none';
                  const parent = img.parentElement;
                  if (parent) {
                    parent.classList.add('bg-gradient-to-br', 'from-yellow-500/20', 'to-orange-500/20');
                  }
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                <span className="text-sm font-medium"></span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ================= FEATURES GRID ================= */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 mt-10 flex-shrink-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineered for speed.</h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Built with a modern stack so you never lose a single keystroke.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-2xl border transition-all duration-300 ${
                isDark ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]' : 'bg-white border-gray-100 hover:shadow-xl'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        className={`relative z-10 w-full border-t py-12 px-6 mt-auto flex-shrink-0 ${
          isDark ? 'border-white/10 bg-[#06080D]' : 'border-gray-200 bg-gray-50'
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* Yellow Footer Logo */}
              <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                isDark ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-yellow-300 to-yellow-500'
              }`}>
                <span className="font-bold text-xs text-white">N</span>
              </div>
              <span className="font-semibold">Notes</span>
            </div>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              The modern workspace for your thoughts and projects.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className={`text-sm space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Features</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Security</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className={`text-sm space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Community</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className={`text-sm space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">About</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-yellow-500 cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        </div>

        <div
          className={`max-w-7xl mx-auto mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-xs ${
            isDark ? 'border-white/10 text-gray-600' : 'border-gray-200 text-gray-400'
          }`}
        >
          <p>© {new Date().getFullYear()} Notes Workspace. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}