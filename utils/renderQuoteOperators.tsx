 
 
 "use client";
import React from 'react'
import { useEffect, useRef, useState ,  forwardRef} from "react";
 import nifty50 from "@/components/tradeTicker/nifty-50";
 //import nifty50 from "@comp/../tradeTicker/nifty-50";
 import axios from "axios";
 import { StorageUtils } from '@/libs/cache';
import { CommonConstants, Quote } from '@/utils/constants';
import { useAppDispatch } from '@/providers/ReduxProvider';
import { QuoteState, fetchRenderSuccess } from '@/redux/slices/renderDotcomStockSlice';
 const basePrice = 232;

 
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
export  
   const scraperFetchSymnol  = async (symbol:string ) => {
               
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
               // 1. Fetch the data from your new Render API https://api-nse-india-vbmd.onrender.com
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


 export const fetchChart = async (symbol: string ,setFormattedQuote:() => {} , dispatch:any) => {
      

        try {
        

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

                              setSymbolQuote(symbol, json,setFormattedQuote , dispatch)
                          }
                        



                }else {
                        setSymbolQuote(symbol, json,setFormattedQuote  , dispatch)
                        
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
              setSymbolQuote(symbol, json ,setFormattedQuote  , dispatch )

        } finally {
          //   setLoadingChart(false);
        }
    };

    export  const 
        setSymbolQuote = (symbol: string , json : any , setFormattedQuote:(q:any) => {} ,  dispatch:any ) => {
    
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
                dispatch(fetchRenderSuccess( { symbol: t.symbol! , meta: t.meta }   ))
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
    
          
                  }
              }
              else {
                   console.log(" Equity Data for  "+symbol + " not avalialble ")
              }
    
        }
/**
   sortedData, parsedData,
  sortedSocketData,
  userLogged,
  handleSort,
  getSortIndicator,
  handleSymbolClick,
 */
const GetSymbolQuotes = forwardRef(function GetSymbolQuotes({
 parentData
}:Props ,
  tableRef :any 
) {
      const [selectedSymbol, setSelectedSymbol] = useState(parentData.symbol);
     const [quote , setQuote ] = useState(null);
       const dispatch = useAppDispatch();
     const [stockSymbol, setStockSymbol] = React.useState('');
 useEffect( () =>{ 

    let isMounted = true;
        if (tableRef!  && tableRef.current!) { // && tableRef.current?
        const rect = tableRef.current.getBoundingClientRect();//current.getBoundingClientRect();
        console.log(" GetQuouteSymbol :", rect);
    }

 }
  , [])
       return  (<button className="button is-primary is-loading is-fullwidth" 
        
         onClick={ () => {
             let symbol =selectedSymbol;
             symbol = symbol.includes('.') ? symbol.split('.')[0] : symbol;
             setStockSymbol(symbol);
              
               fetchChart(symbol, parentData.setFormattedQuote, parentData.dispatch);

          
            } }>Retry </button>);
}
 

);
export default GetSymbolQuotes;
/*
export default function App ({ inSymbol }: Props)  { 
     const [quote , setQuote ] = useState(null);
       const dispatch = useAppDispatch();
     const [stockSymbol, setStockSymbol] = React.useState('');

    return  (<button className="button is-primary is-loading is-fullwidth" 
        
         onClick={ () => {
             let symbol =inSymbol;
             symbol = symbol.includes('.') ? symbol.split('.')[0] : symbol;
             setStockSymbol(symbol);
              
               fetchChart(symbol, setQuote);

          
            } }>Loading</button>);
}
*/
interface Props {
  parentData: any;
}
