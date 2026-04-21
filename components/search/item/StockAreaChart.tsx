import React from "react"

import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer} from "recharts"
// @ts-ignore
import axios from "axios"
import { motion } from 'framer-motion';
import { Shield, Zap, Star, ArrowUpRight } from 'lucide-react';
// @ts-ignore
//import { RoundOf } from "../utils/utils"
import { CommonConstants, Quote , RoundOf } from '@/utils/constants';
import { useRouter } from 'next/navigation';
 import   useIsMobile   from "@/components/listing/tradeGrid/useIsMobile";
//import { spawn } from "child_process";
 import {StorageUtils} from "@/libs/cache";
 import { FYERSAPI } from '@/libs/client';
import {API} from "@/libs/client"
import { FYERSAPINSECSV ,FYERSAPITHREESECQUOTE , FYERSAPIORDERBOOKSURL ,  FYERSAPITICKERACCESTOKEN, FYERSAPICOMPLYCUBEURL,
     FYERSAPIKYCORDER , FYERSAPISELLORDER , YAHOOCHARTURL} from '@/libs/client';
//import {useAppDispatch} from "@/providers/ReduxProvider";
import {connect } from 'react-redux';
import { useSelector } from 'react-redux';
import {saveCompanyData} from "@/redux/slices/stockSlice"
import {saveSelectedCard} from "@/redux/slices/stockSlice";
//import {setTimestampChartData} from "@/redux/slices/timestampChartSlice"
import {setTimestampChartData , selectIsChartLoading as yahooChart } from "@/redux/slices/timestampChartSlice"
import { selectChartData, selectChartSymbol, selectIsChartLoading } from "@/redux/slices/timestampChartSlice"
import { selectRenderData, selectRenderSymbol, selectIsRenderLoading } from "@/redux/slices/renderDotcomStockSlice"

import StockCandleChart from "@/components/charts/StockCandleChart";


interface PassedProps {
    data: any,
    symbol:any,
    chartData: any,
    renderData: any,
         isLoading: boolean,
         isYahooChart: boolean,
         isMobile: boolean,
    triggerAction:any
    triggerCompany:any
    triggerSelected:any
    triggerNextGen:any
       router: any   // ✅ ADD THIS

}

class StockAreaChart extends React.Component<PassedProps> {
 
     constructor (p:PassedProps){
         super(p);
     
     }

     getTimeSeriesFormattedTimeKey()  {
  const now = new Date();
  const year = now.getFullYear().toString().padStart(2, '0');
  const month = now.getMonth().toString().padStart(2, '0');
  const day = now.getDay().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  let min5 = now.getMinutes() ;
       min5 = min5  - 5;
  const min = min5.toString().padStart(2, '0');
  const sec = now.getSeconds().toString().padStart(2, '0');
  const ms = now.getMilliseconds().toString().padStart(3, '0');
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}
    //  let dispatch = useAppDispatch();
/*
{"message":"","code":200,"d":[{"n":"NSE:ICICIBANK-EQ","v":{"ask":0,"bid":1416.1,"chp":-0.64,"ch":-9.1,
"description":"NSE:ICICIBANK-EQ","exchange":"NSE","fyToken":"10100000004963",
"high_price":1421.5,"low_price":1403.6,"lp":1416.1,"open_price":1403.6,"original_name":"NSE:ICICIBANK-EQ",
"prev_close_price":1425.2,"short_name":"ICICIBANK-EQ","spread":0,"symbol":"NSE:ICICIBANK-EQ",
"tt":"1749945600","volume":7573103,"atp":1413.66},"s":"ok"}],
"s":"ok"}
*/
  getAlpaVantageStyleStock = (fyersQuote:any ) => {
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

}
  handleFyersHistory = async (result :any, symbol:any ) => {
    //let router = useRouter();
    const router = this.props.router;  // ✅ USE PROP

    const range_to = Math.floor(Date.now() / 1000);
	const range_from = range_to - (86400 * 1); // 1 day back
    let timentry =  "{"+
                            `"${this.getTimeSeriesFormattedTimeKey()}\" : { `  +       
                                `"1. open": "301.0000",`+
                                `"2. high": "301.5800",`+
                                `"3. low": "301.0000",`+
                                `"4. close": "301.5111",`+
                                `"5. volume": "27"`+
                            "},"+
                            `"${this.getTimeSeriesFormattedTimeKey()}\": {"`+
                                `"1. open": "301.5800",`+
                                `"2. high": "301.6800",`+
                                `"3. low": "301.5800",`+
                                `"4. close": "301.6800",`+
                                `"5. volume": "13"`+
                            "},"+
                        "}"
                        /*  {
                            `${this.getTimeSeriesFormattedTimeKey()}` : {          
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
                    }*/
    let timSe = {
               //  data:     {
                        

                        "Meta Data": {
                            "1. Information": "Intraday (5min) open, high, low, close prices and volume",
                            "2. Symbol": ""+symbol,
                            "3. Last Refreshed": "2025-12-19 19:55:00",
                            "4. Interval": "5min",
                            "6. Time Zone": "US/Eastern"
                        },
                        "Time Series (5min)":  `${timentry}` 
                    //} 
    }
    /*
     data:     {
                       

                        "Meta Data": {
                            "1. Information": "Intraday (5min) open, high, low, close prices and volume",
                            "2. Symbol": ""+symbol,
                            "3. Last Refreshed": "2025-12-19 19:55:00",
                            "4. Interval": "5min",
                            "6. Time Zone": "US/Eastern"
                        },
                        "Time Series (5min)": {
                            `${this.getTimeSeriesFormattedTimeKey()}`+"": {          
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
                    }  } */
    let res =     await Promise.resolve({
                       data: timSe
                    });
    //           await FYERSAPI.get('/apinseindia', {params: {auth_code :auth_code , symbol:sy , apikey:CommonConstants.apiKey}})
    //  popupCenter(FYERSAPILOGINURL, "Fyers Signin")

    let data :any =  result !== undefined ? await result.data : await res.data; 

    console.log("click data "+JSON.stringify(data))
    if( data ===undefined){
    /* data =  gainers[0]; // gainers.map((elem: any) => elem.ticker === "SBET")
    if (!data.length) {
        data = losers.map((elem: any) => elem.ticker === item['1. symbol'])
    }*/
    if (data.length == 1) {
        console.log( "click data length ==1 : "+JSON.stringify(data))
         this.props. triggerSelected(data[0])
    }
    console.log( "click data "+JSON.stringify(data))
   // console.log( "click item "+JSON.stringify(item))
    if( symbol !==undefined){
        if (!data.length) {
            let stock =  data["2. symbol"];
            let ticker = stock ;///==="IBM" ? sy :"";
            ticker  = symbol;
            StorageUtils._save (CommonConstants.companyDataCacheKey,data);
            StorageUtils._save (CommonConstants.companySymbolStockChart,symbol);
            // this will allow the 
            //  const dataFromCache = StorageUtils._retrieve(CommonConstants.companyDataCacheKey)
            // to retrive properly when router hits `/company/${ticker}`
             this.props. triggerCompany(data)
             this.props. triggerSelected({ ...stock, ticker:ticker });

             // EVERY THIS IS OKAY , USE the ROUTER to COMPANY PAGE GENERATION 
             this.props.triggerNextGen(router , symbol);
            //  router.push(`/company/${ticker}`);
           /* router.push(`/`);
            onSelect();*/
        //  dispatch(saveSelectedCard(data))
        }
        else {   this.props. triggerSelected(data[0]);
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
              //  ticker = symbol;
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
            let  alphaStock =   this.getAlpaVantageStyleStock(quoteData); 

            this.props. triggerSelected({ ...alphaStock, ticker:ticker });
            console.log("quoteData FYERSAPI.get('/fyersgetquote'  "+JSON.stringify(quoteData));
            // router.push(`/company/${ticker}`);
           // router.push(`/`);
             //   onSelect();
            }
            else {
                console.log( "Meta Data / 2. Symbol not visible ticker not set ")
            }
            
            }
            else {
            console.log( "/fyersquicklogin symbol  failed ")
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






  } 
  componentDidMount() {
    console.log(this.props)
  
                         

    }
    //: Equivalent to useEffect(() => { ... }, [prop, state])
    componentDidUpdate(prevProps:any, prevState:any ) {  

    } 
    render() {
        return (<>  {/* flex justify-center gap-2 border-b border-gray-300 mb-4  style={{ ` ${this.props.isMobile} ? 'margin:-25px, padding:-52px;' : ''   `}}*/}
        <div className={this.props.isMobile ? "-mt-6 mb-6" : ""}>
        <ResponsiveContainer width="100%" height={440}  style={ this.props.isMobile ? { marginTop: "-25px", marginBottom: "-25px" }  : {}  } >  
             <div className="grid w-1/1 gap-4 mx-auto grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1 justify-center"> 
                   <StockCandleChart symbol={this.props.symbol} /> 
                  
            <div id="chart">
               
                     <div className="w-12 h-6 rounded-2xl bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center mb-4 border border-blue-100/50">
                     <Shield className="w-6 h-6 text-blue-600" />
                    </div>

                    {/* Text Content */}
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-900 transition-colors">
                       Searched Stock {this.props.symbol}  &nbsp; {this.props.renderData?.companyName}
                    </h3>


            <AreaChart 
                width={730} 
                height={300} 
                data={this.props.data ?? this.props.chartData} 
                margin={{top: 30, right: 30, left: 30, bottom: 30}} 
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                
                <XAxis 
                    tick={{ fontSize: 10, fill: '#666' }} 
                    dataKey='date' 
                    interval="preserveStartEnd"
                    minTickGap={30}
                >
                    <Label value="Time (IST)" position="insideBottom" offset={-15} style={{ fontWeight: 'bold' }} />
                </XAxis>

                <YAxis 
                    tick={{ fontSize: 12 }} 
                    /* 'dataMin - 1' and 'dataMax + 1' zooms into the price action.
                       It sets the bottom of the chart just below the lowest price 
                       and the top just above the highest.
                    */
                    domain={['dataMin - 2', 'dataMax + 2']} 
                    allowDecimals={true}
                    tickCount={8} // Higher count shows more granular scale
                    axisLine={false}
                    tickLine={false}
                    label={{ 
                        value: 'Price (₹)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fontWeight: 'bold' } 
                    }}
                />
                
                <Tooltip 
                contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    backgroundColor: '#fff' 
                }}
                // The fix: Accept the generic 'value' and 'name' types from Recharts
                formatter={(value: any) => {
                    // Safety check for Recharts' strict typing
                    if (value === undefined || value === null) return ['N/A', 'Price'];
                    
                    // Return the formatted array: [Value, Label]
                    return [`₹${Number(value).toLocaleString('en-IN')}`, 'Price'];
                }}
            />
                
                <Area 
                    type='monotone' 
                    dataKey='price' 
                    stroke='#00a600' // Success Green
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPrice)" // Use a gradient for that modern look
                />

                {/* SVG Gradient for that "Wall Street" look */}
                <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00D1B2" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00D1B2" stopOpacity={0}/>
                    </linearGradient>
                </defs>
            </AreaChart>
        </div>
         </div>
         </ResponsiveContainer>
           </div>
         </>
        )
    }
}
const mapStateToProps = (state:any) => {
	return {
         data: state.data  ,
        symbol:state.symbol,
		chartData: state.chartData,
		renderData: state.renderData,
         isLoading: state.isLoading,
         isYahooChart: state.isYahooChart,
         isMobile : state.isMobile
          
	};
};

const mapDispatchToProps = (dispatch :any) => {
    return {
        triggerAction: ( { symbol, data } : {symbol: any, data:  any } ) => dispatch(setTimestampChartData({ symbol, data })),
           triggerCompany:(  data:  any) => dispatch(saveCompanyData( data )),
          triggerSelected: ({ alphaStock, ticker }:  {alphaStock: any, ticker:  any } ) => dispatch(saveSelectedCard({ ...alphaStock, ticker })),
          triggerNextGen: ( router:any ,  ticker :any ) => {     router.push(`/company/${ticker}`); } ,
    }
};
//export default connect(mapStateToProps, mapDispatchToProps) (StockAreaChart)

// Wrapper function to use the hook
const StockAreaChartWrapper = (props:any) => {
      const router = useRouter();
  const chartData = useSelector( selectChartData);
      // CHECK MOBILE OR DESTOP
          const isMobile = useIsMobile();
  const renderData = useSelector( selectRenderData);
   const symbol = useSelector(selectChartSymbol);
  const isLoading = useSelector(selectIsChartLoading);
  const isYahooChart = useSelector(yahooChart);

  return <StockAreaChart {...props} chartData={chartData}  renderData={renderData}   symbol={symbol} isLoading={isLoading} isYahooChart={isYahooChart} router={router} 
                isMobile={isMobile} />;
};

export default  connect(mapStateToProps, mapDispatchToProps) (StockAreaChartWrapper);

/*
       OLD VIEW 

   <div id="chart">
                <AreaChart width={730} height={300} data={this.props.data} margin={{top: 30, right: 30, left: 30, bottom: 30}} >
                    <CartesianGrid horizontal={false} vertical={false} />
               
                   <XAxis 
  tick={{ fontSize: 12, textAnchor: "end" }} // Use textAnchor instead of textAlign
  dataKey='date' 
>
                        <Label value="Time" position="insideBottom" offset={-15} />
                    </XAxis>  
                    <YAxis tick={{fontSize: 12}} label={{ value: 'Price (₹)', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='price' stroke='black' fill='#00D1B2' />
                </AreaChart>
            </div>    {/* <XAxis tick={{fontSize: 12, textAlign: "right"}} dataKey='date'>/}  {/* (₹) /}

            */