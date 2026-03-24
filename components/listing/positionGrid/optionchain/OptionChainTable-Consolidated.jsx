import React, { useState, useEffect, useRef, useMemo, useContext, useCallback, createContext } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { 
  Lock, Unlock, ArrowRight, ArrowLeft, Check, X, 
  ChevronUp, ChevronDown, Calendar, Loader2, 
  Settings, TrendingUp, Wallet, Coins, RefreshCw,
  Search, Info, ExternalLink
} from "lucide-react";

/** * --- MOCK DATA & CONSTANTS --- 
 */
const mockExpiryDates = ['2025-12-16', '2025-12-23', '2025-12-30', '2026-01-06'];
const spotPrice = 25250.45;

const generateMockStrikes = (expiry) => {
  const base = 25000;
  return Array.from({ length: 11 }, (_, i) => {
    const strike = base + (i * 100);
    const isATM = Math.abs(strike - spotPrice) < 50;
    return {
      expiry,
      strike: strike.toString(),
      isATM,
      call: { 
        ltp: (200 + Math.random() * 100 - i * 15).toFixed(2), 
        change: (Math.random() * 5).toFixed(2),
        iv: (15 + Math.random() * 5).toFixed(1) 
      },
      put: { 
        ltp: (50 + Math.random() * 100 + i * 15).toFixed(2), 
        change: (Math.random() * -5).toFixed(2),
        iv: (14 + Math.random() * 4).toFixed(1)
      }
    };
  });
};

/** * --- CONTEXTS --- 
 */
const WebSocketContext = createContext({
  isConnected: false,
  sendSubscriptionRequest: () => {},
  openSubscriptionRequest: () => {},
  strikeWebMap: new Map()
});

/** * --- COMPONENTS --- 
 */

// 1. Swipe Pill Component (Call/Put specific)
function SwipePill({ side, strike, ltp, onAction, loading }) {
  const x = useMotionValue(0);
  const [locked, setLocked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ef4444", "#f4f4f5", "#22c55e"]
  );

  const handleDragEnd = async (_, info) => {
    if (locked || loading) return;
    
    if (info.offset.x > 80) {
      await onAction('BUY');
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } else if (info.offset.x < -80) {
      await onAction('SELL');
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }
    x.set(0);
  };

  return (
    <div className="relative w-full h-12 bg-zinc-100 rounded-xl overflow-hidden shadow-inner border border-zinc-200">
      <motion.div style={{ background }} className="absolute inset-0 flex items-center justify-between px-4 text-white font-bold text-xs uppercase">
        <span>Sell</span>
        <span>Buy</span>
      </motion.div>

      <motion.div
        drag={locked || loading ? false : "x"}
        dragConstraints={{ left: -100, right: 100 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className={`absolute inset-0 z-10 flex items-center px-4 bg-white cursor-grab active:cursor-grabbing border-x-2 ${
            side === 'CALL' ? 'border-green-500' : 'border-red-500'
        }`}
      >
        <div className="flex flex-col flex-1">
          <span className="text-[10px] text-zinc-400 font-bold">{side} @ {strike}</span>
          <span className="text-sm font-bold text-zinc-800">₹{ltp}</span>
        </div>
        
        <div className="flex gap-2 items-center">
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : 
             isSuccess ? <Check className="w-4 h-4 text-green-500" /> :
             <button onClick={() => setLocked(!locked)} className="p-1 hover:bg-zinc-100 rounded">
                {locked ? <Lock className="w-4 h-4 text-amber-500" /> : <Unlock className="w-4 h-4 text-zinc-400" />}
             </button>
            }
        </div>
      </motion.div>
    </div>
  );
}

// 2. Limit Price Slider
function PriceControl({ min, max, initial }) {
  const [val, setVal] = useState(initial || (min + max) / 2);
  return (
    <div className="flex flex-col items-center gap-1 w-full px-2">
      <div className="flex justify-between w-full text-[10px] font-bold text-zinc-500">
        <span>QTY: 75</span>
        <span className="text-indigo-600">LIMIT: ₹{val}</span>
      </div>
      <input 
        type="range" min={min} max={max} value={val} 
        onChange={(e) => setVal(e.target.value)}
        className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
}

// 3. Option Chain Table
function OptionChainTable({ expiry }) {
  const [strikes, setStrikes] = useState([]);
  const [loadingAction, setLoadingAction] = useState(null);

  useEffect(() => {
    setStrikes(generateMockStrikes(expiry));
  }, [expiry]);

  const handleTrade = async (strike, side, type) => {
    setLoadingAction(`${strike}-${side}`);
    console.log(`Action: ${type} ${side} on Strike ${strike}`);
    await new Promise(r => setTimeout(r, 800)); // Simulate API
    setLoadingAction(null);
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead className="bg-zinc-50 text-zinc-500 text-[11px] uppercase font-bold border-b border-zinc-200">
          <tr>
            <th className="px-4 py-3">Call Trading</th>
            <th className="px-4 py-3 text-center">Strike</th>
            <th className="px-4 py-3 text-right">Put Trading</th>
          </tr>
        </thead>
        <tbody>
          {strikes.map((s, idx) => (
            <tr key={s.strike} className={`border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors ${s.isATM ? 'bg-indigo-50/30' : ''}`}>
              <td className="p-3 w-1/3 min-w-[200px]">
                <div className="flex flex-col gap-2">
                    <SwipePill 
                        side="CALL" 
                        strike={s.strike} 
                        ltp={s.call.ltp} 
                        loading={loadingAction === `${s.strike}-CALL`}
                        onAction={(type) => handleTrade(s.strike, 'CALL', type)}
                    />
                    <PriceControl min={0} max={500} initial={parseFloat(s.call.ltp)} />
                </div>
              </td>
              
              <td className="p-3 text-center align-middle">
                <div className="flex flex-col items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-black shadow-sm border ${
                        s.isATM ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-zinc-700 border-zinc-300'
                    }`}>
                        {s.strike}
                    </span>
                    {s.isATM && <span className="text-[10px] text-indigo-600 font-bold mt-1">ATM</span>}
                </div>
              </td>

              <td className="p-3 w-1/3 min-w-[200px]">
                <div className="flex flex-col gap-2">
                    <SwipePill 
                        side="PUT" 
                        strike={s.strike} 
                        ltp={s.put.ltp} 
                        loading={loadingAction === `${s.strike}-PUT`}
                        onAction={(type) => handleTrade(s.strike, 'PUT', type)}
                    />
                    <PriceControl min={0} max={500} initial={parseFloat(s.put.ltp)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 4. Expiry Filter
function ExpiryFilter({ selected, onChange }) {
  return (
    <div className="flex items-center gap-3 bg-white p-2 px-4 rounded-2xl border border-zinc-200 shadow-sm">
      <div className="flex items-center gap-2 text-zinc-400">
        <Calendar className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Expiry</span>
      </div>
      <div className="flex gap-1">
        {mockExpiryDates.map(date => (
            <button
                key={date}
                onClick={() => onChange(date)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    selected === date 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
            >
                {date.split('-').slice(1).join('/')}
            </button>
        ))}
      </div>
    </div>
  );
}

/** * --- MAIN COMPONENT --- 
 */
export default function App() {
  const [activeTab, setActiveTab] = useState("chain");
  const [expiry, setExpiry] = useState(mockExpiryDates[2]);
  const [isConnected, setIsConnected] = useState(false);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 font-sans text-zinc-900">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Navigation Bar */}
        <header className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">TRADING<span className="text-indigo-600">VISTA</span></h1>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-400 uppercase">NIFTY 50</span>
                <span className="text-sm font-black text-green-600">₹{spotPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleConnection}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
                isConnected 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'}`} />
              {isConnected ? 'LIVE FEED ACTIVE' : 'CONNECT WEBSOCKET'}
            </button>
            <button className="p-2.5 rounded-2xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
                <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Filters and Search */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-2xl border border-zinc-200">
            <button
              className={`px-6 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === "chain" ? "bg-white text-indigo-600 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
              }`}
              onClick={() => setActiveTab("chain")}
            >
              Option Chain
            </button>
            <button
              className={`px-6 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === "swipe" ? "bg-white text-indigo-600 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
              }`}
              onClick={() => setActiveTab("swipe")}
            >
              Script Chart
            </button>
          </div>

          <ExpiryFilter selected={expiry} onChange={setExpiry} />
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "chain" ? (
            <motion.div
              key="chain"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
               <div className="flex justify-between items-center px-2">
                 <div className="flex items-center gap-2 text-zinc-500 font-bold text-xs uppercase tracking-widest">
                   <Info className="w-3 h-3" />
                   <span>Swipe Pill Left to Sell / Right to Buy</span>
                 </div>
                 <div className="text-[10px] text-zinc-400 font-medium">
                   Quotes update via WebSocket feed
                 </div>
               </div>
               <OptionChainTable expiry={expiry} />
            </motion.div>
          ) : (
            <motion.div
              key="swipe"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden min-h-[500px] flex flex-col"
            >
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-zinc-900">Advanced Charting</h3>
                  <p className="text-sm text-zinc-500 font-medium">Technical analysis for NIFTY-50 Spot</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-bold hover:bg-indigo-100">
                  <ExternalLink className="w-4 h-4" />
                  Full View
                </button>
              </div>
              
              <div className="flex-1 bg-zinc-50 flex items-center justify-center relative">
                <div className="text-center space-y-4 max-w-sm">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-800">TradingView Integration</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Interactive technical charts are loading. This module visualizes real-time price action and indicators.
                  </p>
                  <div className="pt-4 flex gap-2 justify-center">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
                
                {/* Mock Chart UI Background Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                   {Array.from({length: 12}).map((_, i) => (
                     <div key={i} className="flex gap-2 items-end h-full px-4 overflow-hidden">
                        {Array.from({length: 20}).map((_, j) => (
                          <div key={j} className="w-4 bg-indigo-600 rounded-t-sm" style={{ height: `${20 + Math.random() * 60}%` }}></div>
                        ))}
                     </div>
                   ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        <footer className="pt-8 pb-12 text-center text-zinc-400 text-xs space-y-4">
            <div className="flex justify-center gap-6 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Wallet className="w-3 h-3" /> Margin: ₹24,500</span>
                <span className="flex items-center gap-1.5"><Coins className="w-3 h-3" /> P&L: <span className="text-green-600">+₹1,240</span></span>
            </div>
            <p>© 2025 TradingVista Options Desktop. All trades executed on NSE/BSE exchange via direct terminal.</p>
        </footer>
      </div>
    </div>
  );
}