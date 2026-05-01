import { motion } from 'motion/react';

export default function Market({ prices }: { prices: any }) {
  const majorPairs = [
    { id: 1, pair: 'BTC / USD', symbol: 'BTC', vol: '2.4B' },
    { id: 2, pair: 'ETH / USD', symbol: 'ETH', vol: '1.2B' },
    { id: 3, pair: 'SOL / USD', symbol: 'SOL', vol: '840M' },
    { id: 4, pair: 'LINK / USD', symbol: 'LINK', vol: '120M', priceFallback: 18.42 },
    { id: 5, pair: 'AVAX / USD', symbol: 'AVAX', vol: '95M', priceFallback: 38.90 },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-16">
        <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter leading-none mb-6">MARKETS</h1>
        <div className="flex gap-4 border-b border-white/10 pb-8 overflow-x-auto no-scrollbar">
          {['ALL ASSETS', 'FAVORITES', 'TOP GAINERS', 'FUTURES', 'DEFI'].map((tab, i) => (
            <button 
              key={tab}
              className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 hover:text-[#00FF66] transition-colors whitespace-nowrap ${i === 0 ? 'text-[#00FF66] border border-[#00FF66]' : 'text-white/40'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <section className="space-y-4">
        {majorPairs.map((pair, i) => {
          const currentPrice = prices[pair.symbol] || (pair.priceFallback || 0);
          const change = (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 5).toFixed(2) + '%';
          
          return (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              key={pair.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 border border-white/10 hover:border-[#00FF66] transition-all bg-white/2 cursor-pointer group gap-6"
            >
              <div className="flex items-center gap-8">
                <span className="text-3xl font-black italic group-hover:text-[#00FF66] transition-colors">{pair.pair.split(' / ')[0]}</span>
                <div className="hidden sm:block">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">VOLUME</p>
                  <p className="text-sm font-bold">{pair.vol}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-12 text-right">
                <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest sm:hidden">PRICE</p>
                  <p className="text-xl font-black italic tracking-tight italic">${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="w-24 px-3 py-2 bg-white/5 border border-white/10 text-center shrink-0">
                  <p className={`text-xs font-black ${change.startsWith('+') ? 'text-[#00FF66]' : 'text-red-500'}`}>
                    {change}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      <div className="mt-20 flex flex-col md:flex-row justify-between items-center p-8 md:p-12 border-2 border-dashed border-white/10 gap-8">
        <div>
          <h3 className="text-2xl font-black italic tracking-tighter mb-2">ADVANCED TRADING</h3>
          <p className="text-xs text-white/40 font-bold uppercase tracking-widest italic">Direct access to institutional liquidity pools</p>
        </div>
        <button className="btn-primary w-full md:w-auto">Connect Master Node</button>
      </div>
    </div>
  );
}
