import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, TrendingUp, Settings as SettingsIcon } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/portfolio', label: 'Portfolio', icon: Wallet },
    { path: '/market', label: 'Market', icon: TrendingUp },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#00FF66] selection:text-black overflow-hidden relative">
      {/* Navigation Rail (Desktop) */}
      <nav className="w-20 border-r border-white/10 hidden md:flex flex-col items-center py-10 gap-12 overflow-y-auto no-scrollbar shrink-0">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
          <div className="w-5 h-5 bg-black rotate-45"></div>
        </div>
        
        <div className="flex flex-col gap-12 mt-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `group cursor-pointer relative py-4 transition-all ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.3em] font-black whitespace-nowrap rotate-180">
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="active-rail-indicator"
                      className="absolute -left-6 top-0 bottom-0 w-1 bg-[#00FF66]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
        
        <div className="mt-auto flex flex-col gap-6 shrink-0">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-black">AR</div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-t border-white/10 px-4 py-2 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center p-2 transition-all ${
                  isActive ? 'text-[#00FF66]' : 'text-white/30'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Right Sidebar: Trade Config (Large Screens Only) */}
      <aside className="w-72 border-l border-white/10 p-8 flex flex-col shrink-0 hidden xl:flex bg-[#050505]/50 backdrop-blur-xl">
        <div className="mb-12">
          <h2 className="label-bold mb-8">Trade Config</h2>
          <div className="space-y-8">
            <SidebarItem label="Slippage" value="0.5%" active />
            <SidebarItem label="Auto-Execute" isToggle active />
            <SidebarItem label="Gas Limit" value="320 GWEI" />
          </div>
        </div>

        <div className="mt-auto">
          <div className="border border-dashed border-white/20 flex flex-col items-center justify-center p-6 text-center group hover:border-[#00FF66] cursor-pointer transition-colors">
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-black mb-4 italic">Scan to Link</p>
            <div className="w-16 h-16 bg-white flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-black border-dotted"></div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white text-black p-6 flex flex-col">
          <p className="text-[10px] font-black uppercase tracking-widest mb-4">Market Trend</p>
          <div className="text-4xl font-black italic tracking-tighter">BULL</div>
          <div className="mt-4 h-1 w-full bg-black/10">
            <div className="h-full bg-black w-3/4"></div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SidebarItem({ label, value, active, isToggle }: any) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-4">
      <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{label}</span>
      {isToggle ? (
        <div className={`w-8 h-4 rounded-full relative transition-colors ${active ? 'bg-[#00FF66]' : 'bg-white/10'}`}>
          <div className={`absolute top-0.5 w-3 h-3 bg-black rounded-full transition-all ${active ? 'right-0.5' : 'left-0.5'}`}></div>
        </div>
      ) : (
        <span className={`font-black text-sm italic ${active ? 'text-[#00FF66]' : 'text-white/40'}`}>{value}</span>
      )}
    </div>
  );
}
