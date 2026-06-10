"use client";

import React, {useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Globe,
  DollarSign,
  Landmark
} from "lucide-react";
 import   useIsMobile   from "@/components/listing/tradeGrid/useIsMobile";
//const API_URL = "https://192.168.1.7:8888/.netlify/functions/netlifyproxyvirtualaccountmongo/api/nseallindices";
const API_URL = "https://onedinaarvirtualaccount.onrender.com/api/nseallindices";
//const API_URL = "http://localhost:3001/api/nseallindices";

function CardsMarkup ({indices , hasError } ) { 
      // Fallback or neutral values get a slate theme instead of forcing a fake green trend
     // !hasError &&
        const isMobile = useIsMobile();




    return ( 
        <>
        {Array.isArray(indices) &&  indices?.map((item , index) => { 
         const isNeutral = item.current === 'N/A';
        const trendColor = isNeutral ? 'text-slate-400' : (item.isNegative ? 'text-red-500' : 'text-emerald-500');
        const trendBg = isNeutral ? 'bg-slate-100' : (item.isNegative ? 'bg-red-50/50' : 'bg-emerald-50/50');
        const trendBorder = isNeutral ? 'border-slate-200' : (item.isNegative ? 'border-red-100' : 'border-emerald-100');
        const trendIcon = isNeutral ? '•' : (item.isNegative ? '▼' : '▲');
        const mobileCard = isMobile ? 'max-w-xs' :   ' ' ;

          return (<div    key={index}  className={`bg-white border ${mobileCard} ${trendBorder} rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between`}>
            <div>
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase"> {item.name}</h3>
                    <span className={`flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${trendBg} ${trendColor}`}>
                        <span className="mr-1 text-[10px]">${trendIcon}</span>  {item.percentChange}%
                    </span>
                </div>
                <div className={`text-2xl font-black tracking-tight text-slate-900 mb-4 ${isNeutral ? 'opacity-40' : ''}`}>
                     {item.current}
                </div>
            </div>

            <div className="space-y-3.5 border-t border-slate-100 pt-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="block text-[10px] uppercase font-semibold text-slate-400">Open</span>
                        <span className="text-xs font-bold text-slate-700"> {item.open}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="block text-[10px] uppercase font-semibold text-slate-400">High</span>
                        <span className={`text-xs font-bold ${isNeutral ? 'text-slate-700' : 'text-emerald-600'}`}> {item.high}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="block text-[10px] uppercase font-semibold text-slate-400">Low</span>
                        <span className={`text-xs font-bold ${isNeutral ? 'text-slate-700' : 'text-red-600'}`}> {item.low}</span>
                    </div>
                </div>

                <div className="text-xs space-y-1.5 text-slate-600">
                    <div className="flex justify-between pb-1 border-b border-dashed border-slate-100">
                        <span className="text-slate-400 font-medium">Prev. Close</span>
                        <span className="font-semibold text-slate-700"> {item.prevClose}</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-dashed border-slate-100">
                        <span className="text-slate-400 font-medium">1W Ago</span>
                        <span className="font-semibold text-slate-700"> {item.oneWeekAgo}</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-dashed border-slate-100">
                        <span className="text-slate-400 font-medium">1M Ago</span>
                        <span className="font-semibold text-slate-700"> {item.oneMonthAgo}</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-dashed border-slate-100">
                        <span className="text-slate-400 font-medium">1Y Ago</span>
                        <span className="font-semibold text-slate-700"> {item.oneYearAgo}</span>
                    </div>
                    <div className="flex justify-between pt-0.5">
                        <span className="text-slate-400 font-medium">52W High / Low</span>
                        <span className="font-bold text-slate-700 text-[11px]">
                            <span className={`${isNeutral ? 'text-slate-700' : 'text-emerald-600'}`}> {item.yearHigh}</span> / 
                            <span className={`{isNeutral ? 'text-slate-700' : 'text-red-500'}`}> {item.yearLow}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>) 
          }  ) 

       }  </>
 


    ); 


}

export default function MarketNiftyStatusSlider() {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
   const [nseAllIndices, setNseAllIndices] = useState([]);
  const [error, setError] = useState("");
  

           // Establish the exact 5 core indices requested as an explicit fallback state
    const fallbackSymbols = ["NIFTY 50", "NIFTY NEXT 50", "NIFTY BANK", "NIFTY FINANCIAL SERVICES", "NIFTY MIDCAP SELECT"];
    let isFallbackState = true;
    
    if(nseAllIndices.length ===0  ){
           console.log(` MarketNiftyStatusSlider nseAllIndices is empty   `)

    setNseAllIndices ( nseindices => {  nseindices =  Array.from(fallbackSymbols.map(symbol => ({
        name: symbol,
        current: 'N/A',
        percentChange: '0.00',
        open: 'N/A', high: 'N/A', low: 'N/A', indicativeClose: 'N/A',
        prevClose: 'N/A', oneWeekAgo: 'N/A', oneMonthAgo: 'N/A', oneYearAgo: 'N/A',
        yearHigh: 'N/A', yearLow: 'N/A',
        isNegative: false
    }) ) )
      return nseindices
  }
  
  
   ) ;
     }

  useEffect(() => {
    let alive = true;
    /**
     {
    "success": true,
    "count": 126,
    "data": [
        {
            "current": "15.58",
            "percentChange": "-8.53",
            "open": "17.03",
     */
    fetch(API_URL, { cache: "no-store" })
      .then(async (r) =>  {
       // if (!r.ok) throw new Error("API down");
        let mData = await r.json();
         console.log(` MarketNiftyStatusSlider fetch r.json   ${JSON.stringify(mData)}`)
        let marketDat = JSON.parse(JSON.stringify(mData));
       // let marketBody = marketDat.body;
       // console.log(` Market status  ${JSON.stringify(mData)}`)
      //  console.log(` Market state  ${JSON.stringify(marketBody)}`)
        // return marketBody;
        return marketDat.data;
      })
      .then((data) => {
      console.log(` NSE Live Market Indices  ${JSON.stringify(data)}`)
        
        if (alive && data) {
          setNseAllIndices(data);
          setIsLoading(false)
        }
      })
      .catch((err  ) => {
        setError(JSON.stringify(err));
         console.log(`  MarketNiftyStatusSlider fetch err  ${JSON.stringify(err)}`)
        setNseAllIndices([]); // UI still renders safely
      });
     console.log(` NSE Live Market Indices alive  ${JSON.stringify(alive)}`)
     console.log(` NSE Live Market Indices nseAllIndices  ${JSON.stringify(nseAllIndices.length)}`)
    return () => {
      alive = false;
    };
  }, []);


   // liveIndicesData = indicesData;
/*
// 2. MARKUP COMPILATION PIPELINE
    const cardsMarkup = nseAllIndices.map(item => {
        // Fallback or neutral values get a slate theme instead of forcing a fake green trend
        const isNeutral = item.current === 'N/A';
        const trendColor = isNeutral ? 'text-slate-400' : (item.isNegative ? 'text-red-500' : 'text-emerald-500');
        const trendBg = isNeutral ? 'bg-slate-100' : (item.isNegative ? 'bg-red-50/50' : 'bg-emerald-50/50');
        const trendBorder = isNeutral ? 'border-slate-200' : (item.isNegative ? 'border-red-100' : 'border-emerald-100');
        const trendIcon = isNeutral ? '•' : (item.isNegative ? '▼' : '▲');

        return `
        <div class="bg-white border ${trendBorder} rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-sm font-bold text-slate-800 tracking-tight uppercase">${item.name}</h3>
                    <span class="flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${trendBg} ${trendColor}">
                        <span class="mr-1 text-[10px]">${trendIcon}</span> ${item.percentChange}%
                    </span>
                </div>
                <div class="text-2xl font-black tracking-tight text-slate-900 mb-4 ${isNeutral ? 'opacity-40' : ''}">
                    ${item.current}
                </div>
            </div>

            <div class="space-y-3.5 border-t border-slate-100 pt-4">
                <div class="grid grid-cols-3 gap-2 text-center">
                    <div class="bg-slate-50 p-2 rounded-lg">
                        <span class="block text-[10px] uppercase font-semibold text-slate-400">Open</span>
                        <span class="text-xs font-bold text-slate-700">${item.open}</span>
                    </div>
                    <div class="bg-slate-50 p-2 rounded-lg">
                        <span class="block text-[10px] uppercase font-semibold text-slate-400">High</span>
                        <span class="text-xs font-bold ${isNeutral ? 'text-slate-700' : 'text-emerald-600'}">${item.high}</span>
                    </div>
                    <div class="bg-slate-50 p-2 rounded-lg">
                        <span class="block text-[10px] uppercase font-semibold text-slate-400">Low</span>
                        <span class="text-xs font-bold ${isNeutral ? 'text-slate-700' : 'text-red-600'}">${item.low}</span>
                    </div>
                </div>

                <div class="text-xs space-y-1.5 text-slate-600">
                    <div class="flex justify-between pb-1 border-b border-dashed border-slate-100">
                        <span class="text-slate-400 font-medium">Prev. Close</span>
                        <span class="font-semibold text-slate-700">${item.prevClose}</span>
                    </div>
                    <div class="flex justify-between pb-1 border-b border-dashed border-slate-100">
                        <span class="text-slate-400 font-medium">1W Ago</span>
                        <span class="font-semibold text-slate-700">${item.oneWeekAgo}</span>
                    </div>
                    <div class="flex justify-between pb-1 border-b border-dashed border-slate-100">
                        <span class="text-slate-400 font-medium">1M Ago</span>
                        <span class="font-semibold text-slate-700">${item.oneMonthAgo}</span>
                    </div>
                    <div class="flex justify-between pb-1 border-b border-dashed border-slate-100">
                        <span class="text-slate-400 font-medium">1Y Ago</span>
                        <span class="font-semibold text-slate-700">${item.oneYearAgo}</span>
                    </div>
                    <div class="flex justify-between pt-0.5">
                        <span class="text-slate-400 font-medium">52W High / Low</span>
                        <span class="font-bold text-slate-700 text-[11px]">
                            <span class="${isNeutral ? 'text-slate-700' : 'text-emerald-600'}">${item.yearHigh}</span> / 
                            <span class="${isNeutral ? 'text-slate-700' : 'text-red-500'}">${item.yearLow}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');*/
  return (
    <div className="w-full z-[20]">
      {/* Section Title Header */}
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="text-sm font-semibold text-zinc-700">
          Market Status
        </h3>
        
        {/* Quick Actions / Status indicators can go here */}
        {!isLoading && !hasError && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Stream Connected
          </span>
        )}
      </div>

      {/* Main Responsive Iframe Canvas & Fallback Handling Wrapper */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-sm">
        
        {/* Fallback Display State */}
        {hasError && (
          <div className="p-8 flex items-center justify-center min-h-[350px]">
            <FallbackCard error="Market data stream unavailable" />
          </div>
        )}

        {/* Loading Overlay State */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-50/60 backdrop-blur-xs">
            <FallbackCard error={null} />
          </div>
        )}

        {/* Live Server Micro-Frontend Scraper Frame */}
        {!hasError && ( <>
            {/*  <iframe 
            src="https://onedinaarvirtualaccount.onrender.com/api/stockbrowserold/marketstatus" 
            className="w-full h-[580px] md:h-[450px] border-0 block transition-opacity duration-300"
            style={{ opacity: isLoading ? 0 : 1 }}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            title="NSE Live Indices Dashboard"
          />
            */}
        
             <div id="deck-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <CardsMarkup indices = {nseAllIndices} hasError = {hasError} />
            </div>
  



        </> )}
      </div>
    </div>
  );
}

/* ---------- Fallback Card Component ---------- */
function FallbackCard({ error }) {
  return (
    <div className="min-w-[240px] max-w-sm mx-auto bg-white border border-zinc-200 shadow-xs rounded-xl p-5 text-center transition-all">
      {error ? (
        <div className="space-y-3">
          <div className="mx-auto w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 font-bold text-sm">
            !
          </div>
          <p className="text-xs font-semibold text-zinc-800">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-[11px] font-medium text-indigo-600 hover:text-indigo-500 underline transition-colors cursor-pointer"
          >
            Click to retry connection
          </button>
        </div>
      ) : (
        <div className="space-y-3 py-2">
          <div className="mx-auto w-5 h-5 rounded-full border-2 border-zinc-300 border-t-zinc-600 animate-spin" />
          <p className="text-xs font-medium text-zinc-500 tracking-wide">Loading live market grid stream...</p>
        </div>
      )}
    </div>
  );
}
