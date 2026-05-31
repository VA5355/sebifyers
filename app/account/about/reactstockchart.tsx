"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AdvancedStockChart from "@/app/account/AdvancedStockChart";
import axios from "axios";
import {API , IBM_SAMPLE , IBM_SAMPLE_INTRA } from '@/app/account/client';


interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export default function ReactStockChart ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
   const { slug } = React.use(params); // ✅ unwrap Promise
  let symbol = decodeURIComponent(slug);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 const mapper = {
    "TIME_SERIES_DAILY": "Time Series (Daily)",
    "TIME_SERIES_WEEKLY": "Weekly Time Series",
    "TIME_SERIES_MONTHLY": "Monthly Time Series",
    "TIME_SERIES_INTRADAY": "Time Series (5min)"
}
const formatErrorSmall= async () => {  
  
         /* await Promise.resolve({
                                    IBM_SAMPLE
                                  });*/
         const res:any =    await Promise.resolve(IBM_SAMPLE);
            const chartDates = res [mapper["TIME_SERIES_INTRADAY"]]
              const formatted: StockData[] = Object.entries(chartDates)
              .map(([time, v]: any) => ({
                date: time,
                open: Number(v["1. open"]),
                high: Number(v["2. high"]),
                low: Number(v["3. low"]),
                close: Number(v["4. close"]),
                volume: Number(v["5. volume"]),
              }))
              .reverse();
      return formatted;
}

  useEffect(() => {
     if (!symbol) { symbol = "Default Company ";  console.log("default company chart ")}

    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
      const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${slug}&interval=5min&apikey=${API_KEY}`;
      

      //const res = await fetch(url);
       //await API.get('/', { params: { function: "TIME_SERIES_INTRADAY", symbol: symbol, interval:'5min' } })
      const res =     await Promise.resolve( 
                                    IBM_SAMPLE_INTRA
                                   );
   
       // const json = await res.json();
        // @ts-ignore
        const chartDates = res[mapper["TIME_SERIES_INTRADAY"]]
          const formatted: StockData[] = Object.entries(chartDates)
        .map(([time, v]: any) => ({
          date: time,
          open: Number(v["1. open"]),
          high: Number(v["2. high"]),
          low: Number(v["3. low"]),
          close: Number(v["4. close"]),
          volume: Number(v["5. volume"]),
        }))
        .reverse();

        if (!formatted || formatted.length === 0) {
         // setError(IBM_SAMPLE);
            const formatted = await formatErrorSmall();
          setData(formatted);
        } else {
          setData(formatted);
        }
      } catch {
        // setError(true);
           const formatted = await formatErrorSmall();
         setData(formatted);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="animate-pulse text-gray-500">
          Fetching {symbol} data…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500">
        Market data unavailable for {symbol}
      </div>
    );
  }

  return (
    <>
        <div className="flex   items-center justify-center bg-zinc-50 font-sans dark:bg-black">
   
         <div  className="flex w-full max-w-6xl items-center justify-center flex-col my-[45px] ">

            

   <div className="apexstock-toolbar" style={{backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(51, 51, 51)',
     borderColor: 'rgb(233, 236, 239)'}}>
      <div className="apexstock-toolbar-left">
         <div className="apexstock-chart-type-wrapper">
            <button className="apexstock-chart-type-trigger" title="Change Chart Type">
               <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
               </svg>
            </button>
            <div className="apexstock-chart-type-dropdown" style={{display: 'none'}}>
               <div className="apexstock-chart-type-option active" data-type="candlestick">
                  <span className="chart-icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
                        <line x1="6" y1="5" x2="6" y2="19"></line>
                        <rect x="4" y="7" width="4" height="6" fill="currentColor"></rect>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <rect x="10" y="12" width="4" height="4" fill="currentColor"></rect>
                        <line x1="18" y1="5" x2="18" y2="19"></line>
                        <rect x="16" y="9" width="4" height="5" fill="currentColor"></rect>
                     </svg>
                  </span>
                  <span className="chart-text">Candlestick</span>
               </div>
               <div className="apexstock-chart-type-option" data-type="heikinashi">
                  <span className="chart-icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="6" x2="5" y2="13"></line>
                        <rect x="10" y="7" width="4" height="5" fill="currentColor"></rect>
                        <line x1="12" y1="8" x2="12" y2="15"></line>
                        <rect x="3" y="9" width="4" height="5" fill="currentColor"></rect>
                        <line x1="19" y1="10" x2="19" y2="17"></line>
                        <rect x="17" y="11" width="4" height="5" fill="currentColor"></rect>
                     </svg>
                  </span>
                  <span className="chart-text">Heikin-Ashi</span>
               </div>
               <div className="apexstock-chart-type-option" data-type="renko">
                  <span className="chart-icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="4" height="4" fill="currentColor"></rect>
                        <rect x="7" y="8" width="4" height="4" fill="currentColor"></rect>
                        <rect x="11" y="11" width="4" height="4" fill="currentColor"></rect>
                        <rect x="15" y="14" width="4" height="4" fill="currentColor"></rect>
                     </svg>
                  </span>
                  <span className="chart-text">Renko</span>
               </div>
               <div className="apexstock-chart-type-option" data-type="ohlc">
                  <span className="chart-icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
                        <line x1="6" y1="5" x2="6" y2="19"></line>
                        <line x1="4" y1="7" x2="6" y2="7"></line>
                        <line x1="6" y1="13" x2="8" y2="13"></line>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="10" y1="10" x2="12" y2="10"></line>
                        <line x1="12" y1="16" x2="14" y2="16"></line>
                        <line x1="18" y1="5" x2="18" y2="19"></line>
                        <line x1="16" y1="8" x2="18" y2="8"></line>
                        <line x1="18" y1="14" x2="20" y2="14"></line>
                     </svg>
                  </span>
                  <span className="chart-text">OHLC</span>
               </div>
               <div className="apexstock-chart-type-option" data-type="stepline">
                  <span className="chart-icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 13h4v-4h4v-4h4v8h6"></path>
                     </svg>
                  </span>
                  <span className="chart-text">Step Line</span>
               </div>
               <div className="apexstock-chart-type-option" data-type="line">
                  <span className="chart-icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 17l6-6 4 4 8-8"></path>
                     </svg>
                  </span>
                  <span className="chart-text">Line</span>
               </div>
               <div className="apexstock-chart-type-option" data-type="area">
                  <span className="chart-icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 17l6-6 4 4 8-8v10H3z" fill="currentColor" fillOpacity="0.2"></path>
                        <path d="M3 17l6-6 4 4 8-8"></path>
                     </svg>
                  </span>
                  <span className="chart-text">Area</span>
               </div>
               <div className="apexstock-chart-type-option" data-type="bar">
                  <span className="chart-icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="8" width="4" height="8" fill="currentColor" stroke="none"></rect>
                        <rect x="10" y="7" width="4" height="9" fill="currentColor" stroke="none"></rect>
                        <rect x="16" y="11" width="4" height="5" fill="currentColor" stroke="none"></rect>
                     </svg>
                  </span>
                  <span className="chart-text">Column</span>
               </div>
            </div>
         </div>
         <div className="apexstock-custom-select-wrapper">
            <div className="apexstock-custom-select-trigger">Select Indicators</div>
            <div className="apexstock-custom-options"  style={{display: 'none'}}>
               <div className="apexstock-custom-option" data-value="moving average" data-type="overlay">Moving average</div>
               <div className="apexstock-custom-option" data-value="bollinger bands" data-type="overlay">Bollinger bands</div>
               <div className="apexstock-custom-option" data-value="exponential moving average" data-type="overlay">Exponential moving average</div>
               <div className="apexstock-custom-option" data-value="fibonacci retracements" data-type="overlay">Fibonacci retracements</div>
               <div className="apexstock-custom-option" data-value="linear regression" data-type="overlay">Linear regression</div>
               <div className="apexstock-custom-option" data-value="ichimoku cloud indicator" data-type="overlay">Ichimoku cloud indicator</div>
               <div className="apexstock-custom-option" data-value="rsi" data-type="oscillator">RSI</div>
               <div className="apexstock-custom-option" data-value="macd" data-type="oscillator">MACD</div>
               <div className="apexstock-custom-option" data-value="volumes" data-type="oscillator">Volumes</div>
               <div className="apexstock-custom-option" data-value="price volume trend" data-type="oscillator">Price volume trend</div>
               <div className="apexstock-custom-option" data-value="stochastic oscillator" data-type="oscillator">Stochastic oscillator</div>
               <div className="apexstock-custom-option" data-value="standard deviation indicator" data-type="oscillator">Standard deviation indicator</div>
               <div className="apexstock-custom-option" data-value="average directional index" data-type="oscillator">Average directional index</div>
               <div className="apexstock-custom-option" data-value="chaikin oscillator" data-type="oscillator">Chaikin oscillator</div>
               <div className="apexstock-custom-option" data-value="commodity channel index" data-type="oscillator">Commodity channel index</div>
               <div className="apexstock-custom-option" data-value="trend strength index" data-type="oscillator">Trend strength index</div>
               <div className="apexstock-custom-option" data-value="accelerator oscillator" data-type="oscillator">Accelerator oscillator</div>
               <div className="apexstock-custom-option" data-value="bollinger bands %b" data-type="oscillator">Bollinger bands %b</div>
               <div className="apexstock-custom-option" data-value="bollinger bands width" data-type="oscillator">Bollinger bands width</div>
            </div>
         </div>
         <div className="apexstock-drawing-toolbar">
            <input type="color" className="apexstock-drawing-color-picker" title="Color" />
            <select title="Line Width" style={{ marginRight: '5px' ,height: '30px'}}>
               <option value="1">1px</option>
               <option value="2">2px</option>
               <option value="3">3px</option>
               <option value="5">5px</option>
               <option value="8">8px</option>
            </select>
            <button className="apexstock-drawing-tool" data-tool="line" title="Line">╱</button><button className="apexstock-drawing-tool" data-tool="brush" title="Brush">∿</button><button className="apexstock-drawing-tool" data-tool="highlighter" title="Highlighter">🖌️</button><button className="apexstock-drawing-tool" data-tool="rectangle" title="Rectangle">▢</button><button className="apexstock-drawing-tool" data-tool="circle" title="Circle">◯</button><button className="apexstock-drawing-tool" data-tool="ellipse" title="Ellipse">⬭</button><button className="apexstock-drawing-tool" data-tool="text" title="Text Annotation">T</button>
            <button className="apexstock-drawing-tool active" data-tool="pin" title="Pin Tooltips"style={{ marginRight:  '2px'}}>📌</button><button className="apexstock-drawing-tool" data-tool="clear" title="Clear All" style={{marginLeft: '2px'}}>🗑</button>
         </div>
      </div>
      <div className="apexstock-toolbar-right">
         <div className="apexstock-export-btn-container">
            <button className="apexstock-export-btn" title="Download Chart as PNG">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
               </svg>
            </button>
         </div>
      </div>
   </div>


                <div id="chart" className="chartStockInternal">
                                            
                        <div className="max-w-7xl mx-auto px-4 py-4">
                        <h1 className="text-lg font-semibold mb-2">
                            {symbol} – Intraday Chart
                        </h1>
                        <AdvancedStockChart data={data} buyClick={function (): void {
             // throw new Error("Function not implemented.");
         
          } } sellClick={function (): void {
             // throw new Error("Function not implemented.");
          
          } }/>
                        </div>

                    <button id="theme-toggle" aria-label="Toggle Dark Mode">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>
                    </button>

                    <select id="interval-select"></select>
                    <button id="apply-range"></button>
                    <div id="time-period-btns"></div>
                </div>
               
                  <div id="loading-indicator" className="hidden">
                  Loading…
               </div>


          </div>  <button type="button" > 
            <Link href={`/Home`}>
                  Back 
            </Link></button>
            <div> 
               
            </div>
    </div>





    </>
  );
}
