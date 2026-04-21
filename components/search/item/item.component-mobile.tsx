"use client";
import React from 'react'
import { useEffect, useRef, useState } from "react";

import axios from "axios";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointerClick } from "lucide-react";

import {useAppDispatch} from "@/providers/ReduxProvider";
import {saveSelectedCard} from "@/redux/slices/stockSlice";
import {useSelector} from "react-redux";
import {GlobalState} from "@/redux/store";
import { FYERSAPI, FYERSAPIGETCQUOTE } from '@/libs/client';
import { StorageUtils } from '@/libs/cache';
import { CommonConstants, Quote } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import Chip from '@/components/common/textChip/chip.component'
import {saveCompanyData} from "@/redux/slices/stockSlice"
import {setTimestampChartData} from "@/redux/slices/timestampChartSlice"
import {API} from "@/libs/client"
import nifty50 from "../../tradeTicker/nifty-50";
import { FYERSAPINSECSV ,FYERSAPITHREESECQUOTE , FYERSAPIORDERBOOKSURL ,  FYERSAPITICKERACCESTOKEN, FYERSAPICOMPLYCUBEURL,
     FYERSAPIKYCORDER , FYERSAPISELLORDER , YAHOOCHARTURL} from '@/libs/client';
import { fetchRenderSuccess, QuoteState } from '@/redux/slices/renderDotcomStockSlice';
import TooltipLink from './TooltipLink';
import feedsMainApiResponse from './feedsmain.onrender.com.api.res.json'
import fechYahooChartResponse from './fetchYahooChart.json'
/*
{"message":"","code":200,"d":[{"n":"NSE:ICICIBANK-EQ","v":{"ask":0,"bid":1416.1,"chp":-0.64,"ch":-9.1,
"description":"NSE:ICICIBANK-EQ","exchange":"NSE","fyToken":"10100000004963",
"high_price":1421.5,"low_price":1403.6,"lp":1416.1,"open_price":1403.6,"original_name":"NSE:ICICIBANK-EQ",
"prev_close_price":1425.2,"short_name":"ICICIBANK-EQ","spread":0,"symbol":"NSE:ICICIBANK-EQ",
"tt":"1749945600","volume":7573103,"atp":1413.66},"s":"ok"}],
"s":"ok"}
*/
const getAlpaVantageStyleStock = (fyersQuote:any ) => {
      if(fyersQuote["d"] !== undefined && Array.isArray(fyersQuote["d"] )){
          let quoteArray = fyersQuote["d"] ; 
          let quoteEntry = quoteArray[0]["n"]; 
          let quoteVal = quoteArray[0]["v"];
          let ticker   = quoteVal["original_name"];
          let  volume  = quoteVal["volume"];
          let  price  = quoteVal["lp"] + ""; 
          let  change_amount   = quoteVal["ch"]+ "";
          let  change_percentage  = quoteVal["chp"]+"";
          let  exchange = quoteVal["exchange"];
         console.log("Fyers Qoute received for  "+quoteEntry );
          let fyersStock = {symbol : ticker  ,  ticker: ticker , volume: volume , price :price ,
               change_amount:change_amount , change_percentage:change_percentage ,exchange: exchange};
            return fyersStock ;

      }
      else { 
         console.log("Fyers Qoute parse failed  sending default  "  );
         let fyersStock = {symbol : "NSE:ICICIBANK-EQ"  ,  ticker: "NSE:ICICIBANK-EQ" , volume: "7573103" ,
           price :"1403.6" ,
               change_amount:"-9.1" , change_percentage:"-0.64" ,  exchange: "NSE" };
          return fyersStock ;
 
      }

}//{item }: { item: any }, {searchResults}:{searchResults:any}

const getRandomPrice = (symbol: string): number => {
  let k = 1000; // default fallback (UI-safe)

  switch (symbol) {
    case "ADANIENT": k = 2230; break;
    case "ADANIPORTS": k = 1490; break;
    case "APOLLOHOSP": k = 7010; break;
    case "ASIANPAINT": k = 2790; break;
    case "AXISBANK": k = 1230; break;
    case "BAJAJ-AUTO": k = 9000; break;
    case "BAJFINANCE": k = 1000; break;
    case "BAJAJFINSV": k = 2040; break;
    case "BEL": k = 390; break;
    case "BHARTIARTL": k = 2090; break;
    case "CIPLA": k = 1510; break;
    case "COALINDIA": k = 380; break;
    case "DRREDDY": k = 1270; break;
    case "DUMMYHDLVR": k = 2000; break;
    case "EICHERMOT": k = 7000; break;
    case "ETERNAL": k = 280; break;
    case "GRASIM": k = 2810; break;
    case "HCLTECH": k = 1640; break;
    case "HDFCBANK": k = 980; break;
    case "HDFCLIFE": k = 760; break;
    case "HINDALCO": k = 850; break;
    case "HINDUNILVR": k = 2280; break;
    case "ICICIBANK": k = 1350; break;
    case "ITC": k = 400; break;
    case "INFY": k = 1630; break;
    case "INDIGO": k = 5150; break;
    case "JSWSTEEL": k = 1070; break;
    case "JIOFIN": k = 290; break;
    case "KOTAKBANK": k = 2150; break;
    case "LT": k = 4070; break;
    case "M&M": k = 3600; break;
    case "MARUTI": k = 16410; break;
    case "MAXHEALTH": k = 1070; break;
    case "NTPC": k = 310; break;
    case "NESTLEIND": k = 1240; break;
    case "ONGC": k = 230; break;
    case "POWERGRID": k = 260; break;
    case "RELIANCE": k = 1560; break;
    case "SBILIFE": k = 2020; break;
    case "SHRIRAMFIN": k = 900; break;
    case "SBIN": k = 980; break;
    case "SUNPHARMA": k = 1740; break;
    case "TCS": k = 3280; break;
    case "TATACONSUM": k = 1180; break;
    case "TMPV": k = 350; break;
    case "TATASTEEL": k = 160; break;
    case "TECHM": k = 1610; break;
    case "TITAN": k = 3930; break;
    case "TRENT": k = 4060; break;
    case "ULTRACEMCO": k = 11490; break;
    case "WIPRO": k = 260; break;
    default : k=2000; break;
  }

  return Math.floor((Math.random() * 1.5) * 5) + k;
};


const SearchCardMobile = ({ item, onSelect }: any) => {
    const dispatch = useAppDispatch();
    const gainers = useSelector((state: GlobalState) => state.stock.gainers)
    const losers = useSelector((state: GlobalState) => state.stock.gainers)
      const router = useRouter();
      const [basePrice, setBasePrice] = useState (500);

      const [chartData, setChartData] = React.useState<any[]>([]);
      const [formattedQuote, setFormattedQuote] = React.useState<any>({});
    const [showChart, setShowChart] = React.useState(false);
    const [stockSymbol, setStockSymbol] = React.useState('');
    const [loadingChart, setLoadingChart] = React.useState(false);
    const [fyersQuoteWorked, setFyersQuoteWorked] = React.useState(false);
 const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
         const cacheRef = React.useRef<Record<string, any[]>>({}); // 🔥 cache
     const [show, setShow] = useState(false);
   const scraperFetchSymnol  = async (symbol:string ) => {
               const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      try {
            
    
            // Updated URL to version 'stable' or 'v1'
           // const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${TOKEN}`;
  //discard USA stocks from the selection 
       if(Array.isArray(nifty50) ) {
             let foundSym  = "";
              let foundT =   nifty50.filter(item => {    if( item.companyname.indexOf(symbol) >-1 ) {foundSym = item.symbol;  return item; }

                              });
                   let price = basePrice;
              
            if(foundT){
             price = getRandomPrice(foundSym) ;   
               // 1. Fetch the data from your new Render API https://feedsmain.onrender.com
            // Note: Using the equity endpoint as you provided
             const API = axios.create({
                    baseURL:  `https://api-nse-india-vbmd.onrender.com/api`,
                    timeout: 27000
                    });
                API.interceptors.request.use((config) => {
                    console.log("Request:", {
                    url: config.url,
                    method: config.method,
                    data: config.data,
                    headers: config.headers,
                    });
                    return config;
                });  
                     const result = await API.get('/equity/'+symbol.toUpperCase(), {
                    params: { symbol: symbol.toUpperCase() }
                    });
                    let res = result;
           //  const response = await fetch(`https://api-nse-india-vbmd.onrender.com/api/equity/${symbol.toUpperCase()}`);
             if (!res.status) {
                    throw new Error(`HTTP error: ${res.status}`);
                }

                const json = await res.data;

                console.log("API RESPONSE:", json);
                return json;

            }else { 
               console.log("Header searched stock could not be found in https://api-nse-india-vbmd.onrender.com NIFTY 50 ")
           }     

        }
          else { 
               console.log("Header searched stock could not be found in https://api-nse-india-vbmd.onrender.com and checked in NIFTY 50 ")
           }      
           // const response = await  placeMockOrder(req , res);  // axios.get(url);
            
        } catch (error:any ) {
            console.error("api-nse-india-vbmd.onrender.com/ Fetch Error:", error.response?.status);
            return null;
            /*res.status(error.response?.status || 500).json({ 
                error: "Market Data Unavailable",
                message: "Ensure your api-nse-india-vbmd.onrender.com/ is valid."
            });*/
        }

      
   }
   const apiResponseStructure = async  () => {

          console.log(` FEEDS MAIN API RESPONSE STRUCTRUE  ${feedsMainApiResponse}`);

   }
   const netlifyFecthYahooChartStructure  = async () => { 
         
       console.log(` FETCH YAHOO CHART  RESPONSE STRUCTRUE  ${fechYahooChartResponse}`);

   }
   //Create Chart Fetch Function
    const fetchChart = async (symbol: string) => {
        if (cacheRef.current[symbol]) {
            setChartData(cacheRef.current[symbol]);
            return;
        }

        try {
            setLoadingChart(true);

            //discard USA stocks from the selection 
          if(Array.isArray(nifty50) ) {
             let foundSym  = "";
              let foundT =   nifty50.filter(item => {    if( item.companyname.indexOf(symbol) >-1 ) {foundSym = item.symbol;  return item; }

                              });
                   let price = basePrice;
              
            if(foundT){
             price = getRandomPrice(foundSym) ;   
                   //* this will not get the chart data 

                   
              const API = axios.create({
                    baseURL:  `https://feedsmain.onrender.com/api`,
                    timeout: 27000
                    });
                API.interceptors.request.use((config) => {
                    console.log("Request:", {
                    url: config.url,
                    method: config.method,
                    data: config.data,
                    headers: config.headers,
                    });
                    return config;
                });  
                apiResponseStructure();
                     const result = await API.get('/equity/'+symbol.toUpperCase(), {
                    params: { symbol: symbol.toUpperCase() }
                    });
                    let res = result;
         /*   const res = await fetch(
                `https://feedsmain.onrender.com/api/equity/${symbol.toUpperCase()}`
            );*/
       
            if (!res.status) {
                    throw new Error(`HTTP error: ${res.status}`);
                }

               const json = await res.data;

                console.log("API RESPONSE:", json);

                // ✅ IMPORTANT CHECK
                if (!json || !json.info || !json.priceInfo) {
                   // throw new Error("Invalid API structure");
                    console.log("Artillery Invalid API structure")
                         const jsonScrap = await  scraperFetchSymnol(symbol);
                           
                          if (!jsonScrap || !jsonScrap.info || !jsonScrap.priceInfo) {
                                console.log("Scraper Invalid API structure")
                          }
                          else { 

                              setSymbolQuote(symbol, json)
                          }
                        



                }else {
                        setSymbolQuote(symbol, json)
                        
                }

               

            } else { 
               console.log("Header searched stock could not be found in NIFTY 50 ")
           }      
         
           }  
           else { 
               console.log("Header searched stock could not be checked in NIFTY 50 ")
           }                
        

        } catch (err) {
            console.error("Chart https://feedsmain.onrender.com/api/equity fetch error", err);
            const json =   scraperFetchSymnol(symbol);
              setSymbolQuote(symbol, json)

        } finally {
            setLoadingChart(false);
        }
    };
    const setSymbolQuote = (symbol: string , json : any ) => {

           if(json !==null && json !== undefined) {
              
           // ✅ IMPORTANT CHECK
           if ( !json.info || !json.priceInfo || !json.industryInfo) {


                }
           else { 
           // 🔥 Convert your API → chart format
            const formatted = [];

            const formattedQuote: Quote = {
                companyName: json.info.companyName,
                symbol: json.info.symbol,
                sector: json.industryInfo?.sector,
                latestPrice: json.priceInfo.lastPrice,
                open: json.priceInfo.open,
                high: json.priceInfo.intraDayHighLow?.max,
                low: json.priceInfo.intraDayHighLow?.min,
                close: json.priceInfo.close,
                week52High: json.priceInfo.weekHighLow?.max,
                week52Low: json.priceInfo.weekHighLow?.min,
            };
            setFormattedQuote(formattedQuote)
            let t : QuoteState = {
                loading:false, error:'', symbol:formattedQuote.symbol  , meta: formattedQuote, price:formattedQuote.latestPrice
            }
            // THIS IS not working as of now 
            dispatch(fetchRenderSuccess( { symbol: t.symbol! , meta: t.meta }      ))
            // store in local sotrage 
              StorageUtils._save(CommonConstants.LASTSTOCKQUOTENSEYAHOO, t);

            if (json?.priceInfo?.intraDayHighLow) {
                formatted.push({
                    date: "Low",
                    price: json.priceInfo.intraDayHighLow.min
                });
                formatted.push({
                    date: "Current",
                    price: json.priceInfo.lastPrice
                });
                formatted.push({
                    date: "High",
                    price: json.priceInfo.intraDayHighLow.max
                });
            }

            cacheRef.current[symbol] = formatted;
            setChartData(formatted);
              }
          }
          else {
               console.log(" Equity Data for  "+symbol + " not avalialble ")
          }

    }
    const tryFyersGetuote =  async (symbol:any ) => {
         const res1 = StorageUtils._retrieve(CommonConstants.fyersToken);
           let auth_code ='';
           // res1.data['auth_code'];
            const fetchAuthToken = async () => {
            try {
                       // IFF Logged in fetch the BUY Book 
                 console.log("itemcomponent FYERS AuthToken BACKEND CALL STARTED  ")
            if (res1.isValid && res1.data !== null &&  res1.data !== undefined) {
                
                let auth_code = res1.data['auth_code'];
                if (auth_code&& auth_code !== null && auth_code !== undefined) {
                    console.log("itemcomponent User is  Authorized ");
                    console.log("itemcomponent User fetch  profile authoristaion ");
                    
                const res = await API.get(FYERSAPITICKERACCESTOKEN , {params: { "auth_code" : auth_code }});
                const text = await res.data ;
                StorageUtils._save(CommonConstants.recentBuyledOrderToken, text)
                console.log("itemcomponent User fyers access_token fetched  ");
                // GET THe ORDER BOOK 
              //  const resorderbook = await API.get(FYERSAPIORDERBOOKSURL , {params: { "auth_code" : auth_code }});
               // const orderData = await resorderbook.data ;
                // PARSE and SEGREGATE ORDER BOOK fill recentBuyOrderPlaced
                
            
                    // WHILE PLACEING ORDER WE DO NOT NEED THIS  DISABLE the PLACE ORDER BUTTON NOT NEEDED 
                return text;
              }// if auth_code 
            } // if res.isvalid 
            }
            catch(erer){
            console.log(" itemcomponent Auth token fetch Error ")
                return '';
            }
             const fetchSymbolQuote = async (acctoken:any ) => {
                         console.log("itemcomponent FYERS SYMBOL URL BACKEND CALL STARTED  ")
                  let apik   = CommonConstants.apiKey;
                        const res = await API.get(FYERSAPIGETCQUOTE , {params: { "auth_code" : auth_code, apikey : apik,
                     "symbol":symbol ,   }});  //   "access_token" : acctoken ,
                     let emptyQuote :any =   {
                                    "ch": 0,
                                    "chp": 0,
                                    "lp": 0,
                                    "spread": 0.05,
                                    "ask": 0,
                                    "bid": 0,
                                    "open_price": 0,
                                    "high_price": 0,
                                    "low_price": 0,
                                    "prev_close_price": 0,
                                    "atp": 0,
                                    "volume": 14942959,
                                    "short_name": "NOT-FOUND",
                                    "exchange": "NSE",
                                    "description": "NSE:NOT-FOUND",
                                    "original_name": "NSE:ONOT-FOUND",
                                    "symbol": "NSE:NOT-FOUND",
                                    "fyToken": "1XXXXXXXXXX045",
                                    "tt": "1623369600"
                               };
                  /*  {
                        "s": "ok",
                        "code": 200,
                        "d": [
                            {
                                "n": "NSE:ONGC-EQ",
                                "s": "ok",
                                "v": {
                                    "ch": -0.35,
                                    "chp": -0.28,
                                    "lp": 123.6,
                                    "spread": 0.05,
                                    "ask": 123.65,
                                    "bid": 123.6,
                                    "open_price": 123.95,
                                    "high_price": 126.6,
                                    "low_price": 122.5,
                                    "prev_close_price": 122.2,
                                    "atp": 120.6
                                    "volume": 14942959,
                                    "short_name": "ONGC-EQ",
                                    "exchange": "NSE",
                                    "description": "NSE:ONGC-EQ",
                                    "original_name": "NSE:ONGC-EQ",
                                    "symbol": "NSE:ONGC-EQ",
                                    "fyToken": "10100000003045",
                                    "tt": "1623369600"
                                }
                            }
                        ]
                        }*/
                            let data =    res.data;
                             let quote = (data.d  && Array.isArray(data.d) && (data.d.length > 0) ? data.d[0].v : emptyQuote);
                         const formatted = {
                            companyName: quote.short_name,
                            symbol: symbol.toUpperCase(),
                            sector: quote.sector || "N/A",
    
                            latestPrice: quote.lp,
                            open: quote.open_price,
                            high: quote.high_price,
                            low: quote.low_price,
                            close: quote.prev_close_price,
    
                            week52High: 0,
                            week52Low: 0
                            };
                             setFormattedQuote(formatted)
                            let t : QuoteState = {
                                loading:false, error:'', symbol:formatted.symbol  , meta: formatted, price:formatted.latestPrice
                            }
                            // THIS IS not working as of now 
                           // dispatch(fetchRenderSuccess(    t  ))
                           dispatch(fetchRenderSuccess( { symbol: t.symbol! , meta: t.meta }      ))
                            // store in local sotrage 
                            StorageUtils._save(CommonConstants.LASTSTOCKQUOTENSEYAHOO, t);            
                            setFyersQuoteWorked(true);
                                              //   StorageUtils._save(CommonConstants.fyersToken,data)                           
             }


                 fetchAuthToken().then(async aces_token   => { 
                       await  fetchSymbolQuote(aces_token);
                            console.log("FYERS SYMBOLE QUOTE WORKED ")
                     });
    

        };


    }       
    const  fetchYahooQuote  = async (symbol:any ) => { 
     try {
            setLoadingChart(true);

            //discard USA stocks from the selection 
          if(Array.isArray(nifty50) ) {
             let foundSym  = "";
              let foundT =   nifty50.filter(item => {    if( item.companyname.indexOf(symbol) >-1 ) {foundSym = item.symbol;  return item; }

                              });
                   let price = basePrice;
              
            if(foundT){
             price = getRandomPrice(foundSym) ;   
                   //* this will not get the chart data 
              //try Fyers GEOUTE before , YAHOO get quote 
                tryFyersGetuote(symbol); 
               if(!fyersQuoteWorked ) {
                
              const API = axios.create({
                    baseURL:  `https://onedinaar.com/.netlify/functions/netlifystockfyersbridge/api`,
                    timeout: 27000
                    });
                API.interceptors.request.use((config) => {
                    console.log("Request:", {
                    url: config.url,
                    method: config.method,
                    data: config.data,
                    headers: config.headers,
                    });
                    return config;
                });  
                     const result = await API.get('/fetchQuote', {
                    params: { symbol: symbol.toUpperCase() }
                    });
                    let res = result;
         /*   const res = await fetch(
                `https://feedsmain.onrender.com/api/equity/${symbol.toUpperCase()}`
            );*/
       
            if (!res.status) {
                    throw new Error(`HTTP error: ${res.status}`);
                }
               const json = await res.data;
                console.log("API RESPONSE:", json);
                // ✅ IMPORTANT CHECK
                if (!json || !json.info || !json.priceInfo) {
                   // throw new Error("Invalid API structure");
                    console.log("Yahoo Quote Invalid API structure")
                    /*     const jsonScrap = await  scraperFetchSymnol(symbol);
                           if (!jsonScrap || !jsonScrap.info || !jsonScrap.priceInfo) {
                                console.log("Scraper Invalid API structure")
                          }
                          else { 
                              setSymbolQuote(symbol, json)
                          }*/
                }else {
                        setSymbolQuote(symbol, json)
                }
            }

            } else { 
               console.log("Header searched stock could not be found in NIFTY 50 ")
             }      
         
            }
           else { 
               console.log("Header searched stock could not be checked in NIFTY 50 ")
           }                
        

        } catch (err) {//`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=price,summaryProfile,defaultKeyStatistics`
            console.error("Chart"+ ".netlify/functions/netlifystockfyersbridge/api"+'/fetchQuote'+symbol.toUpperCase()
                +"  fetch error", err);
            //const json =   scraperFetchSymnol(symbol);
            //  setSymbolQuote(symbol, json)
               //  console.error("Quote API Error:", error.message);
                try {   
                    let urls = [ `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}.NS` , 
                                    `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}.NS?modules=price,summaryProfile,defaultKeyStatistics`							
                    ]
                    for ( let uIdx =0 ; uIdx < 2; uIdx++){
                            let url = urls[uIdx];
                        const response = await axios.get(url, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                            'Accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.9',
                            'Connection': 'keep-alive'
                        }
                        });
                            const result = response.data?.quoteResponse?.result?.[0];
                            if (!result) {
                                 console.log("No data found "+url);
                           // return res.status(404).json({ error: "No data found" });
                            }
                            else { 
                            // ✅ Clean mapping (frontend ready)
                            const formatted = {
                            companyName: result.longName,
                            symbol: symbol.toUpperCase(),
                            sector: result.sector || "N/A",
    
                            latestPrice: result.regularMarketPrice,
                            open: result.regularMarketOpen,
                            high: result.regularMarketDayHigh,
                            low: result.regularMarketDayLow,
                            close: result.regularMarketPreviousClose,
    
                            week52High: result.fiftyTwoWeekHigh,
                            week52Low: result.fiftyTwoWeekLow
                            };
                            console.log("Yahoo Quote set "+url );
                                  setFormattedQuote(formatted)
                            let t : QuoteState = {
                                loading:false, error:'', symbol:formatted.symbol  , meta: formatted, price:formatted.latestPrice
                            }
                            // THIS IS not working as of now 
                           // dispatch(fetchRenderSuccess(    t  ))
                           dispatch(fetchRenderSuccess( { symbol: t.symbol! , meta: t.meta }      ))
                            // store in local sotrage 
                            StorageUtils._save(CommonConstants.LASTSTOCKQUOTENSEYAHOO, t);
                             const formattedNew = [];
                            if (result) {
                                formattedNew.push({
                                    date: "Low",
                                    price: result.regularMarketDayLow
                                });
                                formattedNew.push({
                                    date: "Current",
                                    price: result.regularMarketPrice
                                });
                                formattedNew.push({
                                    date: "High",
                                    price: result.regularMarketDayHigh
                                });
                            }

                           // cacheRef.current[symbol] = formatted;
                            setChartData(formattedNew);
                             }
                    }
                        
    
                }		
                catch(agg){
                        console.log(" Error fetch data   "+agg);
    
                }
 

        } finally {
            setLoadingChart(false);
        }

    }
    const handleMouseEnter = () => {
        let symbol = item['1. symbol'];
        symbol = symbol.includes('.') ? symbol.split('.')[0] : symbol;
            setStockSymbol(symbol);
        setShowChart(true);
        fetchChart(symbol);
        // CHECK that formattedQuote is set or not from above artilleryfeed2 and scraper remote calls 
        // Works best with new browsers
         if(   Object.keys(formattedQuote).length === 0 && formattedQuote.constructor === Object){
                // fecth Quote from the yahoo 
                fetchYahooQuote(symbol);

         }
        
    };

    const handleMouseLeave = () => {
        setShowChart(false);
    };
     const prepareChart = async (inChartData:any ) => {
         
       
        console.log("USER click PREPARE CHART , in SELECT CARD HOVER BUTTON ")
        try {   
          // GET THe YAHOO CHART 
          //{params: {  "id" : _id,                     "mobileNumber":mobileNumber ,  lastName:lastName, dob:dob,  firstName: firstName,  email:email  ,typeOfEnity:typeOfEnity    }}
         const API = axios.create({
            baseURL: 'https://onedinaar.com/.netlify/functions/netlifystockfyersbridge/api',
            timeout: 27000
            });
         API.interceptors.request.use((config) => {
            console.log("Request:", {
            url: config.url,
            method: config.method,
            data: config.data,
            headers: config.headers,
            });
            return config;
        });  
        
         /*   return res.json({
            symbol,
            ticker,
            count: formattedData.length,
            data: formattedData
        });   
        
        OR    return res.status(statusCode).json({
            error: statusCode === 404
                ? "Stock not found"
                : "Yahoo API failed"
        });
        
        */
          const yahooChart = await API.get('/fetchYahooChart', {
                    params: { symbol: stockSymbol }
                    });

            const stockYahooChartData = await yahooChart.data ;

           console.log("AXIOS Yahoodata  "+YAHOOCHARTURL+"/"+stockSymbol + " SUCCESS .......START "   )     
           
            console.log( JSON.stringify(stockYahooChartData))    

             console.log("AXIOS Yahoodata  "+YAHOOCHARTURL+"/"+stockSymbol + " SUCCESS ....... END "  )         

/* SAMPLE response 
BEL.NS {"chart":{"result":[{"meta":{"currency":"INR","symbol":"BEL.NS","exchangeName":"NSI","fullExchangeName":"NSE","instrumentType":"EQUITY",
"firstTradeDate":1025495100,"regularMarketTime":1775815200,"hasPrePostMarketData":false,"gmtoffset":19800,"timezone":"IST",
"exchangeTimezoneName":"Asia/Kolkata","regularMarketPrice":442.3,"fiftyTwoWeekHigh":473.45,"fiftyTwoWeekLow":285,"regularMarketDayHigh":447.45,
"regularMarketDayLow":440.45,"regularMarketVolume":10833065,"longName":"Bharat Electronics Limited","shortName":"BHARAT ELECTRONICS LTD",
"chartPreviousClose":439.75,"previousClose":439.75,"scale":3,"priceHint":2,"currentTradingPeriod":
{"pre":{"timezone":"IST","start":1776051900,"end":1776051900,"gmtoffset":19800},"regular":{"timezone":"IST","start":1776051900,"end":1776074400,"gmtoffset":19800},
"post":{"timezone":"IST","start":1776074400,"end":1776074400,"gmtoffset":19800}},"tradingPeriods":
[[{"timezone":"IST","start":1775792700,"end":1775815200,"gmtoffset":19800}]],"dYAHataGranularity":"5m","range":"1d",
"validRanges":["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"]},"timestamp" 


*/        netlifyFecthYahooChartStructure();

           dispatch(setTimestampChartData({  symbol: stockSymbol, data:      stockYahooChartData.data} ));
           // AGAIN DISPATCH the update localStorage 
           // StorageUtils._save(CommonConstants.LASTSTOCKQUOTENSEYAHOO, t);
                const cachedQuote = StorageUtils._retrieve(CommonConstants.LASTSTOCKQUOTENSEYAHOO);
            //     if ((cachedQuote !==undefined && cachedQuote !== null ) && cachedQuote.isValid && cachedQuote.data ) {    
                 let finalQuote:any  =    (formattedQuote && formattedQuote.symbol ) ?  formattedQuote :   (cachedQuote !==undefined && cachedQuote !==null ) ?  cachedQuote.data  : undefined  ;
                 //     if (((cachedQuote !==undefined && cachedQuote !== null ) && cachedQuote.isValid && cachedQuote.data )|| 
                 //         (formattedQuote !== undefined && formattedQuote !== null)) {
                      if (((finalQuote !==undefined && finalQuote !== null ) )) {
                        //setCacheLastQuote(cached.data);
                        let quoteData = finalQuote;
                        if(quoteData !==undefined && quoteData !== null  ){
                            // CHECK and MATCH the Quote and Char symbol 
                            let cQouteSymbol: string = quoteData.symbol;
                            let chartSymbol : string  = stockYahooChartData.symbol;
                            if(cQouteSymbol.toUpperCase().trim() === (chartSymbol.toUpperCase().trim()) ){
                                // THIS VERIFIES the CHART is of the SAME sYMBOLS 
                                dispatch(fetchRenderSuccess( { symbol: cQouteSymbol , meta: quoteData }      ))
                              console.log(` verified both Chart and Quote symbols match dispatching  fetchRenderSuccess( { symbol: cQouteSymbol , meta: quoteData }      )`)         
                              console.log(` Chart ${JSON.stringify(stockYahooChartData.data)} and Quote symbols ${JSON.stringify(quoteData)}      )`)   
                              // IF      cachedQuote is undefined but formattedQuote is not save it 
                              if (!cachedQuote   ){
                                 let t : QuoteState = {
                                       loading:false, error:'', symbol:formattedQuote.symbol  , meta: formattedQuote, price:formattedQuote.latestPrice
                                     }
                                    StorageUtils._save(CommonConstants.LASTSTOCKQUOTENSEYAHOO, t);
                                console.log(`   Quote CommonConstants.LASTSTOCKQUOTENSEYAHOO saved  ${JSON.stringify(t)}      )`)        

                              }

                            }
                                /*setCompanyName(quoteData.meta?.companyName);
                                             setSymbol(quoteData.meta?.symbol);
                                             setSector(quoteData.meta?.sector);
                                             setHigh(quoteData.meta?.high);
                                             setLow(quoteData.meta?.low);
                                             setOpen(quoteData.meta?.open);
                                             setClose(quoteData.meta?.close);
                                             setWeek52High(quoteData.meta?.week52High);
                                             setWeek52Low(quoteData.meta?.week52Low);
                                             */
                        }
                        
                                            
                      }
               //       } 

     } catch(netlierr){
                     console.log("USER click PREPARE CHART   "+YAHOOCHARTURL+"/"+stockSymbol + " FAiled  "+JSON.stringify(netlierr))
     }
         // this data is just 
     }
  
      /*  <Link href={`/company/${ ticker}`} onClick={() => {
            dispatch(saveSelectedCard({...stock, ticker:ticker}))
        }}>
     */
    return (  <>      <div className="relative w-full"> 
      {/*  <TooltipLink parentMouseEnter={handleMouseEnter} parentMouseLeave={handleMouseLeave} console.log( " ToolTip Link Clicked ")}}
              parentOnClick={() => {    () => !isMobile && handleMouseEnter()   () => !isMobile && ()  */}
         <Link href={{
            pathname: `/`
        }}      
         onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}      
                onClick={ () => { 
                  let data;
                   ( async () => {
                    //{params: {function: 'TOP_GAINERS_LOSERS' , apikey:CommonConstants.apiKey}}
                     let tokenauth = StorageUtils._retrieve(CommonConstants.fyersToken);
                     let auth_code ='';
                    if (tokenauth.isValid && tokenauth.data !== null && tokenauth.data !== undefined) {
                        console.log("User is Authorized ");
                          auth_code = tokenauth.data['auth_code'];
                    }
                  //let res =  await FYERSAPI.get('/fyerscallback' )
                   let symbol  = item['1. symbol'] ;
                   console.log("item['1. symbol']  "+symbol);
                  let sy = item['1. symbol'].substring(0, item['1. symbol'].indexOf(   "."));
                  
                   sy   = (sy=='' || sy === undefined) ? symbol: sy;
                   console.log("symbol "+sy);
                   // sanve the symbole for StockCandleChart to get it 
                     StorageUtils._save (CommonConstants.companySymbolStockChart,sy);
                        let stockChartSym = StorageUtils._retrieve(CommonConstants.companySymbolStockChart);
                    if (stockChartSym.isValid && stockChartSym.data !== null) {
                        console.log("Stock Chart Symbol "+ stockChartSym.data);
                           stockChartSym.data ;
                    }
                   // '/fyersgetquote' 
                 // let res =     await FYERSAPI.get('/fyersquicklogin', {params: {auth_code :auth_code , symbol:sy , apikey:CommonConstants.apiKey}})
                  let res =     await Promise.resolve({
                                    data:     {
                                      /*status: "ok",
                                      source: "mock",
                                      symbol: sy,
                                      exchange: "NSE",
                                      price: 512.35,
                                      open: 505.1,
                                      high: 520.4,
                                      low: 498.6,
                                      close: 510.2,
                                      volume: 1234567,
                                      timestamp: Date.now()*/

                                      "Meta Data": {
                                            "1. Information": "Intraday (5min) open, high, low, close prices and volume",
                                            "2. Symbol": "IBM",
                                            "3. Last Refreshed": "2025-12-19 19:55:00",
                                            "4. Interval": "5min",
                                            "6. Time Zone": "US/Eastern"
                                        },
                                        "Time Series (5min)": {
                                            "2025-12-19 19:55:00": {
                                                "1. open": "301.0000",
                                                "2. high": "301.5800",
                                                "3. low": "301.0000",
                                                "4. close": "301.5111",
                                                "5. volume": "27"
                                            },
                                            "2025-12-19 19:50:00": {
                                                "1. open": "301.5800",
                                                "2. high": "301.6800",
                                                "3. low": "301.5800",
                                                "4. close": "301.6800",
                                                "5. volume": "13"
                                            },
                                    }  } 
                                  });
                  //           await FYERSAPI.get('/apinseindia', {params: {auth_code :auth_code , symbol:sy , apikey:CommonConstants.apiKey}})
                  //  popupCenter(FYERSAPILOGINURL, "Fyers Signin")

                  let data :any = await res .data; 
                  console.log("click data "+JSON.stringify(data))
                  if( data ===undefined){
                    data =  gainers[0]; // gainers.map((elem: any) => elem.ticker === "SBET")
                    if (!data.length) {
                        data = losers.map((elem: any) => elem.ticker === item['1. symbol'])
                    }
                    if (data.length == 1) {
                        console.log( "click data length ==1 : "+JSON.stringify(data))
                        dispatch(saveSelectedCard(data[0]))
                    }
                    console.log( "click data "+JSON.stringify(data))
                    console.log( "click item "+JSON.stringify(item))
                    if( item !==undefined){
                       if (!data.length) {
                          let stock =  data["2. symbol"];
                          let ticker = stock ;///==="IBM" ? sy :"";
                            ticker  = sy;
                           StorageUtils._save (CommonConstants.companyDataCacheKey,data);
                             StorageUtils._save (CommonConstants.companySymbolStockChart,sy);
                          // this will allow the 
                          //  const dataFromCache = StorageUtils._retrieve(CommonConstants.companyDataCacheKey)
                          // to retrive properly when router hits `/company/${ticker}`
                           dispatch(saveCompanyData(data))

                           dispatch(saveSelectedCard({ ...stock, ticker:ticker }));
                           //  router.push(`/company/${ticker}`);
                           router.push(`/`);
                            onSelect();
                         //  dispatch(saveSelectedCard(data))
                       }
                       else {  dispatch(saveSelectedCard(data[0]));
                       }
                    }
                  }
                  else {
                     console.log( "data not undefined "+JSON.stringify(data.length))
                      if (data.length === undefined) {
                          //let stock =    data["Meta Data"]["2. Symbol"]; //data['2. symbol'];
                          let stock =    data["Meta Data"]; // ["2. Symbol"]; //data['2. symbol'];
                          if(stock !== undefined){
                            let ticker = stock["2. Symbol"];
                            if(ticker !== undefined){
                             // ticker = stock ;///==="IBM" ? sy :"";
                             console.log( "stock "+JSON.stringify(stock))
                                ticker = sy;
                             console.log( "ticker "+JSON.stringify(ticker))
                             console.log( "{ ...stock, ticker:ticker } "+JSON.stringify({ ...stock, ticker:ticker }))
                             StorageUtils._save (CommonConstants.companyDataCacheKey,data);
                            // this will allow the 
                            //  const dataFromCache = StorageUtils._retrieve(CommonConstants.companyDataCacheKey)
                            // to retrive properly when router hits `/company/${ticker}`
                            //  dispatch(saveCompanyData(data))
                              // dispatch(saveSelectedCard({ ...stock, ticker:ticker }));
                             let quoteResponse  = undefined;
                                let quoteData = undefined; ;
                              try {  
                                quoteResponse =     await Promise.resolve({
                                    data:     {
                                      /*status: "ok",
                                      source: "mock",
                                      symbol: sy,
                                      exchange: "NSE",
                                      price: 512.35,
                                      open: 505.1,
                                      high: 520.4,
                                      low: 498.6,
                                      close: 510.2,
                                      volume: 1234567,
                                      timestamp: Date.now()*/
                                    } }) ;

                             // await FYERSAPI.get('/fyersgetquote', {params: {auth_code :auth_code , symbol:sy , apikey:CommonConstants.apiKey}})
                            
                                  quoteData= await quoteResponse.data; 
                             }
                             catch(erre){
                                   console.log("quoteData FYERSAPI.get('/fyersgetquote' failed " );
                             }
                             let  alphaStock =   getAlpaVantageStyleStock(quoteData); 

                             dispatch(saveSelectedCard({ ...alphaStock, ticker:ticker }));
                             console.log("quoteData FYERSAPI.get('/fyersgetquote'  "+JSON.stringify(quoteData));
                             // router.push(`/company/${ticker}`);
                             router.push(`/`);
                               onSelect();
                            }
                            else {
                               console.log( "Meta Data / 2. Symbol not visible ticker not set ")
                            }
                            
                          }
                          else {
                             console.log( "/fyersquicklogin symbol  "+sy+" failed ")
                          }
                       //   let ticker = stock;
                         //  console.log( "stock "+JSON.stringify(stock))
                         //  console.log( "ticker "+JSON.stringify(ticker))
                         //   console.log( "{ ...stock, ticker:ticker } "+JSON.stringify({ ...stock, ticker:ticker }))
                         //  dispatch(saveSelectedCard({ ...stock, ticker:ticker }));
                         //    router.push(`/company/${ticker}`);
                         //  dispatch(saveSelectedCard(data))
                       }
                      
                  }
                  return res;
                }) ();
                //const result =  Promise.all([    fyerLoginProm()]);  
                //result.then((res) => {
                //    let data = res[0].data; 
                //    console.log("click data "+JSON.stringify(data))
               // });
                 // data = gainers.map((elem: any) => elem.ticker === item['1. symbol'])
                
              }}
               className="flex flex-col md:flex-row w-full gap-2 md:gap-4 px-3 py-3 rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800  cursor-pointer ">

                  {/* LEFT SIDE */}
            <div className="flex flex-col flex-1 min-w-0">
                   {/** {( isMobile ) && (  )}*/}
                   <Chip key={item} isSelected={false} text={'FETCH'} onClick={() => {
                                               let symbol = item['1. symbol'];
                                   symbol = symbol.includes('.') ? symbol.split('.')[0] : symbol; 
                                fetchYahooQuote(symbol)
                                           }}/>
                    {/*    <button  onClick={() =>  {  
                            let symbol = item['1. symbol'];
                             symbol = symbol.includes('.') ? symbol.split('.')[0] : symbol; 
                                fetchYahooQuote(symbol)
                              } }  className={`   text-white dark:bg-white dark:text-black `} > FETCH 

                             </button> */}
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                {item['1. symbol']} ({item['8. currency']})
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                {item['5. marketOpen']} - {item['6. marketClose']}
                </p>
            </div>

            {/*  <div className='text-left md:text-right w-full md:w-auto'>
                <p className='text-sm text-black dark:text-white'>{item['2. name']}</p>
                <p className='text-xs text-black dark:text-white'>{item['4. region']}</p>
            </div>*/}
               {/* RIGHT SIDE */}
            <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
                
                {/* Company Info */}
                <div className="text-left md:text-right">
                <p className="text-sm text-gray-800 dark:text-gray-200 truncate max-w-[140px] md:max-w-none">
                    {item['2. name']}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item['4. region']}
                </p>


                
                </div>
             
                
            {/* Chart / Action */}
            <div className="flex items-center">
                {/* 🔥 Hover Chart */}
                {( showChart || isMobile ) && (
                     <div className="flex items-center justify-center w-[90px] h-[40px]">
                        {loadingChart ? (
                             <p className="text-xs text-gray-500 dark:text-gray-400">   Loading...</p>
                        ) : (
                             <button  onClick={() => { if(isMobile ) { 
                                        let symbol = item['1. symbol'];
                                           symbol = symbol.includes('.') ? symbol.split('.')[0] : symbol; 
                                         fetchYahooQuote(symbol);
                                         prepareChart(chartData);
                                                    }
                                      else  { prepareChart(chartData); } 
                            
                                    }  }  className={`   text-xs font-medium
                                                px-3 py-1
                                                rounded-full
                                                bg-brandgreen text-white
                                                dark:bg-white dark:text-black
                                                hover:scale-105 transition
                            `} >     View

                                {/*<FetchChart data={chartData}  />*/}

                             </button>
                        )}
                    </div>
                )}
            </div>
         </div>

        </Link>
                        {/* ✅ Tooltip */}
            <AnimatePresence>
                {show && (
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 
                            px-3 py-1.5 rounded-lg shadow-md
                            bg-black text-white text-xs flex items-center gap-1.5
                            whitespace-nowrap z-50"
                >
                    <MousePointerClick size={14} />
                    Stay In Click

                    {/* Arrow */}
                    <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 
                                    w-2 h-2 bg-black rotate-45" />
                </motion.div>
                )}
            </AnimatePresence>
            </div>


       {/*   </TooltipLink> */} </>
    )
}

export default SearchCardMobile
