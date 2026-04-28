import {API, FYERSAPI} from "@/libs/client"
import {saveRecentSearches} from "@/redux/slices/miscSlice"
import {saveResults} from "@/redux/slices/stockSlice"
import { EquitySliceProps, saveEquities, updateEquity } from '@/redux/slices/equitySlice';


import {StorageUtils} from "@/libs/cache";
import {CommonConstants} from "@/utils/constants";
import {NEXT_PUBLIC_API_KEY } from '../../../config'
import React, { useState, useEffect } from 'react';
import { saveStockResults } from "@/redux/slices/equitySlice";
import { EquityReduxProvider } from "@/providers/EquityReduxProvider";
const CSV_URL_OLD = 'https://drive.google.com/uc?export=download&id=1UjjQcDHiRIPxbzZOTZaWrLQjKtVzZjp_';

import { FYERSAPINSECSV } from '@/libs/client';

 // // Example usage
 //const line = "1010000000100,AMARA RAJA ENERGY MOB LTD,0,1,0.05,INE885A01032,0915-1530|1815-1915:,2023-11-28,,NSE:ARE&M-EQ,10,10,100,ARE&M,100,-1.0,XX,1010000000100,None";
 //const result = parseLine(line);
  const parseLine = (line: string): Record<string, any>  => {
          const parts = line.split(',');

          const rawName = parts[1];            // "AMARA RAJA ENERGY MOB LTD"
          const symbol = parts[9];            // "NSE:ARE&M-EQ"
          const cleaned = symbol.replace(/^NSE:|[-_]EQ$/g, "");
          const sym = { "1. symbol": `${cleaned}`  };
          let rw = {  "2. name": rawName  };
          
          let type =  { "3. type": "ETF" };
          if(symbol.includes('NCD') || rawName.includes('NCD')){
            type =  { "3. type": "NCD" };
          }
          else if(symbol.includes('EQ')){
             type =  { "3. type": "Equity" };
          }
          else if(symbol.includes('BOND')){
             type =  { "3. type": "BOND" };
          }
           else if(symbol.includes('NAV')){
             type =  { "3. type": "BOND" };
          }
           else if(symbol.includes('INDEX')){
             type =  { "3. type": "INDEX" };
          }
          const region =  { "4. region": "India/Bombay" };
          const marketOpen =  { "5. marketOpen": "09:15" };
          const marketClose =  { "6. marketClose": "15:30" };
          const timezone =  {"7. timezone": "UTC+5.5" };
          const currency =  {"8. currency": "INR" };
          const matchScore =  {"9. matchScore": "0.6250" };

          /*
          {
        "bestMatches": [
            {
                "1. symbol": "ICICI500.BSE",
            "2. name": "ICICI Prudential S&P BSE 500 ETF",

               "3. type": "ETF",
               "4. region": "India/Bombay",
               "5. marketOpen": "09:15",
               "6. marketClose": "15:30",
               "7. timezone": "UTC+5.5",
              "8. currency": "INR",
              "9. matchScore": "0.6250"
           },
          ]
          */
          // Extract first 3 words from the name, or custom logic
          const name = rawName.split(' ').slice(0, 3).join(' '); // "AMARA RAJA ENERGY"
            rw = {  "2. name": name  };

      return {  ...sym,
              ...rw,
              ...type,
              ...region,
              ...marketOpen,
              ...marketClose,
              ...timezone,
              ...currency,
              ...matchScore  };
   };


export const fetchSearchResults = (_query: string, equities:any,  setTypes: Function, setLoading: Function, _recentSearches: any) => {
    const [localMatches, setLocalMatches] = useState<any[]>([]);
        const [equityState, setEquityState] = useState<{
                  equity: EquitySliceProps;
                }>(() => ({
                  equity: {
                    symbol: null,
                    name: null,
                    searchResults: null,
                    equities: { bestMatches: [] }
                  } 
                       }));
      const [matches, setMatches] = useState<any>( ); //typeof bestMacthe
     
      const [csvData, setCsvData] = useState<any>( );
  /*  const [fyersQuery, setFyersQuery] = useState(_query ?? '');
  const [matches, setMatches] = useState<{ symbol: string; name: string }[]>([]);
  const [csvData, setCsvData] = useState<{ symbol: string; name: string }[]>([]);
   
    // Fetch CSV once
  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const res = await fetch(CSV_URL);
        const text = await res.text();
        const lines = text.split('\n').filter(Boolean);
        const parsed = lines.map(line => {
          const [symbol, name, ...rest] = line.split(','); // modify based on CSV structure
          return { symbol, name };
        });
        setCsvData(parsed);
      } catch (err) {
        console.error("CSV fetch error:", err);
      }
    };

    fetchCSV();
  }, []);
 
    // Filter when query changes
  useEffect(() => {
    if (fyersQuery.length < 3) {
      setMatches([]);
      return;
    }

    const prefix = fyersQuery.toLowerCase().slice(0, 3);

    const filtered = csvData.filter(
      item => item.name?.toLowerCase().startsWith(prefix)
    ).slice(0, 5);

    setMatches(filtered);
  }, [fyersQuery, csvData]);
 */
     const researchAfterNseCMFetch = (dispatch:Function) => { 
            console.log("equities "+JSON.stringify(equities));
                 console.log("_query "+JSON.stringify(_query));
                 let nsesym = `NSE:${_query.toUpperCase()}`;
                  console.log(" searching in euities for  "+JSON.stringify(nsesym));
                  if(equities !==undefined && equities.bestMatches !== null && equities.bestMatches !== undefined){
                const uniqueTypes: Array<string> = Array.from(new Set(equities.bestMatches.map((item: any) =>  item['3. type']
                 )));
                const uniqueSearches: Array<string> = Array.from(new Set(equities.bestMatches.map((item: any) => {
                   if (item['2. name'].indexOf(_query.toUpperCase()) > -1 ) {
                     console.log(" item['2. name'] "+JSON.stringify(item['2. name'])+ "_query "+JSON.stringify(_query.toUpperCase()));
                      return item;
                   }  
                    } 
                 )));
                const uniqueTypesArr = ['All', ...uniqueTypes]
                 console.log(" fyers uniqueTypesArr "+JSON.stringify(uniqueTypesArr));
                 
                let  uniqS = uniqueSearches.filter(
                     (s) => s && typeof s === 'object' && Object.values(s).every(v => v != null)
                  );
                  console.log(" uniqueSearches "+JSON.stringify(uniqS));
              // not needed as equities already in the global state.
                 //dispatch(saveStockResults(uniqueSearches))
                  dispatch(saveResults(uniqS))
                //dispatch(saveRecentSearches(uniqS))
                 setTypes([...uniqueTypesArr])
                if (_recentSearches) {
                  //  console.log("_recentSearches "+JSON.stringify(_recentSearches))
                    if (_recentSearches.includes(_query)) {   return  }  
                    dispatch(saveRecentSearches([..._recentSearches, _query]));
                    StorageUtils._save(CommonConstants.recentSearchesKey, [..._recentSearches, _query])
                } else {
                    if( uniqueSearches !== null && uniqueSearches !=undefined) {
                       //console.log("set recentSearches == uniqueSearches "+JSON.stringify(uniqS));
                         dispatch(saveRecentSearches([_query]));
                    }
                    else  if( uniqueTypes !== null && uniqueTypes !=undefined) {
                     // console.log(" fyers set recentSearches ==  uniqueTypesArr "+JSON.stringify(uniqueTypesArr));
                         dispatch(saveRecentSearches([_query]));
                    }
                    else {
                    
                      
                    }
                   
                }       

     }
    }
    return async (dispatch: Function) => {

        const CSV_URL  =   FYERSAPINSECSV ; 
             let mt:any[] = [];
                let bestMacthes = { bestMatches: [...mt] }; // 🔁 clone to avoid frozen reference
              const updateEquitySlice = (equityData: Partial<EquitySliceProps>) => {
                  setEquityState(prev => ({
                    ...prev,
                    equity: {
                      ...prev.equity,
                      ...equityData
                    }
                  }));
                };
        try {
            setLoading(true)
            let tokenauth = StorageUtils._retrieve(CommonConstants.fyersToken);
             let auth_code ='';
             if (tokenauth.isValid && tokenauth.data !== null) {
                       console.log("User is Authorized ");
                      auth_code = tokenauth.data['auth_code'];
                console.log("equities "+JSON.stringify(equities));
                 console.log("_query "+JSON.stringify(_query));
                 let nsesym = `NSE:${_query.toUpperCase()}`;
                  console.log(" searching in euities for  "+JSON.stringify(nsesym));
                  if(equities !==undefined && equities.bestMatches !== null && equities.bestMatches !== undefined){
                const uniqueTypes: Array<string> = Array.from(new Set(equities.bestMatches.map((item: any) =>  item['3. type']
                 )));
                const uniqueSearches: Array<string> = Array.from(new Set(equities.bestMatches.map((item: any) => {
                   if (item['2. name'].indexOf(_query.toUpperCase()) > -1 ) {
                     console.log(" item['2. name'] "+JSON.stringify(item['2. name'])+ "_query "+JSON.stringify(_query.toUpperCase()));
                      return item;
                   }  
                    } 
                 )));
                const uniqueTypesArr = ['All', ...uniqueTypes]
                 console.log(" fyers uniqueTypesArr "+JSON.stringify(uniqueTypesArr));
                 
                let  uniqS = uniqueSearches.filter(
                     (s) => s && typeof s === 'object' && Object.values(s).every(v => v != null)
                  );
                  console.log(" uniqueSearches "+JSON.stringify(uniqS));
              // not needed as equities already in the global state.
                 //dispatch(saveStockResults(uniqueSearches))
                  dispatch(saveResults(uniqS))
                //dispatch(saveRecentSearches(uniqS))
                 setTypes([...uniqueTypesArr])
                if (_recentSearches) {
                  //  console.log("_recentSearches "+JSON.stringify(_recentSearches))
                    if (_recentSearches.includes(_query)) {   return  }  
                    dispatch(saveRecentSearches([..._recentSearches, _query]));
                    StorageUtils._save(CommonConstants.recentSearchesKey, [..._recentSearches, _query])
                } else {
                    if( uniqueSearches !== null && uniqueSearches !=undefined) {
                       //console.log("set recentSearches == uniqueSearches "+JSON.stringify(uniqS));
                         dispatch(saveRecentSearches([_query]));
                    }
                    else  if( uniqueTypes !== null && uniqueTypes !=undefined) {
                     // console.log(" fyers set recentSearches ==  uniqueTypesArr "+JSON.stringify(uniqueTypesArr));
                         dispatch(saveRecentSearches([_query]));
                    }
                    else {
                    
                      
                    }
                   
                }       
                 }
                  else { 
                     // since FYERS not allows list of stocks 
                    // retry the EquityReduxProvider useEffect parsing the NSE_CM.csv
 
                          let linesStr  = ""; let lines1 :any = undefined;
                          
                        try {
                          
                             const res = await fetch(CSV_URL );
                             const text = await res.text();
                             let lines = text.split('\n').filter(Boolean);
                             console.log("Data fetched from the  "+CSV_URL)
                             console.log("   lines  "+JSON.stringify(lines)) 
                             if( Array.isArray(lines)){
                                // ines  ["{\"statusCode\":200,\"headers\":{\"Access-Control-Allow-Origin\":\"*\",\"Content-Type\":\"text/csv\",\"Cache-Control\":\"public, max-age=300\"},
                                // \"body\":\"101000000 ........ "  ] ; 
                                let jsonEleme = JSON.parse(lines[0]);
                                  linesStr = jsonEleme?.body;
                                if(linesStr !== "")
                                    { 
                                      console.log("CSV_URL  body  "+linesStr);
                                      lines1  = linesStr;
                                      lines1  = lines1.split('\n').filter(Boolean);
                                       if( Array.isArray(lines1)){
                                         console.log("CSV_UR  equities array  "+JSON.stringify(lines1));
                    
                                       }
                                    }
                    
                             }
                              const bestMacthes1 = { bestMatches: [...mt] }; // 🔁 clone to avoid frozen reference
                              if(lines1  !==undefined && lines1 !== "" && Array.isArray(lines1) ){  
                             const parsed = lines1.map(line => {
                               //const [symbol, name, ...rest] = line.split(','); // modify based on CSV structure
                               let result = parseLine(line);
                               //console.log(result); 
                               let kt =  Object.keys(result);
                                let symbol ='';//Object(result)?.hasProperty["1. symbol"];
                               let name  =''; //Object(result)?.hasProperty["2. name"];
                               kt.forEach( k => {  //console.log("result ke "+kt); 
                                      //console.log(`Key: ${k}, Value: ${result[k]}`);
                                   //  if(symbol == undefined){
                                       if(k==='1. symbol'  ){
                                            symbol = result[k]
                                       }
                                        if(  k==='2. name' ){
                                            name = result[k]
                                       }
                                   //  }
                               })                  
                              
                               if(result !=undefined)
                                  {  
                                        console.log("PARSED FYERS result    "+JSON.stringify(result))
                                    const stringMap: Record<string, string> = Object.fromEntries(
                                      Object.entries(result).map(([key, value]) => [key, String(value)])
                                          );
                                     if (!Object.isExtensible(bestMacthes1.bestMatches)) {
                                        console.warn("bestMatches array is frozen — recreating");
                                        bestMacthes1.bestMatches = [...bestMacthes1.bestMatches]; // force new clone
                                      }
                    
                                   bestMacthes1.bestMatches.push(stringMap); // ✅ safe now
                                  setLocalMatches(prev => [...prev, stringMap]); // ✅ state-based update
                                
                                       //bestMacthes["bestMatches"].push( stringMap)
                                  };
                                  return {  symbol, name };
                               }); // lines1.map 
                             
                                  if(parsed !== undefined){
                                       console.log("PARSED FYERS EQUITY   "+JSON.stringify(parsed))
                                      let equities : EquitySliceProps = {  symbol: null,
                                                        name: null,
                                                        searchResults: null,
                                                        equities: { bestMatches: parsed },} 
                                                                                  
                                              //Call it like:
                                              dispatch(updateEquity({
                                                equities: {
                                                  bestMatches: parsed
                                                }
                                              }));
                                                 setCsvData(bestMacthes);
                                              dispatch(saveEquities(bestMacthes)); 
                                        updateEquitySlice(     equities  ); // ✅ Save in context  { equity: parsed }
                                        researchAfterNseCMFetch(dispatch);
                                           console.log(`SEARCH QUERY ${_query}  re-searched in NSE_CM `);
                                        /* { equity : {
                                            symbol:'any',
                                            name:'any',
                                            searchResults: 'any',
                                            equities: { bestMatches: any[] } | undefined;  // ✅ new
                                        } } */
                                  }
                                  else {
                                         console.log(`SEARCH QUERY ${_query} COULD not be searched in NSE_CM `);
                                          console.log(` parsing of  NSE_CM.csv could not BUILD parsed equities ... `);
                                  }
                             
                              }
                              else {
                                console.log("Data fetched is empy  "+CSV_URL )
                                // console.log("   lines  "+JSON.stringify(lines))
                              }
                      }
                     catch (err) {
                      //console.error("CSV fetch error:", err);
                          console.log("CSV fetch error:", err);
                     }




                  }  
             }
             else {  // use the regular alph-vantage process 
               const res = await API.get('/', {params: {function: 'SYMBOL_SEARCH', keywords: _query, apikey: NEXT_PUBLIC_API_KEY }})
              const uniqueTypes: Array<string> = Array.from(new Set(res.data.bestMatches.map((item: any) => item['3. type'])))
               const uniqueTypesArr = ['All', ...uniqueTypes]
              console.log("alpha-vantage uniqueTypesArr "+JSON.stringify(uniqueTypesArr));
               console.log("alpha-vantage bestMatches "+JSON.stringify(res.data.bestMatches));
              dispatch(saveResults(res.data.bestMatches))
              setTypes([...uniqueTypesArr])
              if (_recentSearches) {
                  if (_recentSearches.includes(_query)) return
                  dispatch(saveRecentSearches([..._recentSearches, _query]));
                  StorageUtils._save(CommonConstants.recentSearchesKey, [..._recentSearches, _query])
              } else {
                  dispatch(saveRecentSearches([_query]));
              } 


             }





        } catch (error) {
             // AS of Apr 10 2026 requested query like RELIANCE or ICICI BANK comes here
              console.log("second try alpha-vantage error  " +JSON.stringify(error));
             const res = await API.get('/', {params: {function: 'SYMBOL_SEARCH', keywords: _query, apikey: NEXT_PUBLIC_API_KEY }})
            if(res.data.bestMatches != null && res.data.bestMatches !== undefined) {
            const uniqueTypes: Array<string> = Array.from(new Set(res.data.bestMatches.map((item: any) => item['3. type'])))
            const uniqueTypesArr = ['All', ...uniqueTypes]
            console.log("second try alpha-vantage uniqueTypesArr "+JSON.stringify(uniqueTypesArr));
              console.log("second try alpha-vantage bestMatches "+JSON.stringify(res.data.bestMatches));
            dispatch(saveResults(res.data.bestMatches))
            setTypes([...uniqueTypesArr])
            if (_recentSearches) {
                if (_recentSearches.includes(_query)) return
                dispatch(saveRecentSearches([..._recentSearches, _query]));
                StorageUtils._save(CommonConstants.recentSearchesKey, [..._recentSearches, _query])
            } else {
                dispatch(saveRecentSearches([_query]));
            } 
             }
            return error
        } finally {
            setLoading(false)
        }
    }
}
