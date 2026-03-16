// import React from 'react';
// import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
// import Home from "./pages/Home";
// import { ThemeProvider } from "./components/ThemeProvider";
// import { motion, useReducedMotion } from 'framer-motion';

// // Industry-Polished App Shell
// // - Accessible: skip link, semantic regions, visible focus states
// // - Respect reduced-motion preferences
// // - Cleaner, responsive layout and refined visual system
// // - Tailwind utility classes — tweak tokens in your tailwind.config for global theme

// export default function App() {
//   const shouldReduceMotion = useReducedMotion();

//   const appear = shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 };
//   const initial = shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.995 };

//   return (
//     <ThemeProvider defaultTheme="system">
//       {/* Accessibility: skip link for keyboard users */}
//       <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-yellow-400 text-slate-900 px-3 py-2 rounded-md font-semibold">
//         Skip to content
//       </a>

//       {/* FULL WORKSPACE WHEN SIGNED IN */}
//       <SignedIn>
//         <Home />
//       </SignedIn>

//       {/* SPLIT-SCREEN / MINIMAL LOGIN WHEN SIGNED OUT */}
//       <SignedOut>
//         <div className="min-h-[100dvh] w-full bg-gradient-to-b from-slate-50 to-white flex flex-col text-slate-900 font-sans">

//           {/* Decorative grid + subtle vignette for a premium feel (non-interactive) */}
//           <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(249,250,251,0.7),transparent_40%)]" />

//           <header className="w-full flex items-center justify-between px-6 md:px-10 py-5 z-20">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
//                 <span className="text-white font-extrabold text-2xl tracking-tight">N</span>
//               </div>
//               <div className="hidden sm:block">
//                 <h2 className="text-sm font-bold">Notes Workspace</h2>
//                 <p className="text-xs text-slate-500">A calm, focused place for your ideas</p>
//               </div>
//             </div>

//             <nav aria-label="top" className="flex items-center gap-4">
//               <button className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition" aria-hidden>
//                 Contact Support
//               </button>

//               {/* Clerk automatic widget for sign-in / redirect can be used elsewhere. Keep header minimal. */}
//             </nav>
//           </header>

//           <main id="main" role="main" className="flex-1 flex items-center justify-center px-6 py-12">
//             <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

//               {/* LEFT: Brand messaging / features (visually strong, concise) */}
//               <section aria-labelledby="hero-heading" className="px-2">
//                 <motion.div initial={initial} animate={appear} transition={{ duration: 0.5 }} className="space-y-6">
//                   <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
//                     Notes Workspace — focused by design
//                   </h1>
//                   <p className="text-slate-600 text-sm sm:text-base max-w-xl">
//                     A fast, accessible note-taking workspace built with modern UX patterns, keyboard-first interactions and a polished visual system.
//                     Works great on mobile, tablet and desktop.
//                   </p>

//                   <ul className="mt-4 space-y-2 text-sm text-slate-600">
//                     <li>• Privacy-first — your content stays focused.</li>
//                     <li>• Lightweight editor with keyboard shortcuts.</li>
//                     <li>• Offline-first and sync-ready architecture.</li>
//                   </ul>

//                   <div className="mt-6 flex gap-3">
//                     <a href="#" className="inline-flex items-center px-4 py-2 rounded-lg font-semibold bg-slate-900 text-white shadow hover:scale-[0.995] transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300">
//                       Get started
//                     </a>
//                     <a href="#" className="inline-flex items-center px-4 py-2 rounded-lg font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200">
//                       Learn more
//                     </a>
//                   </div>
//                 </motion.div>
//               </section>

//               {/* RIGHT: Sign-in card (glass, compact, accessible) */}
//               <section aria-labelledby="signin-heading" className="flex items-center justify-center">
//                 <motion.div initial={initial} animate={appear} transition={{ duration: 0.45, delay: 0.06 }} className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-[0_18px_40px_-20px_rgba(2,6,23,0.12)]">

//                   <div className="mb-4">
//                     <h3 id="signin-heading" className="text-lg font-bold text-slate-900">Welcome back</h3>
//                     <p className="text-sm text-slate-600">Sign in to continue to your workspace</p>
//                   </div>

//                   {/* Clerk SignIn UI — appearance tuned for the card */}
//                   <div className="mt-2">
//                     <SignIn
//                       routing="hash"
//                       appearance={{
//                         variables: {
//                           colorPrimary: '#0f172a',
//                           fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
//                         },
//                         elements: {
//                           header: 'hidden',
//                           card: 'bg-transparent shadow-none border-none p-0',
//                           socialButtonsBlockButton: 'w-full h-11 rounded-xl border border-slate-200 font-semibold',
//                           dividerLine: 'bg-slate-100',
//                           dividerText: 'text-slate-400 text-xs font-semibold uppercase tracking-wide',
//                           formFieldLabel: 'text-slate-700 text-xs font-medium',
//                           formFieldInput: 'bg-slate-50 border border-slate-200 rounded-xl h-11 px-3 text-slate-900',
//                           formButtonPrimary: 'bg-slate-900 text-white rounded-xl h-11 font-bold',
//                           footerActionText: 'text-slate-500 text-xs',
//                           footerActionLink: 'text-slate-900 font-semibold'
//                         }
//                       }}
//                     />
//                   </div>

//                   <div className="mt-4 text-xs text-slate-500">
//                     By continuing you agree to our <a className="underline" href="#">Terms</a> and <a className="underline" href="#">Privacy Policy</a>.
//                   </div>
//                 </motion.div>
//               </section>

//             </div>
//           </main>

//           <footer className="w-full shrink-0 py-5 px-6 md:px-10 border-t border-slate-100 bg-white/60 backdrop-blur-sm">
//             <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
//               <p className="text-xs text-slate-600">© {new Date().getFullYear()} Crafted by <strong>Agnik Konar</strong></p>
//               <div className="flex items-center gap-3">
//                 <span className="text-[10px] font-bold uppercase tracking-wide text-slate-600">Systems Operational</span>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </SignedOut>
//     </ThemeProvider>
//   );
// }


// import React from 'react';
// import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
// import Home from "./pages/Home";
// import { ThemeProvider } from "./components/ThemeProvider";
// import { motion, useReducedMotion } from 'framer-motion';

// export default function App() {
//   const shouldReduceMotion = useReducedMotion();
//   const appear = shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 };
//   const initial = shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.98 };

//   return (
//     <ThemeProvider defaultTheme="system">
//       {/* Accessibility: skip link for keyboard users */}
//       <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-yellow-400 text-slate-900 px-3 py-2 rounded-md font-semibold">
//         Skip to content
//       </a>

//       {/* FULL WORKSPACE WHEN SIGNED IN */}
//       <SignedIn>
//         <Home />
//       </SignedIn>

//       {/* SIGNED OUT: INDUSTRY-STANDARD SPLIT LAYOUT */}
//       <SignedOut>
//         <div className="flex flex-col h-[100dvh] w-full bg-[#fbfcff] text-slate-900 font-sans overflow-hidden">
          
//           {/* Premium Ambient Glow */}
//           <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(250,204,21,0.12),transparent_50%)]" />

//           {/* Minimal Header */}
//           <header className="w-full shrink-0 flex items-center justify-between px-8 py-6 z-20">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-md border border-yellow-300/50">
//                 <span className="text-white font-extrabold text-xl tracking-tight">N</span>
//               </div>
//               <span className="font-bold text-slate-900 tracking-tight text-lg">Notes Workspace</span>
//             </div>
//             <nav aria-label="top" className="flex items-center">
//               <span className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer">
                
//               </span>
//             </nav>
//           </header>

//           {/* Main Content Area */}
//           <main id="main" role="main" className="flex-1 flex items-center justify-center px-6 lg:px-12 z-10 overflow-y-auto">
//             <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              
//               {/* LEFT: Massive Branding & Attraction Point */}
//               <motion.section 
//                 initial={initial} 
//                 animate={appear} 
//                 transition={{ duration: 0.6, ease: "easeOut" }} 
//                 className="flex flex-col items-start"
//               >
//                 {/* Giant Logo */}
//                 <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[2rem] bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-[0_20px_50px_-15px_rgba(234,179,8,0.5)] border border-yellow-300 mb-8 relative">
//                   <div className="absolute inset-0 rounded-[2rem] border border-white/40 pointer-events-none"></div>
//                   <span className="text-white font-black text-5xl sm:text-7xl tracking-tighter drop-shadow-sm">N</span>
//                 </div>
                
//                 {/* Giant Typography */}
//                 <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6">
//                   Notes <br className="hidden lg:block" /> Workspace.
//                 </h1>
                
//                 <p className="text-slate-500 text-lg sm:text-xl max-w-md font-medium leading-relaxed">
//                   Notes Application
//                 </p>
//               </motion.section>



//               {/* RIGHT: Pristine Glass Login Card */}
//               <motion.section 
//                 initial={initial} 
//                 animate={appear} 
//                 transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }} 
//                 className="flex justify-center lg:justify-end w-full"
//               >
//                 <div className="w-full max-w-[420px] bg-white/80 backdrop-blur-2xl rounded-[24px] border border-slate-200/60 p-6 sm:p-8 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.08)] relative">
//                   <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/60 pointer-events-none" />
                  
//                   <SignIn
//                     routing="hash"
//                     appearance={{
//                       variables: {
//                         colorPrimary: '#0f172a',
//                         fontFamily: 'Inter, system-ui, sans-serif',
//                       },
//                       elements: {
//                         header: 'hidden',
//                         card: 'bg-transparent shadow-none border-none p-0',
//                         socialButtonsBlockButton: 'w-full h-12 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm',
//                         dividerLine: 'bg-slate-100',
//                         dividerText: 'text-slate-400 text-[10px] font-extrabold uppercase tracking-widest',
//                         formFieldLabel: 'text-slate-700 text-xs font-bold mb-1.5',
//                         formFieldInput: 'bg-slate-50 border border-slate-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 rounded-xl h-12 px-4 text-slate-900 transition-all shadow-sm',
//                         formButtonPrimary: 'bg-slate-900 hover:bg-black text-white rounded-xl h-12 font-bold transition-all active:scale-[0.98] shadow-md',
//                         footerActionText: 'text-slate-500 font-medium',
//                         footerActionLink: 'text-slate-900 hover:text-yellow-600 font-extrabold transition-colors'
//                       }
//                     }}
//                   />
//                 </div>
//               </motion.section>

//             </div>
//           </main>


//           {/* Anchored Footer */}
//           <footer className="w-full shrink-0 py-5 px-8 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 bg-white/50 backdrop-blur-md z-20">
//             <p className="text-xs font-medium text-slate-500">
//               © {new Date().getFullYear()} Crafted by <span className="font-bold text-slate-900">Agnik Konar</span>
//             </p>
//             <div className="flex items-center gap-2 mt-3 sm:mt-0 bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-sm">
//               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20"></div>
//               <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Systems Operational</span>
//             </div>
//           </footer>
          
//         </div>
//       </SignedOut>
//     </ThemeProvider>
//   );
// }



import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      
      {/* Show the Notion-style landing page when the user is logged out */}
      <SignedOut>
        <LandingPage />
      </SignedOut>

      {/* Show the main app workspace when they successfully log in */}
      <SignedIn>
        <Home />
      </SignedIn>
      
    </ThemeProvider>
  );
}