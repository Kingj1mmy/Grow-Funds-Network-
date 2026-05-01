import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShieldCheck, X } from 'lucide-react';

export default function Portfolio({ prices }: { prices: any }) {
  const [isPaid, setIsPaid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const assets = [
    { name: 'Bitcoin', symbol: 'BTC', balance: 0.8420, price: prices.BTC, change: '+12.4%', up: true, tag: 'STABLE' },
    { name: 'Ethereum', symbol: 'ETH', balance: 12.54, price: prices.ETH, change: '-4.2%', up: false, tag: 'VOLATILE' },
    { name: 'Solana', symbol: 'SOL', balance: 420.0, price: prices.SOL, change: '+18.7%', up: true, tag: 'HIGH GROWTH' },
  ];

  const handleCompletePayment = () => {
    // Simulate transaction delay
    setTimeout(() => {
      setIsPaid(true);
      setShowSuccess(true);
    }, 800);
  };

  const totalValue = assets.reduce((acc, asset) => acc + (asset.balance * asset.price), 0);
  const formattedTotal = totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 });
  const decimalTotal = (totalValue % 1).toFixed(2).substring(2);

  return (
    <div className="max-w-5xl mx-auto relative">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#050505] border-2 border-[#00FF66] p-12 max-w-md w-full text-center relative"
            >
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-20 h-20 bg-[#00FF66] rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-black" />
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter mb-4 uppercase">TRANSACTION VERIFIED</h2>
              <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-10 leading-relaxed italic">
                Your capital contribution of $3,500 has been successfully synchronized with the Grow Funds Network.
              </p>
              <button 
                onClick={() => setShowSuccess(false)}
                className="btn-primary w-full py-4 text-sm"
              >
                RETURN TO DASHBOARD
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-16 gap-8 text-center lg:text-left">
        <div>
          <p className="label-bold">Total Network Value</p>
          <h1 className="text-[60px] md:text-[110px] font-black leading-none tracking-tighter italic overflow-hidden">
            ${formattedTotal}<span className="text-[#00FF66] text-[30px] md:text-[40px] align-top ml-2">.{decimalTotal}</span>
          </h1>
        </div>
        <div className="lg:text-right pb-4">
          <div className="text-[#00FF66] text-3xl font-black italic">+12.4%</div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 font-black mt-1">24H PROFIT (SIMULATED)</div>
        </div>
      </header>

      {/* Plan Payment Progress */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="label-bold text-[#00FF66]">Current Strategy</h2>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-black italic tracking-tighter uppercase">Level 3: Income Tier</p>
              {isPaid ? (
                <span className="px-2 py-0.5 bg-[#00FF66]/10 text-[#00FF66] text-[8px] font-black border border-[#00FF66]/20 italic">VERIFIED</span>
              ) : (
                <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-[8px] font-black border border-red-500/20 italic">INCOMPLETE</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-white/40 mb-1">Payment Status</p>
            <p className="text-sm font-black italic">{isPaid ? '100% FULFILLED' : '65% FULFILLED'}</p>
          </div>
        </div>
        <div className="h-6 w-full bg-white/5 border border-white/10 p-1 relative overflow-hidden">
          <motion.div 
            initial={{ width: '65%' }}
            animate={{ width: isPaid ? '100%' : '65%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full relative z-10 ${isPaid ? 'bg-[#00FF66]' : 'bg-white/40'}`}
          ></motion.div>
          <div className="absolute inset-0 bg-repeating-linear-to-r from-transparent via-transparent to-white/5 w-full h-full"></div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20 italic max-w-sm">
            {isPaid 
              ? 'Monthly royalty payouts are now active for your account node.' 
              : 'Pending contribution: $3,500. Ask admin for support to finalize this node.'}
          </p>
          {!isPaid && (
            <button 
              onClick={handleCompletePayment}
              className="text-[10px] font-black uppercase text-[#00FF66] border-b border-[#00FF66] pb-1 hover:text-white hover:border-white transition-colors flex items-center gap-2 group"
            >
              Complete Payment
              <ShieldCheck className="w-3 h-3 transition-transform group-hover:scale-110" />
            </button>
          )}
        </div>
      </section>

      {/* Quick Action Hub */}
      <section className="grid grid-cols-2 gap-4 mb-4">
        <button 
          onClick={() => alert('ACTION REQUIRED: Please ask admin for support to deposit funds into your Grow Funds Network account.')}
          className="card-bold flex items-center justify-between group hover:bg-white text-left transition-all"
        >
          <span className="text-xs font-black uppercase tracking-widest group-hover:text-black">Deposit</span>
          <span className="text-xl font-black italic group-hover:text-black">→</span>
        </button>
        <button 
          onClick={() => alert('ACTION REQUIRED: Please ask admin for support to process your withdrawal request.')}
          className="card-bold flex items-center justify-between group hover:bg-red-500 text-left transition-all"
        >
          <span className="text-xs font-black uppercase tracking-widest group-hover:text-white">Withdraw</span>
          <span className="text-xl font-black italic group-hover:text-white">←</span>
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.map((asset, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={asset.symbol}
            className="card-bold flex flex-col justify-between h-56"
          >
            <div className="flex justify-between items-start">
              <span className="text-4xl font-black italic tracking-tighter">{asset.symbol}</span>
              <span className={`px-2 py-1 text-[10px] font-black border ${asset.up ? 'bg-[#00FF66] text-black border-[#00FF66]' : 'border-white/40 text-white/60'}`}>
                {asset.tag}
              </span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-black mb-1">{asset.balance} {asset.symbol}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-black tracking-tight">${(asset.balance * asset.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className={`text-xs font-black italic ${asset.up ? 'text-[#00FF66]' : 'text-red-500'}`}>{asset.change}</p>
              </div>
            </div>
          </motion.div>
        ))}
        
        <button 
          onClick={() => alert('ACTION REQUIRED: Please ask admin for support to deposit or add growth nodes.')}
          className="bg-[#00FF66] p-6 flex flex-col justify-center items-center group cursor-pointer h-56 border border-[#00FF66] transition-all hover:bg-transparent hover:text-[#00FF66]"
        >
          <span className="text-black text-6xl font-black group-hover:text-[#00FF66] transition-colors">+</span>
          <span className="text-black text-[10px] font-black uppercase tracking-[0.2em] mt-2 group-hover:text-[#00FF66] transition-colors">Add Growth Node</span>
        </button>
      </section>

      <section className="mt-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="label-bold">Recent Activity</h2>
          <button 
            onClick={() => alert('ACTION REQUIRED: Please ask admin for support to process withdrawals.')}
            className="text-[10px] font-black uppercase text-red-500 hover:underline hover:text-[#00FF66] transition-colors"
          >
            Request Withdrawal
          </button>
        </div>
        <div className="space-y-2">
          {[1,2,3].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="flex gap-4 items-center">
                <div className="w-1 h-1 bg-[#00FF66]"></div>
                <span className="text-xs font-black uppercase tracking-widest italic">Node Sync Success</span>
              </div>
              <span className="font-mono text-xs text-white/20">{(Math.random() * 0.1).toFixed(4)} BTC INBOUND</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
