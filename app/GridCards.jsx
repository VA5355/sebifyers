import React , { useEffect, useState } from "react";
 import {StorageUtils} from "@/libs/cache";
import {CommonConstants} from "@/utils/constants";
import { motion } from 'framer-motion';
import { Shield, Zap, Star, ArrowUpRight } from 'lucide-react';
import PositionSwipeHint from '@/app/PositionSwipeHint';
  import   useIsMobile   from "@/components/listing/tradeGrid/useIsMobile";
import MarketStatusSlider from '@/app/MarketStatusSlider';
import  './GridCards.css'
import  RefinedKYCModalImproved  from '@/app/RefinedKYCModalImproved';
import  TrialVirtualGoogleBusinesPayScreenImproved  from '@/app/TrialVirtualGoogleBusinesPayScreenImproved';
const GridCards = () => {
       const [companyName, setCompanyName]  = useState('');
    const [symbol, setSymbol]  = useState('');
    const [sector, setSector]  = useState('');
    const [latestPrice, setLatestPrice]  = useState(0);
    const [open, setOpen]  = useState(0);
    const [high, setHigh]  = useState(0);
    const [low, setLow]  = useState(0);
    const [close, setClose]  = useState(0);
    const [week52High, setWeek52High]  = useState(0);
    const [week52Low, setWeek52Low]  = useState(0);
const [isKYCOpen, setIsKYCOpen] = useState(false);
const [isTrialGooglePayOpen, setIsTrialGooglePayOpen] = useState(false);
 const [gpayamount, setGpayAmount] = useState(0);
  const [gpayOrderId, setGpayOrderId] = useState(null);
   const [gpayCustomer, setGpayCustomer] = useState(null);
           // CHECK MOBILE OR DESTOP
           const isMobile = useIsMobile();
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
 const preparePaymentScreen = () => {
  setIsKYCOpen(true); // First, trigger the professional KYC form
};

const showPaymentModal = ( payAmount , orderGenId, customerKyc) => { 
   setIsTrialGooglePayOpen(true); // trigger the professional google pay  form
           
}

 const closeTrialGooglePayScreen = () => {
    //setIsKYCOpen(true); // First, trigger the professional KYC form
    //reset all the pay variables 
    setGpayAmount(0);
    setGpayOrderId(0);
    setGpayCustomer(null);
    setIsTrialGooglePayOpen(false); // trigger the professional google pay  form
};

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
      
        
  } , [cacheLastQuote] );
  return (  
    <div className="grid w-1/1 gap-4 mx-auto grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1 justify-center"> 
    {/*min-h-screen bg-slate-50 p-2 flex items-center justify-center */}
      {/* 3-Column Grid Container  flex items-start justify-normal*/}
      <div className={` grid grid-cols-1 md:grid-cols-5 gap-8 max-w-7xl w-full ${ isMobile ? 'mt-4 ml-6' : 'ml-24' }  z-[30] mobile-margin-car` }>
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
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center mb-6 border border-blue-100/50">
                      {card.icon}
                    </div>

                    {/* Text Content */}
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-900 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-6">
                      {card.desc}
                    </p>
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
               

              { cacheLastQuote  && (<div  className={`
             group relative cursor-pointer
              "md:col-span-1  "}
             `}>
                  <div style={{ marginTop: '20px' }}>
                    <h1 id="view_title" className="font-bold mb-3  text-blue-600/80 group-hover:text-amber-600 title has-text-centered">
                        Last visited Stock Update {companyName}
                    </h1>
                   {/*   <StockAreaChart data={data} />*/}
                </div>

                    <ul className="view_list">
                        <li>Company Name: <span>{companyName ?? cacheLastQuote.meta?.companyName}</span></li>
                        <li>Symbol: <span>{ symbol ?? cacheLastQuote.symbol}</span></li>
                        <li>Sector: <span>{sector ?? cacheLastQuote.meta?.sector}</span></li>
                        <li>Current Price: <span id="currPrice">₹ {latestPrice ?? cacheLastQuote.meta?.latestPrice}</span></li>
                        <li>Open Price: <span>₹ {open ?? cacheLastQuote.meta?.open}</span></li> 
                        <li>High Price: <span>₹ {high ?? cacheLastQuote.meta?.high}</span></li> 
                        <li>Low Price: <span>₹ {low ?? cacheLastQuote.meta?.low}</span></li> 
                        <li>Close Price: <span>₹ {close ?? cacheLastQuote.meta?.close}</span></li>
                        <li>52 Week High: <span>₹ {week52High ?? cacheLastQuote.meta?.week52High}</span></li>
                        <li>52 Week Low: <span>₹ {week52Low ?? cacheLastQuote.meta?.week52Low}</span></li>
                    </ul>
                </div>) } 
                     {/* // 👈 THIS IS THE MAGIC */}
                <div className={` col-span-1   flex flex-col   ${isMobile ? "gap-6 mt-12 py-4": "gap-4"}   mt-6 sm:mt-8 lg:mt-0`}     >

                  {/* CTA bg-white rounded-2xl shadow-sm p-4  sm:mb-4 flex flex-col items-center text-center
                  below is desktop stick behavior */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-2xl shadow-sm p-4 sm:p-5    ${isMobile ? "  mt-12 py-4": ""}  flex flex-col items-center text-center    sticky lg:top-4 " `} 
                >
                  <span className="bg-brandblue text-white   text-xs sm:text-sm md:text-base  font-semibold rounded-lg px-3 py-2 "> {/* text-sm sm:text-base font-semibold rounded-lg px-3 py-2*/}
                    Try Virtual Trading
                  </span>

                  <button 
                    onClick={preparePaymentScreen}
                    className="mt-3 w-full bg-brandgreenlight hover:bg-white border border-transparent hover:border-brandgreen transition rounded-full py-2 flex items-center justify-center gap-2"
                  >
                    <span className="text-brandgreen text-xs  sm:text-sm  font-bold">
                      Trial with Fyers
                    </span>
                    <span className="bg-brandblue px-2 py-1 text-white text-xs  sm:text-sm  rounded-md">
                      Rates
                    </span>
                  </button>
                </motion.div>

               </div>
                         { isKYCOpen && (<RefinedKYCModalImproved 
                      isOpen={isKYCOpen} 
                      onClose={() => setIsKYCOpen(false)} 
                      onProceed={handleKYCSuccess} 
                    /> )}        
                    
                     { isTrialGooglePayOpen && (  <TrialVirtualGoogleBusinesPayScreenImproved 
                      amount={gpayamount} 
                      orderId={gpayOrderId} 
                      onClose={() => closeTrialGooglePayScreen(false)} 
                       
                    />) }    
      </div>
        

        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 max-w-7xl w-full ml-24  mobile-margin-car">  
          <MarketStatusSlider />
         </div>
    </div>
  );
};

export default function App() {
  return <GridCards />;
}
