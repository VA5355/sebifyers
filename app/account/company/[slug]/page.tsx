"use client";

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

export default function CompanyView({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
   const { slug } = React.use(params); // ✅ unwrap Promise
  const symbol = decodeURIComponent(slug);
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
     if (!symbol) return;

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
  );
}
