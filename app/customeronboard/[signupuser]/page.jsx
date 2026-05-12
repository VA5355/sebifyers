"use client";

import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";
import Header from '@/components/common/pageHeader/header.component';
import { ScreenLoader } from '@/components/loader/screenLoader/loader.component';
import Menu from '@/components/listing/stockControls/menu.component';
import { GlobalState } from '@/redux/store';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { SubscribePopup } from '@/components/SubscribePopup'
import TradeTickerBar from "@/components/tradeTicker/tradeTickerBar.component";
 
 /*
const DynamicGrid = dynamic(() => import('../components/listing/stockGrid/grid.component'), {
  loading: () => <p>Loading...</p>,
})*/

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

export default function SignUpAccountView({ params }) {
  const { signupuser } = params; // accUser132, accUser544, etc
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  let chartData = "";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    const isDarkMode = useSelector((state ) => state.misc?.isDarkMode)
      const selected = useSelector(
      (state ) => state.stock?.selectedCard
    );
    const rawTicker = selected?.ticker;
    const ticker =
    typeof rawTicker === "string"
      ? rawTicker
      : rawTicker?.symbol; // <-- adjust if needed
  
    /*  const symbol =
      selected?.ticker?.includes(":")
        ? selected.ticker.split(":")[1].replace("-EQ", "")
        : selected?.ticker; */
        const symbol =
    typeof ticker === "string" && ticker.includes(":")
      ? ticker.split(":")[1].replace("-EQ", "")
      : ticker;

  /* -------------------------------------------
     Fetch + Render Candlestick Chart
  -------------------------------------------- */
  useEffect(() => {
   
  }, [signupuser]);

  /* -------------------------------------------
     UI
  -------------------------------------------- */
  return (
 <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className='bg-white dark:bg-black '>
        <ScreenLoader />
        <Header />
         {/* 🔔 Ticker goes here */}
        <TradeTickerBar />
        <Menu />
       {/* <DynamicGrid key={`grid-${isDarkMode}`} />*/} 
        <div className="w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-3">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
             {signupuser.toUpperCase()} – Virtual Account Sign Up
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full h-[260px] sm:h-[320px] md:h-[420px] bg-white rounded-xl shadow"
          >
           
          </motion.div>
        </div>
      </div>
          {/* <div className="space-y-6 px-6 ml-[88px]">
              Other content 

              {symbol ? (
                <StockCandleChart symbol={symbol} />
              ) : (
                <div className="text-sm text-gray-400 italic">
                  Select a stock to view chart
                </div>
              )}
         </div>*/}

           <SubscribePopup />
      </div>
    </div>


  );
}
/*


    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-4 py-4"
    >
      Header  
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        <h1 className="text-lg font-semibold text-gray-800">
          {slug.toUpperCase()} – Intraday Candlestick
        </h1>
      </div>

       Chart Card  
      <div className="bg-white rounded-xl border shadow-sm p-3">
        {loading && (
          <div className="h-[360px] flex items-center justify-center text-sm text-gray-500">
            Loading chart…
          </div>
        )}

        {error && (
          <div className="h-[360px] flex flex-col items-center justify-center text-red-600 gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div
          ref={containerRef}
          className="w-full h-[360px]"
        />
      </div>
    </motion.div>

*/