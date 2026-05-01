import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+1',
    password: '',
  });

  const countries = [
    { code: '+1', name: 'US', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+234', name: 'NG', flag: '🇳🇬' },
    { code: '+91', name: 'IN', flag: '🇮🇳' },
    { code: '+61', name: 'AU', flag: '🇦🇺' },
    { code: '+49', name: 'DE', flag: '🇩🇪' },
    { code: '+27', name: 'ZA', flag: '🇿🇦' },
    { code: '+33', name: 'FR', flag: '🇫🇷' },
    { code: '+254', name: 'KE', flag: '🇰🇪' },
    { code: '+233', name: 'GH', flag: '🇬🇭' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/2fa');
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#00FF66] selection:text-black flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <div className="mb-20">
          <div className="w-12 h-1 bg-[#00FF66] mb-8 cursor-pointer" onClick={() => navigate('/')}></div>
          <h1 className="text-[100px] font-black italic leading-none tracking-tighter mb-4 uppercase">JOIN.</h1>
          <p className="text-white/40 text-xs font-black uppercase tracking-[0.4em]">ESTABLISH YOUR NETWORK IDENTITY</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="group">
            <label className="label-bold group-focus-within:text-[#00FF66] transition-colors">Digital Identity</label>
            <input 
              required
              type="text" 
              placeholder="YOUR FULL NAME"
              className="input-field placeholder:text-white/10 uppercase tracking-widest italic"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="group">
            <label className="label-bold group-focus-within:text-[#00FF66] transition-colors">Access Portal (Email)</label>
            <input 
              required
              type="email" 
              placeholder="NAME@PROTOCOL.COM"
              className="input-field placeholder:text-white/10 uppercase tracking-widest italic"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="group">
            <label className="label-bold group-focus-within:text-[#00FF66] transition-colors mb-4 block">Communication Node (Phone)</label>
            <div className="flex gap-4">
              <div className="relative">
                <select 
                  className="bg-transparent border-b border-white/10 text-white font-black italic p-2 outline-hidden appearance-none cursor-pointer hover:border-[#00FF66] transition-colors"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                >
                  {countries.map(c => (
                    <option key={c.code} value={c.code} className="bg-black text-white">{c.name} {c.code}</option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">▾</div>
              </div>
              <input 
                required
                type="tel" 
                placeholder="000 000 0000"
                className="input-field placeholder:text-white/10 flex-1 tracking-widest font-mono"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="group">
            <label className="label-bold group-focus-within:text-[#00FF66] transition-colors">Encryption Key (Password)</label>
            <input 
              required
              type="password" 
              placeholder="••••••••••••"
              className="input-field placeholder:text-white/10 italic"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="w-full btn-primary py-8 text-xl flex items-center justify-between group overflow-hidden">
            <span>INITIALIZE ACCESS</span>
            <span className="text-4xl transition-transform group-hover:translate-x-2">→</span>
          </button>
        </form>

        <p className="mt-12 text-center text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic">
          Already a member? <span className="text-[#00FF66] cursor-pointer hover:underline" onClick={() => navigate('/portfolio')}>Log in to network</span>
        </p>

        <div className="mt-20 flex gap-4 text-[10px] font-black text-white/5 uppercase tracking-widest pointer-events-none">
          <span>SECURED BY CRYSTAL ENCRYPTION</span>
          <span>/</span>
          <span>v.1.0.42-STABLE</span>
        </div>
      </motion.div>
    </div>
  );
}
