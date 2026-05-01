import { motion } from 'motion/react';
import { User, Shield, Bell, Zap, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  
  const sections = [
    { title: 'Security', icon: Shield, desc: 'Biometric authorization & 2FA' },
    { title: 'Alerts', icon: Bell, desc: 'Price triggers & system status' },
    { title: 'API Access', icon: Zap, desc: 'Master key & relay nodes' },
  ];

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-16">
        <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter leading-none mb-4 uppercase">IDENTITY</h1>
        <p className="text-[#00FF66] text-[10px] font-black uppercase tracking-[0.4em] italic leading-relaxed">
          SECURE YOUR NETWORK PRESENCE & TRADE PROTOCOLS
        </p>
      </header>

      <section className="space-y-12">
        {/* User Profile */}
        <div className="bg-white/5 border border-white/10 p-8 md:p-12">
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 text-center sm:text-left">
            <div className="w-20 h-20 bg-[#00FF66] rounded-full flex items-center justify-center shrink-0">
              <User className="w-10 h-10 text-black" />
            </div>
            <div>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase">{user.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Verified Investor • {user.role}</p>
                <div className="w-1 h-1 bg-[#00FF66] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="space-y-8 max-w-md mx-auto sm:mx-0">
            <div className="group">
              <label className="label-bold group-focus-within:text-[#00FF66] transition-colors mb-2 block">Identity Email</label>
              <input 
                disabled
                type="text" 
                className="input-field border-white/10 bg-white/5 cursor-not-allowed uppercase"
                value={user.email}
              />
            </div>
            <div className="group opacity-40">
              <label className="label-bold mb-2 block">Network Node Address</label>
              <input 
                disabled
                type="text" 
                className="input-field border-white/5 bg-transparent font-mono text-[10px]"
                value="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
              />
            </div>
          </div>
        </div>

        {/* Action Sections */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={section.title}
                className="card-bold hover:bg-[#00FF66]/5 group cursor-pointer border-white/10 hover:border-[#00FF66] transition-all"
              >
                <Icon className="w-8 h-8 mb-8 text-white/20 group-hover:text-[#00FF66] transition-colors" />
                <h3 className="text-xl font-black italic tracking-tighter italic uppercase">{section.title}</h3>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-loose">
                  {section.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Danger Zone */}
        <div className="pt-12 border-t border-white/5">
          <button 
            onClick={logout}
            className="flex items-center gap-4 text-red-500 hover:text-red-400 font-black uppercase tracking-[0.4em] text-[10px] transition-colors group italic"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminate Network Session</span>
            <div className="h-[1px] w-0 group-hover:w-12 bg-red-400 transition-all duration-500"></div>
          </button>
        </div>
      </section>
    </div>
  );
}
