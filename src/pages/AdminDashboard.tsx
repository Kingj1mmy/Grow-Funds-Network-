import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Activity, Users, Database, ArrowLeft, TrendingUp, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isSuperAdmin = user?.role === UserRole.SUPER_ADMIN;

  const stats = [
    { label: 'Total Network Value', value: '$24.8M', change: '+14.2%', icon: Database },
    { label: 'Active Investors', value: '27,402', change: '+1.2k', icon: Users },
    { label: 'Network Uptime', value: '99.99%', change: 'STABLE', icon: Activity },
  ];

  const pendingContributions = [
    { id: 'TX-492', user: 'Alex Rivera', amount: '$3,500', tier: 'Level 3', status: 'Awaiting Verification' },
    { id: 'TX-493', user: 'Sarah Chen', amount: '$12,000', tier: 'Level 4', status: 'Processing' },
    { id: 'TX-494', user: 'Marcus Thorne', amount: '$850', tier: 'Level 2', status: 'Awaiting Admin' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] p-6 md:p-12 selection:bg-[#00FF66] selection:text-black">
      <header className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <button 
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-[#00FF66] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            Return to Terminal
          </button>
          <div className="w-12 h-1 bg-red-500 mb-6"></div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-2">DASHBOARD</h1>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">SYSTEM OPERATIONS & FUND MANAGEMENT</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] font-black italic uppercase">
            {user?.role} NODE ACTIVE
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Network Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={stat.label}
                className="card-bold border-white/10"
              >
                <div className="flex justify-between items-start mb-8">
                  <Icon className="w-6 h-6 text-white/20" />
                  <span className="text-[10px] font-black text-[#00FF66] italic">{stat.change}</span>
                </div>
                <p className="label-bold">{stat.label}</p>
                <h3 className="text-4xl font-black italic tracking-tighter italic">{stat.value}</h3>
              </motion.div>
            );
          })}
        </div>

        {/* Management Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Funds Management */}
          <div className="lg:col-span-2">
            <h2 className="label-bold mb-8">Pending Contributions</h2>
            <div className="space-y-4">
              {pendingContributions.map((tx, i) => (
                <div key={tx.id} className="card-bold border-white/5 active:bg-white/5 transition-colors flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-6 w-full">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-white/20" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/20 mb-1">{tx.id} • {tx.tier}</p>
                      <h4 className="text-xl font-black italic tracking-tight">{tx.user}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-12 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-white/20 mb-1 italic">AMOUNT</p>
                      <p className="text-lg font-black text-[#00FF66] italic">{tx.amount}</p>
                    </div>
                    <button className="px-4 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF66] transition-colors shrink-0">
                      Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status Sidebar */}
          <div>
            <h2 className="label-bold mb-8">System Alerts</h2>
            <div className="space-y-4">
              <div className="p-6 bg-red-500/10 border border-red-500/20">
                <div className="flex gap-4 items-start mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <p className="text-xs font-black uppercase tracking-widest text-red-500">Tier 5 Request</p>
                </div>
                <p className="text-xs text-white/60 leading-relaxed italic">
                  One investor has requested transition to Elite Tier. Prepare private investment briefing documents.
                </p>
                <button className="mt-6 text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors">
                  Open Telegram Support →
                </button>
              </div>

              <div className="p-6 border border-white/10">
                <p className="text-[10px] font-black text-white/20 mb-4 uppercase tracking-[0.3em]">Network Load</p>
                <div className="h-1 w-full bg-white/5 mb-2">
                  <div className="h-full bg-white w-2/3"></div>
                </div>
                <p className="text-[10px] font-black text-right text-white/40 uppercase italic">68.2% Node Capacity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Controls - SUPER ADMIN ONLY */}
        <div className="pt-12 border-t border-white/5">
          <h2 className="label-bold mb-8 flex items-center gap-3">
            Global Protocol Controls
            {!isSuperAdmin && <ShieldAlert className="w-4 h-4 text-white/20" />}
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              disabled={!isSuperAdmin}
              className={`p-4 border border-white/10 text-left transition-all group ${isSuperAdmin ? 'hover:border-[#00FF66]' : 'opacity-20 cursor-not-allowed grayscale'}`}
            >
              <p className="text-[10px] font-black text-white/20 mb-2">PROTOCOL</p>
              <p className={`text-xs font-black italic transition-colors ${isSuperAdmin ? 'group-hover:text-[#00FF66]' : ''}`}>FORCE SYNC ALL NODES</p>
            </button>
            <button 
              disabled={!isSuperAdmin}
              className={`p-4 border border-white/10 text-left transition-all group ${isSuperAdmin ? 'hover:border-[#00FF66]' : 'opacity-20 cursor-not-allowed grayscale'}`}
            >
              <p className="text-[10px] font-black text-white/20 mb-2">DISTRIBUTION</p>
              <p className={`text-xs font-black italic transition-colors ${isSuperAdmin ? 'group-hover:text-[#00FF66]' : ''}`}>TRIGGER ROYALTIES</p>
            </button>
            <button 
              disabled={!isSuperAdmin}
              className={`p-4 border border-white/10 text-left transition-all group ${isSuperAdmin ? 'hover:border-red-500' : 'opacity-20 cursor-not-allowed grayscale'}`}
            >
              <p className="text-[10px] font-black text-white/20 mb-2">SECURITY</p>
              <p className={`text-xs font-black italic transition-colors ${isSuperAdmin ? 'group-hover:text-red-500' : ''}`}>EMERGENCY LOCKDOWN</p>
            </button>
            <button 
              disabled={!isSuperAdmin}
              className={`p-4 border border-white/10 text-left transition-all group ${isSuperAdmin ? 'hover:border-[#00FF66]' : 'opacity-20 cursor-not-allowed grayscale'}`}
            >
              <p className="text-[10px] font-black text-white/20 mb-2">COMMUNICATION</p>
              <p className={`text-xs font-black italic transition-colors ${isSuperAdmin ? 'group-hover:text-[#00FF66]' : ''}`}>BROADCAST TO NETWORK</p>
            </button>
          </div>
          
          {!isSuperAdmin && (
            <p className="mt-6 text-[10px] font-black uppercase text-white/10 italic text-center tracking-[0.2em]">
              Elevated Root Access Required for Global Protocol Management
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
