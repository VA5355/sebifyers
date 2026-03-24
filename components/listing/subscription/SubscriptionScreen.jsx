import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck, Diamond, Star } from 'lucide-react';
import SubscribeSwipeButton from '../../../app/SubscribeSwipeButton';
 import   useIsMobile   from "../tradeGrid/useIsMobile";
//import VroomSwipeButton from '../../../app/VroomSwipeButton';
const SubscriptionScreen = () => {

    const isMobile = useIsMobile();

  const features = [
    "Indices Websocket streaming",
    "Market Status",
    "Indices Option-chain",
    "Positions/ Trade Book",
    "Stocks Charts"
  ];
  // "#f1f17c"
  const plans = [
    { name: "Basic", price: "Free", checks: [true, true, false, false, false], accent: "#f5a254" },
    { name: "Premium", price: "₹999", checks: [true, true, true, true, false], accent: "#f00f22", popular: true },
    { name: "AI Advanced", price: "₹2499", checks: [true, true, true, true, true], accent: "#070ac2" }
  ];

const GoldBarIcon = ({ size = 26 }) => (
  <svg
    width={size}
     height={(size * 50) / 64}   // 👈 increase height ratio
    viewBox="0 0 64 40"
    className="drop-shadow-[0_3px_10px_rgba(255,215,0,0.7)]"
  >
    <defs>
      <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff6b7" />
        <stop offset="40%" stopColor="#f7f2e2" />
        <stop offset="70%" stopColor="#f7f0db" />
        <stop offset="100%" stopColor="#f7e1d0" />
      </linearGradient>  {/*"#facc15"  "#eab308" "#b45309" */}
    </defs>

    {/* Main bar */}
    <rect
      x="2"
      y="6"
      width="60"
      height="28"
      rx="8"
      fill="url(#goldGradient)"
    />

    {/* Shine rgba(255, 255, 255, 0.35) */}
    <rect
      x="6"
      y="8"
      width="52"
      height="8"
      rx="4"
      fill={!isMobile ? "rgb(91, 158, 245)": "#ffff"}
    />

    {/* DEMO text #7c5a00 #abf5cc*/}
    <text
      x="50%"
      y="60%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize={!isMobile ? "21": "20"}
      fill={!isMobile ? "#f7eac9": "#e7c51b"}
      fontWeight="bold"
      letterSpacing="1"
    >
      DEMO
    </text>
  </svg>
);

// [#0f172a] 
  return (
    <div className="min-h-screen bg--gray-100 text-slate-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          {/* <h1 className="text-3xl md:text-5xl font-extrabold rounded-full  bg-blue-600 hover:bg-blue-700 text-white mb-4">Choose Your Edge</h1>*/ } 
            <SubscribeSwipeButton />
            {/*<VroomSwipeButton/> */}

          <p className="bg-blue-100 rounded-full text-green-900 max-w-2xl mx-auto">Elevate your trading with real-time data and AI-driven insights.</p>
        </div>

        {/* Main Grid: Responsive Stack to 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0">
          
          {/* Feature Titles (Hidden on small mobile, shown as a side-bar on desktop)bg-[#1e293b]/50 */}
          <div className="hidden lg:block lg:col-span-3 mt-[180px] bg-green-500 rounded-l-2xl border-y border-l border-slate-700">
            {features.map((f, i) => (
              <div key={i} className="h-16 flex items-center px-6  text-yellow-300 text-[24px]  font-semibold border-b border-slate-700 last:border-0">
                {f}
              </div>
            ))}
          </div>

          {/* Pricing Cards bg-[#1e293b]*/}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-0">
            {plans.map((plan, pIdx) => (
              <motion.div
                key={pIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: pIdx * 0.1 }}
                className={`relative flex flex-col bg-blue-400 border border-slate-700 p-6 
                  ${plan.popular ? 'lg:scale-105 lg:z-10 border-amber-500 shadow-2xl shadow-amber-500/10' : ''} 
                  ${pIdx === 0 ? 'lg:rounded-l-none lg:rounded-r-none' : ''}
                  ${pIdx === 2 ? 'lg:rounded-r-2xl' : ''}
                  rounded-2xl lg:rounded-none`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    Recommended
                  </span>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-2" style={{ color: plan.accent }}>{plan.name}</h3>
                  <div className="text-4xl font-black text-white">{plan.price}<span className="text-xl text-blue-900 font-normal">/mo</span></div>
                </div>

                {/* Mobile Feature List (Only shows on small screens)
                <div className="lg:hidden mb-6">
                  {features.map((f, fIdx) => (
                    <div key={fIdx} className="flex justify-between items-center py-2 border-b border-slate-700/50">
                      <span className="text-xs text-[23px]  font-bold  text-yellow-300 ">{f}</span>
                      {plan.checks[fIdx] ? <Check size={16} className="bg-amber-100 rounded-full text-green-400" /> : <X size={16} className="bg-amber-100 rounded-full text-slate-600" />}
                    </div>
                  ))}
                </div> */}
                <div className="lg:hidden mb-6">
                    {features.map((f, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex justify-between items-center py-2 border-b border-slate-700/50"
                      >
                        <span className="text-xs text-[23px] font-bold text-yellow-300">
                          {f}
                        </span>

                        {plan.checks[fIdx] ? (
                          <Check size={16} className="bg-amber-100 rounded-full text-green-400" />
                        ) : plan.name === "Basic" ? (  
                          <GoldBarIcon size={43} />  
                        ) : (
                          <X size={16} className="bg-amber-100 rounded-full text-slate-600" />
                        )}
                      </div>
                    ))}
                  </div>



                {/* Desktop Checkmarks (Hidden on mobile)
                <div className="hidden lg:block">
                  {plan.checks.map((check, cIdx) => (
                    <div key={cIdx} className="h-16 flex justify-center items-center border-b border-slate-700 last:border-0">
                      {check ? <ShieldCheck fill={plan.accent} size={22} className="text-[#0f172a]" /> : <X size={20} className="text-slate-600" />}
                    </div>
                  ))}
                </div> */}
                  <div className="hidden lg:block">
                      {plan.checks.map((check, cIdx) => (
                        <div
                          key={cIdx}
                          className="min-h-[80px] flex justify-center items-center border-b border-slate-700 last:border-0"
                        >
                          {check ? (
                            <ShieldCheck fill={plan.accent} size={26} className="text-[#0f172a]" />
                          ) : plan.name === "Basic" ? (   <div className="flex items-center justify-center w-full h-full">
                            <GoldBarIcon size={42} />   </div>
                          ) : (
                            <X size={24} className="text-slate-600" />
                          )}
                        </div>
                      ))}
                    </div>



                <button className="mt-8 w-full py-3 rounded-lg font-bold transition-all hover:brightness-110 active:scale-95" 
                        style={{ backgroundColor: plan.accent, color: plan.name === 'Premium' ? '#000' : '#fff' }}>
                 { plan.name==="Basic" ? "Complete KYC" : "Upgrade Now"} 
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
