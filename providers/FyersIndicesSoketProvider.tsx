import React, { createContext, useEffect, useState ,useContext  } from 'react';
import {AppDispatch, store} from '@/redux/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { saveEquities } from '@/redux/slices/equitySlice';
//import { saveTradeBook } from '@/redux/slices/tradeSlice';
import { saveIndicesBook } from '@/redux/slices/indicesSlice';
import io from 'socket.io-client';
import { StorageUtils } from '@/libs/cache';
import { CommonConstants } from '@/utils/constants';
import { FYERSAPINSECSV , FYERSAPITRADEBOOKURL , FYERSAPIMARKETFEEDRENDER_SOCKET} from '@/libs/client';
import { updateTickerMap } from "@/redux/slices/tickerSlice";
import { saveSensexBook } from '@/redux/slices/tickerSensexSlice';  
import { saveNiftyBook } from '@/redux/slices/tickerNiftySlice';  
import { saveBankNiftyBook } from '@/redux/slices/tickerBankNiftySlice';  
import { savePositionTickerBook } from '@/redux/slices/positionSlice';  
import { localISTDateTimeSec, setSensex , setNifty , setBankNifty } from '@/utils/indicesOperators';
//import isEqual from 'lodash.isequal';
const SOCKET_URL =   FYERSAPIMARKETFEEDRENDER_SOCKET; //'https://localhost:9384'; // Match server port
const SocketContext = createContext<any>(null);
//const EquityContext = React.createContext<any>(null);
export const socket = io(SOCKET_URL, {
   transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2000,
  timeout: 20000,
  withCredentials: true
});
export const useSocket = () => {
  return useContext(SocketContext);
};
export const  isEqual = (a: any, b: any): boolean => {
  // Same reference or primitive
  if (a === b) return true;

  // If either is null/undefined
  if (a == null || b == null) return false;

  // Different types
  if (typeof a !== typeof b) return false;

  // Handle Array
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // Handle Object
  if (typeof a === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!isEqual(a[key], b[key])) return false;
    }
    return true;
  }

  // Fallback for primitives
  return false;
};
export const FyersIndicesSoketProvider = ({children}: { children: React.ReactNode }) => {
   const [fyersQuery, setFyersQuery] = useState( '');
   // const [equityState, setEquityState] = useState ( );
   const [indicesState, setIndicesState] = useState(() => ({
     ...store
    }));
      let  tickerMap = useSelector((state :any )  => state.ticker.tickerMap);

    const updateIndicesState = (newData: Partial<typeof store>) => {
          setIndicesState(prev => ({
            ...prev,
            ...newData
          }));
    } ;
     let mt:any[] = [];
       //  const bestMacthes = { "bestMatches" :mt };
      let bestMacthes = { bestMatches: [...mt] }; // 🔁 clone to avoid frozen reference
  const [matches, setMatches] = useState<typeof bestMacthes>( );
  const [localMatches, setLocalMatches] = useState<any[]>([]);
  const [indicesData, setIndicesData] = useState< any[]>( );
 // const CSV_URL = 'https://drive.google.com/uc?export=download&id=1UjjQcDHiRIPxbzZOTZaWrLQjKtVzZjp_';
  const TRADE_URL  = [   FYERSAPITRADEBOOKURL  ] ;
  //'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersgettradebook'
  //const CSV_URL  = [   FYERSAPINSECSV +'/NSE_CM.csv' ] ;  //'http://localhost:8888/NSE_CM.csv' ,
  const CSV_URL  = [   FYERSAPINSECSV  ] ;  //'http://localhost:8888/NSE_CM.csv' ,
  const dispatch = useDispatch();

 // // Example usage
 //const line = "1010000000100,AMARA RAJA ENERGY MOB LTD,0,1,0.05,INE885A01032,0915-1530|1815-1915:,2023-11-28,,NSE:ARE&M-EQ,10,10,100,ARE&M,100,-1.0,XX,1010000000100,None";
 //const result = parseLine(line);
 const parseLine = (line: string): Record<string, any>  => {
          let parts:any  = line; //split(',');
         // console.log(" line "+JSON.stringify(line));
          // parts.symbol;  
              parts  = JSON.parse(JSON.stringify(line));
       //        console.log("parts.symbol "+parts['symbol']);  

          const type =  (parts['type'] !==undefined ?  parts['type']: "");          //0 'type' ==>  'cn',  'lit', 'sub',  'if' , 
     //         console.log("parts.clientId "+parts['clientId']);  
          const code =  (parts['code']!==undefined ?  parts['code']: "");             //code
       //    console.log("parts.ordertime "+parts['ordertime']);  
           const message  =  (parts['message']!==undefined ?  parts['message']: "");          // 2 message
        //    console.log("parts.orderNumber "+parts['orderNumber']);  
            const s =  (parts['s']!==undefined ?  parts['s']: "");          //3  s
        //     console.log("parts.exchangeOrderNo "+parts['exchangeOrderNo']);  
             const ltp =  (parts['ltp'] !==undefined ?  parts['ltp']: "");           //4  ltp
        //      console.log("parts.exchange "+parts['exchange']);  
              const symbol =  (parts['symbol'] !==undefined ?  parts['symbol']: "");          //5  symbol
 
            let indices  = {  
              
              ...type,
              ...code,
              ...message,
              ...s,
              ...ltp ,
              ...symbol,
             
                };
             //   console.log("trade line "+JSON.stringify(trads))
      return indices;
   };

  useEffect(() => {

    if (!socket.connected) {
      socket.connect();
    }
    socket.on("connect", () => {
      console.log("Connected to Fyers socket server");
    });

    socket.on("status", (msg) => {
      console.log("Socket status:", msg);
    });

    socket.on("market_data", (tick) => {
      /*
      Example tick:
      {
        symbol: "NSE:NIFTY50-INDEX",
        ltp: 24500
      }
      */
        try {
                let  data =  tick;
                if (data !== undefined) { // last price
                 const {ltp, symbol, type  } = data;   
                // setTickerData(data); 
                 if (typeof ltp !== "undefined" && typeof type !== "undefined") {
               //    console.log("Indices Quote availalbe.");
                            // ✅ generic updates (positions, cache)
                  StorageUtils._save(
                    `${CommonConstants.tickerIndicesCacheKey}:${symbol}`,
                    data
                  );
                   // ✅ update the tickerMap safely (isolate per symbol)
                /*  setTickerMap((prev) => ({
                    ...prev,
                    [symbol]: { ...data }, // clone to avoid mutation
                  })); */
                   let   tickerMap2 =undefined;
                    try {
                       // const result = await  dispatch(updateTickerMap(data));  //dispatch(orderBookData("")); 
                          dispatch(updateTickerMap(data));
                          const result = store.getState().ticker.tickerMap;
                        if(result !==undefined && result !== null && Array.isArray(result)){
                            tickerMap2 =     result ;
                                      //= useSelector(state => state.ticker.tickerMap);
                          if (!isEqual(tickerMap, tickerMap2)) {
                              if(Array.isArray(tickerMap2) && tickerMap2.length >0 ){ 
                                console.log(`loginFeed.actions.js ticker map from PositionGrid ${tickerMap} `)
                                tickerMap = tickerMap2;
                                console.log(`loginFeed.actions.js ticker map in loginFeed ${tickerMap2} `)
                              }
      
                          }
                        if(symbol === 'BSE:SENSEX-INDEX'){  setSensex(data,tickerMap); dispatch(saveSensexBook(data)) }
                        if(symbol === 'NSE:NIFTY50-INDEX'){ setNifty(data , tickerMap);  dispatch(saveNiftyBook(data))}
                        if(symbol ==='NSE:NIFTYBANK-INDEX'){  setBankNifty(data,tickerMap);  dispatch(saveBankNiftyBook(data))}
                        if(symbol.indexOf('4450CE')>-1){   console.log( `1 CE ${ JSON.stringify(data)}  `)}
                        //NOTE this is a single Tick Price for either of the Symbols 
                        // the 3 above are default , rest would be the onES WHERE THE POSITION'S ARE TAKEN 
                        // WE HAVE TO UPDATE THE POSITION BOOK SYMBOLS WITH THESE PRICES.
                        dispatch( savePositionTickerBook(data));
                      }
                 
                   /* onFeed(JSON.stringify( { "colorSENSEX": colorSENSEXClass , "colorSENSEX" : colorBankNIFTYClass ,
                           "colorSENSEX": colorNIFTYClass} ) )
                           */
                    
                          //fetchOrdersBookDataCacheKey();
                           // setOrdersShowModal(true);  
                        } catch (err) {
      
                           console.error("❌ loginFeed.action: Ticker prices tickerMap Update failed :", err);
                        //  console.error(err);
                        // setResource(null);
                         // setOrdersShowModal(true);
                       }
      
      
                
                 }
                }               
               } catch (err) {
                   console.error("❌ Failed to parse SSE data:", err);
               }
      if (tick?.symbol && tick?.ltp) {
        let indices:any  = {
            symbol: tick.symbol,
            ltp: tick.ltp
          }
        dispatch(
          saveIndicesBook(indices)
        );

      }

    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.off("market_data");
      socket.off("connect");
      socket.off("disconnect");
    };

  }, []);
   // other option }, [updateEquityState]);
  
     // Filter when query changes
   useEffect(() => {
     if (fyersQuery.length < 3) {
       setMatches({ bestMatches : []});
       return;
     }
 
     const prefix = fyersQuery.toLowerCase().slice(0, 3);
 
     const filtered = indicesData?.filter(
     (item : any)=> item["symbol"].toLowerCase().startsWith(prefix)
     ).slice(0, 5);
      console.log("FyersIndicesSoketProvider filtering trade book ..");
      if( filtered !==undefined)
          { setMatches({ bestMatches :  filtered}); }
   }, [fyersQuery, indicesData]);


    return (
        <SocketContext.Provider value={{ socket , indicesState, setIndicesState }}>{children}</SocketContext.Provider>
    )
}
//export const useEquity = () => React.useContext(SocketContext);
export const useIndices = () => {
   console.log("FyersIndicesSoketProvider fetches indices book ..");
  return useSelector((state: any) => state.equity); // strongly type with RootState if available
};
export const useAppDispatch: () => AppDispatch = useDispatch;