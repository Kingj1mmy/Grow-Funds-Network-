import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

export default function TwoFactor() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      navigate('/portfolio');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-[#00FF66] selection:text-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-16">
          <div className="w-12 h-1 bg-[#00FF66] mb-8"></div>
          <h1 className="text-6xl font-black italic tracking-tighter mb-4 uppercase">SECURE.</h1>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-2 leading-relaxed">
            A VERIFICATION CODE WAS SENT TO YOUR NODE.
          </p>
          <div className="flex items-center gap-2 text-[#00FF66] text-[10px] font-black uppercase tracking-widest italic">
            <ShieldCheck className="w-3 h-3" />
            ENCRYPTION ACTIVE
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-12">
          <div className="flex justify-between gap-2">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`code-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-16 sm:w-14 sm:h-20 bg-white/5 border-b-2 border-white/10 text-center text-3xl font-black italic focus:border-[#00FF66] focus:outline-hidden transition-all uppercase"
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </div>

          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/20">
            <div className="flex items-center gap-2">
              <RefreshCw className={`w-3 h-3 ${timer === 0 ? 'text-[#00FF66] cursor-pointer' : ''}`} />
              <span>{timer > 0 ? `Resend in ${timer}s` : 'Resend Now'}</span>
            </div>
            <span className="italic">Node Status: Pending</span>
          </div>

          <button 
            type="submit" 
            disabled={code.some(d => !d) || isVerifying}
            className="w-full btn-primary py-8 text-xl flex items-center justify-between group overflow-hidden disabled:opacity-30 disabled:grayscale"
          >
            <span>{isVerifying ? 'SYNCHRONIZING...' : 'VERIFY IDENTITY'}</span>
            <ArrowRight className={`w-6 h-6 transition-transform ${isVerifying ? 'animate-pulse' : 'group-hover:translate-x-2'}`} />
          </button>
        </form>

        <div className="mt-20 flex justify-center text-[8px] font-black text-white/5 uppercase tracking-[0.8em] pointer-events-none">
          SECURE PROTOCOL V4.2.0
        </div>
      </motion.div>
    </div>
  );
}
