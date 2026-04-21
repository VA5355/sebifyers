import React, { useEffect, useState } from "react";

import { Shield, Zap, Star, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useTransform , AnimatePresence} from "framer-motion";
import PositionSwipeHint from '@/app/PositionSwipeHint';
 import {StorageUtils} from "@/libs/cache";
import {CommonConstants} from "@/utils/constants";
import {API} from "@/libs/client"
import { FYERSAPINSECSV ,FYERSAPITHREESECQUOTE , FYERSAPIORDERBOOKSURL ,  FYERSAPITICKERACCESTOKEN, FYERSAPICOMPLYCUBEURL,
     FYERSAPIKYCORDER , FYERSAPISELLORDER , YAHOOCHARTURL} from '@/libs/client';

import MarketStatusSlider from '@/app/MarketStatusSlider';
import StockAreaChart from "@/components/search/item/StockAreaChart";
import  './GridCardsFilpYahooChart.css'
import GridCards from '@/app/GridCards';

import { useSelector } from 'react-redux';
import {setTimestampChartData , selectIsChartLoading as yahooChart } from "@/redux/slices/timestampChartSlice"
import { selectChartData, selectChartSymbol, selectIsChartLoading } from "@/redux/slices/timestampChartSlice"
import { selectRenderData, selectRenderSymbol, selectIsRenderLoading } from "@/redux/slices/renderDotcomStockSlice"
export default  function   GridCardsFilpYahooChart  ({positionData , activeIndexIn})   {
  const [activeTab, setActiveTab] = useState("chain");
   const [activeIndex, setActiveIndex] = useState(activeIndexIn);
  // Efficiently retrieve data using the selectors defined in the slice
  const chartData = useSelector(selectChartData);
  const symbol = useSelector(selectChartSymbol);
  const isLoading = useSelector(selectIsChartLoading);
  const isYahooChart = useSelector(yahooChart);

    const renderData = useSelector(selectRenderData);
  const renderSymbol = useSelector(selectRenderSymbol);
  const isRenderLoading = useSelector(selectIsRenderLoading);
  const [cacheLastQuote, setCacheLastQuote]  = useState({});
  const [localStoreSymbol , setLocalStoreSymbol] = useState('');
   
      // const [activeIndex, setActiveIndex] = useState<ActiveIndex>("NIFTY");
       const isActive = () => {};
         const flipVariants = {
               initial: {
                 rotateY: 90,
                 opacity: 0,
               },
               animate: {
                 rotateY: 0,
                 opacity: 1,
                 transition: { duration: 0.45, ease: "easeOut" },
               },
               exit: {
                 rotateY: -90,
                 opacity: 0,
                 transition: { duration: 0.35 },
               },
 }         ;
  useEffect ( () => {
      console.log("Active INDEX "+activeIndex

      ); 
          console.log("Yahoo Chart "+JSON.stringify(chartData)

      ); 
      if(renderData ==undefined || renderData == null){
        let lastStockQuoteNseYahoo  =  StorageUtils._retrieve(CommonConstants.LASTSTOCKQUOTENSEYAHOO)
          if (lastStockQuoteNseYahoo.isValid && lastStockQuoteNseYahoo.data !== null &&  lastStockQuoteNseYahoo.data !== undefined) {
                  let quoteData  = lastStockQuoteNseYahoo.data
                  setCacheLastQuote(quoteData)
                   console.log("QUOTE from LOCAL STORAGE   "+JSON.stringify(quoteData))
                      let actualSymbol =  quoteData.meta?.symbol; 
                  let stockSymbol =  quoteData.meta?.symbol;
             if(actualSymbol  !==undefined || renderData !== null ) {
              setLocalStoreSymbol(actualSymbol);

            

                  }
          }
      }
          console.log("isYahooChart "+isYahooChart

      ); 
        setActiveIndex( activeIndexIn);
  } , [activeIndexIn] );
 /*useEffect ( async () => {
      
     console.log("Yahoo Chart "+JSON.stringify(chartData)

      ); 
      if(renderData ==undefined || renderData == null){
        let lastStockQuoteNseYahoo  =  StorageUtils._retrieve(CommonConstants.LASTSTOCKQUOTENSEYAHOO)
          if (lastStockQuoteNseYahoo.isValid && lastStockQuoteNseYahoo.data !== null &&  lastStockQuoteNseYahoo.data !== undefined) {
                  let quoteData  = lastStockQuoteNseYahoo.data
                  setCacheLastQuote(quoteData)
                   console.log("QUOTE from LOCAL STORAGE   "+JSON.stringify(quoteData))
                  let actualSymbol =  quoteData.meta?.symbol; 
                  let stockSymbol =  quoteData.meta?.symbol;
             if(actualSymbol  !==undefined || renderData !== null ) {
              setLocalStoreSymbol(actualSymbol);

            

                  }


          }
      }
        

         
      
  } , [] );*/

  return (
      <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}   // 👈 KEY TRIGGERS FLIP
                variants={flipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="origin-center backface-hidden"
              >  
    <div className="w-full max-w-8xl mx-auto">
      {/* Tabs Header */}
      <div className="flex justify-center gap-2 border-b border-gray-300 mb-4">
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${
            activeTab === "chain"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("chain")}
        >
          Swipe Trades
        </button>

        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${
            activeTab === "swipe"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("swipe")}
        >
        Live Charts
        </button>
      </div>

      {/* Tab Content */}
      <div className="rounded-b-lg bg-white shadow-lg p-4">
        {activeTab === "chain" ? (
          <GridCards />
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <h3 className="text-lg font-semibold mb-2 text-indigo-600">
              <span className="flex justify-start  border-b border-gray-300"> Last Updates   </span>
            </h3>
               <span>  {cacheLastQuote.symbol}</span>
              {isLoading ?    <button className="button is-primary is-loading is-fullwidth" >Loading</button> : 
             (             <>   
              <div className="flex justify-center gap-2 border-b border-gray-300 mb-4">
              <StockAreaChart data={chartData} symbol={localStoreSymbol} /> 
              { cacheLastQuote  && (<div>
                    <ul className="view_list">
                        <li>Company Name: <span>{cacheLastQuote.meta?.companyName}</span></li>
                        <li>Symbol: <span>{cacheLastQuote.symbol}</span></li>
                        <li>Sector: <span>{cacheLastQuote.meta?.sector}</span></li>
                        <li>Current Price: <span id="currPrice">₹ {cacheLastQuote.meta?.latestPrice}</span></li>
                        <li>Open Price: <span>₹ {cacheLastQuote.meta?.open}</span></li> 
                        <li>High Price: <span>₹ {cacheLastQuote.meta?.high}</span></li> 
                        <li>Low Price: <span>₹ {cacheLastQuote.meta?.low}</span></li> 
                        <li>Close Price: <span>₹ {cacheLastQuote.meta?.close}</span></li>
                        <li>52 Week High: <span>₹ {cacheLastQuote.meta?.week52High}</span></li>
                        <li>52 Week Low: <span>₹ {cacheLastQuote.meta?.week52Low}</span></li>
                    </ul>
                </div>) }  
               </div>
                </>
              ) 
             }
             {/* <ComponentSymbolTradingViewRedirect />*/}
          </div>
        )}
      </div>
    </div>
              </motion.div>
        </AnimatePresence>
  );
}


/*
const GridCardsFilpYahooChart = () => {
  const cards = [
    {
      title: "Premium Slides",
      desc: "Advanced Option-Chain with deep Swipe + Cash in Profit facility with standard Brokers.",
      icon: <Shield className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Lightning Speed",
      desc: "Flash-fast execution powered by our proprietary sapphire-gold processing core.",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
    },
    {
      title: "Elite Trades",
      desc: "Exclusive access to platinum tier features and priority golden-glove reporting support.",
      icon: <Star className="w-6 h-6 text-blue-500" />,
    },
     {
      title: "Position Swipe",
      desc: "Exclusive access to platinum tier features and priority golden-glove reporting support.",
      icon: <Star className="w-6 h-6 text-blue-500" />,
    },
      
     
  ];

  return (  
    <div className="grid w-1/1 gap-4 mx-auto grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1 justify-center"> 
    {/-min-h-screen bg-slate-50 p-2 flex items-center justify-center -/}
      {/- 3-Column Grid Container  flex items-start justify-normal-/}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl w-full ml-24 z-[30] mobile-margin-car">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`
             group relative cursor-pointer
            ${index === 3 ? "md:col-span-1 md:col-start-4" : ""}
             `}
          >
            {/- The "Blueish Gold" Shadow Effect -/}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-amber-500/20 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            
            {/- The Main Card -/}
            <div className={`
                relative bg-white p-8 rounded-3xl border border-blue-50/50
                flex flex-col h-full
                ${index === 3 ? "min-h-[420px] bg-gradient-to-b from-white to-blue-50/40" : ""}
                shadow-[0_20px_50px_-12px_rgba(30,58,138,0.1),0_10px_30px_-10px_rgba(217,119,6,0.15)]
                group-hover:shadow-[0_30px_60px_-12px_rgba(30,58,138,0.2),0_15px_40px_-10px_rgba(217,119,6,0.25)]
                transition-all duration-300
              `}>
              { ( index === 3 ?  (
                       <PositionSwipeHint />
                ) :  
                
                 ( <>

                    {/- Icon Section -/}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center mb-6 border border-blue-100/50">
                      {card.icon}
                    </div>

                    {/- Text Content -/}
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-900 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-6">
                      {card.desc}
                    </p>
                </>))}

              

              {/- Bottom Decoration -/}
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-blue-600/80 group-hover:text-amber-600 transition-colors">
                  Learn More
                </span>
                <div className="p-2 rounded-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 max-w-7xl w-full ml-24  mobile-margin-car">  
          <MarketStatusSlider />
         </div>
    </div>
  );
};
*/
/*
export default function App() {
  return <GridCardsFilpYahooChart />;
}*/