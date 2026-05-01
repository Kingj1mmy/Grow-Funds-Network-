import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ShieldCheck, User, Terminal } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleQuickLogin = (role: UserRole) => {
    login(role);
    if (role === UserRole.USER) {
      navigate('/portfolio');
    } else {
      navigate('/admin');
    }
  };

  const tiers = [
    { level: '1', title: 'Starter', range: '$10 - $97', perks: 'Growth potential, standard access' },
    { level: '2', title: 'Builder', range: '$100 - $999', perks: 'Growth potential, community access' },
    { level: '3', title: 'Income', range: '$1000 - $9999', perks: 'Royalties, priority chat support' },
    { level: '4', title: 'Premium', range: '$10k - $99k', perks: 'Large payouts, dedicated manager' },
    { level: '5', title: 'Elite', range: '$100k+', perks: 'Private briefings, elite tier status' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#00FF66] selection:text-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="w-12 h-1 bg-[#00FF66] mb-8"></div>
          <h1 className="text-[70px] md:text-[140px] font-black italic leading-[0.8] tracking-tighter mb-12 bg-linear-to-b from-white to-white/20 bg-clip-text text-transparent">
            GROW FUNDS <br/>NETWORK.
          </h1>
          <p className="text-2xl md:text-3xl font-bold tracking-tight text-white/80 max-w-2xl mb-8 leading-tight">
            Over 16,000+ of our Users had <span className="text-[#00FF66] italic underline decoration-2 underline-offset-8">Zero</span> Investing experience before Starting. Trusted by more than 27,000+ Investors.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <button 
              onClick={() => navigate('/signup')} 
              className="btn-primary py-6 px-10 text-lg hover:scale-105 active:scale-95"
            >
              Get Started Now + $15 Bonus
            </button>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FF66] italic">
              Limited Slots: 1 Week Remaining
            </div>
          </div>
        </motion.div>
      </section>

      {/* Role Simulators (Demo Feature) */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-y border-white/5 bg-white/[0.02]">
        <h2 className="label-bold mb-8 text-white/20 text-center uppercase tracking-[0.4em]">Secure Portal Gateway</h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <button 
            onClick={() => handleQuickLogin(UserRole.USER)}
            className="p-6 border border-white/10 hover:border-[#00FF66] transition-all group flex flex-col items-center gap-4 bg-black"
          >
            <User className="w-6 h-6 text-white/20 group-hover:text-[#00FF66]" />
            <span className="text-[10px] font-black uppercase tracking-widest italic group-hover:text-white">Investor Login</span>
          </button>
          <button 
            onClick={() => handleQuickLogin(UserRole.ADMIN)}
            className="p-6 border border-white/10 hover:border-red-500 transition-all group flex flex-col items-center gap-4 bg-black"
          >
            <ShieldCheck className="w-6 h-6 text-white/20 group-hover:text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-widest italic group-hover:text-white">Admin Access</span>
          </button>
          <button 
            onClick={() => handleQuickLogin(UserRole.SUPER_ADMIN)}
            className="p-6 border border-[#00FF66]/20 hover:border-[#00FF66] transition-all group flex flex-col items-center gap-4 bg-black relative overflow-hidden"
          >
            <Terminal className="w-6 h-6 text-[#00FF66]/40 group-hover:text-[#00FF66]" />
            <span className="text-[10px] font-black uppercase tracking-widest italic group-hover:text-white">Root Protocol</span>
            <div className="absolute top-0 right-0 p-1 bg-[#00FF66] text-black text-[6px] font-black">SECURE</div>
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="label-bold mb-6 text-[#00FF66]">Our Core Network</h2>
            <p className="text-3xl md:text-4xl font-black italic tracking-tighter leading-none mb-8">
              BUILT FOR STARTUPS. <br/>REFINED FOR INDIVIDUALS.
            </p>
            <p className="text-white/40 text-lg leading-relaxed italic max-w-md">
              "This network was started for Startups - Both Startup Companies and Startup Individuals. 
              For those who care about growing and moving forward for their Unwavering and A pleasant beginnings."
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card-bold aspect-square flex flex-col justify-center items-center text-center">
              <span className="text-4xl font-black italic text-[#00FF66]">27k+</span>
              <span className="text-[10px] font-black uppercase tracking-widest mt-2">Active Investors</span>
            </div>
            <div className="card-bold aspect-square flex flex-col justify-center items-center text-center border-[#00FF66]/20">
              <span className="text-4xl font-black italic text-[#00FF66]">$15B+</span>
              <span className="text-[10px] font-black uppercase tracking-widest mt-2">Bonus Allocated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5 bg-white/[0.01]">
        <h2 className="label-bold mb-16 text-center text-white/20">Membership & Portfolio Structures</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tiers.map((tier, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={tier.level} 
              className="card-bold group hover:border-[#00FF66] transition-all hover:-translate-y-2 flex flex-col h-full"
            >
              <span className="text-[10px] font-black text-[#00FF66] mb-4">LVL {tier.level}</span>
              <h3 className="text-2xl font-black italic tracking-tighter mb-2 group-hover:text-[#00FF66] transition-colors">{tier.title}</h3>
              <p className="text-xl font-bold mb-6 text-white/60">{tier.range}</p>
              <p className="text-[10px] font-black uppercase tracking-widest leading-loose mt-auto pt-6 border-t border-white/5 opacity-40 group-hover:opacity-100 italic">
                {tier.perks}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 p-8 border border-white/5 text-center max-w-2xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#00FF66] mb-4 italic">Exclusive Shared Benefits</p>
          <p className="text-sm text-white/30 italic">
            Capital growth potential, larger performance-based monthly payouts, early access to new features, and dedicated account management.
          </p>
        </div>
      </section>

      {/* Footer Meta */}
      <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black text-white/20 uppercase tracking-widest">
        <div className="flex gap-8">
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Protocol</span>
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Encryption</span>
        </div>
        <div className="flex items-center gap-4">
          <span>v.1.0.42-STABLE</span>
          <div className="w-1 h-1 bg-[#00FF66]"></div>
          <span>EST. 2024</span>
        </div>
      </footer>
    </div>
  );
}
