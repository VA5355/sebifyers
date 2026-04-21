import React , { useEffect, useState } from "react";
 import {StorageUtils} from "@/libs/cache";
import {CommonConstants} from "@/utils/constants";
import { motion } from 'framer-motion';
import { Shield, Zap, Star, ArrowUpRight } from 'lucide-react';
import PositionSwipeHint from '@/app/PositionSwipeHint';
 import { useSelector } from 'react-redux';
import MarketStatusSlider from '@/app/MarketStatusSlider';
import  './GridCards.css'
import { selectRenderData, selectRenderSymbol, selectIsRenderLoading } from "@/redux/slices/renderDotcomStockSlice"
const GridCardsQuoteView = ({inRenderData , activeIndexIn, inSymbol }) => {
       const [companyName, setCompanyName]  = useState('');
    
      const renderData = useSelector( selectRenderData);   
    const [symbol, setSymbol]  = useState('');
    const [sector, setSector]  = useState('');
    const [latestPrice, setLatestPrice]  = useState(0);
    const [open, setOpen]  = useState(0);
    const [high, setHigh]  = useState(0);
    const [low, setLow]  = useState(0);
    const [close, setClose]  = useState(0);
    const [week52High, setWeek52High]  = useState(0);
    const [week52Low, setWeek52Low]  = useState(0);
        const [cacheLastQuote, setCacheLastQuote]  = useState( (lstQte  ) => {
              let lastStockQuoteNseYahoo  =  StorageUtils._retrieve(CommonConstants.LASTSTOCKQUOTENSEYAHOO)
                    /*  if(lastStockQuoteNseYahoo !==null && lastStockQuoteNseYahoo !== undefined ){
                               let quoteData  = lastStockQuoteNseYahoo
                               setCacheLastQuote(quoteData)
                                console.log("ESCAPE the renderData from artillery or scraper , QUOTE from LOCAL STORAGE   "+JSON.stringify(quoteData))
                                   let actualSymbol =  quoteData.meta?.symbol; 
                               let stockSymbol =  quoteData.meta?.symbol;
                         
                       } */
                      // .isValid && res1.data !== null &&  res1.data !== undefined
                       if(lastStockQuoteNseYahoo.isValid && lastStockQuoteNseYahoo.data !== null &&  lastStockQuoteNseYahoo.data !== undefined ){
                               let quoteData  = lastStockQuoteNseYahoo.data
                               //setCacheLastQuote(quoteData)
                                console.log("CHECK  isValid and data  QUOTE from LOCAL STORAGE   "+JSON.stringify(quoteData))
                              setCompanyName(quoteData.meta?.companyName);
                                 setSymbol(quoteData.meta?.symbol);
                                 setSector(quoteData.meta?.sector);
                                 setHigh(quoteData.meta?.high);
                                 setLow(quoteData.meta?.low);
                                 setOpen(quoteData.meta?.open);
                                 setClose(quoteData.meta?.close);
                                 setWeek52High(quoteData.meta?.week52High);
                                 setWeek52Low(quoteData.meta?.week52Low);
                                /* */
                                   let actualSymbol =  quoteData.meta?.symbol; 
                               let stockSymbol =  quoteData.meta?.symbol;
                            lstQte = quoteData;
                               return quoteData
                         /* if(actualSymbol  !==undefined || renderData !== null ) {
                           setLocalStoreSymbol(actualSymbol);
                          }*/
                       }else {
                         return {};
                       }
     });
   
  const cards = [
    {
      title: `Quote  ${companyName}`,
      desc: ` Stock ${symbol}`,
      icon: <Shield className="w-6 h-6 text-blue-600" />,
    },
    
      
     
  ];

useEffect(() => {
  const interval = setInterval(() => {
    const cached = StorageUtils._retrieve(CommonConstants.LASTSTOCKQUOTENSEYAHOO);

    if (cached?.isValid && cached?.data) {
          let quoteData = cached.data;
              setCompanyName(quoteData.meta?.companyName);
                                 setSymbol(quoteData.meta?.symbol);
                                 setSector(quoteData.meta?.sector);
                                 setHigh(quoteData.meta?.high);
                                 setLow(quoteData.meta?.low);
                                 setOpen(quoteData.meta?.open);
                                 setClose(quoteData.meta?.close);
                                 setWeek52High(quoteData.meta?.week52High);
                                 setWeek52Low(quoteData.meta?.week52Low);
    }
  }, 6000); // every 1 sec

  return () => clearInterval(interval);
}, []);



useEffect ( () => {

       const timer = setTimeout(() => {
                 const cached = StorageUtils._retrieve(CommonConstants.LASTSTOCKQUOTENSEYAHOO);
        
          if (cached.isValid && cached.data) {
            //setCacheLastQuote(cached.data);
            let quoteData = cached.data;
              setCompanyName(quoteData.meta?.companyName);
                                 setSymbol(quoteData.meta?.symbol);
                                 setSector(quoteData.meta?.sector);
                                 setHigh(quoteData.meta?.high);
                                 setLow(quoteData.meta?.low);
                                 setOpen(quoteData.meta?.open);
                                 setClose(quoteData.meta?.close);
                                 setWeek52High(quoteData.meta?.week52High);
                                 setWeek52Low(quoteData.meta?.week52Low);
                                
          }
    }, 300); // small UX delay

    return () => clearTimeout(timer);
      
        
  } , [inSymbol] );
  return (  
    <div className="grid w-1/1 gap-4 mx-auto grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1 justify-center"> 
    {/*min-h-screen bg-slate-50 p-2 flex items-center justify-center */}
      {/* 3-Column Grid Container  flex items-start justify-normal*/}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-4xl w-full ml-4 z-[30] mobile-margin-car">
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
            {/* The "Blueish Gold" Shadow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-amber-500/20 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            
            {/* The Main Card */}
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

                    {/* Icon Section */}
                    <div className="w-12 h-6 rounded-2xl bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center mb-4 border border-blue-100/50">
                      {card.icon}
                    </div>

                    {/* Text Content */}
                    <h6 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-900 transition-colors">
                      {card.title}
                    </h6>
                    <div className="text-slate-500 leading-relaxed mb-2">
                      {card.desc}

                                          { cacheLastQuote  && (<div  className={`
             group relative cursor-pointer
              "md:col-span-1  "}
             `}>
                  <div style={{ marginTop: '20px' }}>
                    <h1 id="view_title" className="font-bold mb-1  text-blue-600/80 group-hover:text-amber-600 title has-text-centered">
                       
                    </h1>
                   {/*   <StockAreaChart data={data} />*/}
                </div>

                    <ul className="view_list">
                        <li>Company Name: <span>{renderData?.companyName ?? companyName ?? cacheLastQuote.meta?.companyName}</span></li>
                        <li>Symbol: <span>{ renderData?.symbol ?? symbol ?? cacheLastQuote.symbol}</span></li>
                        <li>Sector: <span>{renderData?.sector ?? sector ?? cacheLastQuote.meta?.sector}</span></li>
                        <li>Current Price: <span id="currPrice">₹ {renderData?.latestPrice ?? latestPrice ?? cacheLastQuote.meta?.latestPrice}</span></li>
                        <li>Open Price: <span>₹ {renderData?.open ?? open ?? cacheLastQuote.meta?.open}</span></li> 
                        <li>High Price: <span>₹ {renderData?.high ?? high ?? cacheLastQuote.meta?.high}</span></li> 
                        <li>Low Price: <span>₹ {renderData?.low ?? low ?? cacheLastQuote.meta?.low}</span></li> 
                        <li>Close Price: <span>₹ {renderData?.close ?? close ?? cacheLastQuote.meta?.close}</span></li>
                        <li>52 Week High: <span>₹ {renderData?.week52High ?? week52High ?? cacheLastQuote.meta?.week52High}</span></li>
                        <li>52 Week Low: <span>₹ {renderData?.week52Low ?? week52Low ?? cacheLastQuote.meta?.week52Low}</span></li>
                    </ul>
                </div>) } 


                    </div>
                </>))}

              

              {/* Bottom Decoration */}
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
        
 
    </div>
  );
};

export  function App() {
  return <GridCardsQuoteView />;
}