"use client";

import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";
import Header from '@/components/common/pageHeader/header.component';
import { ScreenLoader } from '@/components/loader/screenLoader/loader.component';
import Menu from '@/components/listing/stockControls/menu.component';
import { GlobalState } from '@/redux/store';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { SubscribePopup } from '@/components/SubscribePopup'
import TradeTickerBar from "@/components/tradeTicker/tradeTickerBar.component";
import StockCandleChart from "@/components/charts/StockCandleChart";
import CandleChart from "./CandleChart";
 /*
const DynamicGrid = dynamic(() => import('../components/listing/stockGrid/grid.component'), {
  loading: () => <p>Loading...</p>,
})*/

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

export default function CompanyView({ params }) {
  const { slug } = params; // IBM, AAPL, etc
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  let chartData = "";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    const isDarkMode = useSelector((state ) => state.misc?.isDarkMode)
      const selected = useSelector(
      (state ) => state.stock?.selectedCard
    );
    const rawTicker = selected?.ticker;
    const ticker =
    typeof rawTicker === "string"
      ? rawTicker
      : rawTicker?.symbol; // <-- adjust if needed
  
    /*  const symbol =
      selected?.ticker?.includes(":")
        ? selected.ticker.split(":")[1].replace("-EQ", "")
        : selected?.ticker; */
        const symbol =
    typeof ticker === "string" && ticker.includes(":")
      ? ticker.split(":")[1].replace("-EQ", "")
      : ticker;

  /* -------------------------------------------
     Fetch + Render Candlestick Chart
  -------------------------------------------- */
  useEffect(() => {
    let chart;
    let candleSeries;

    async function loadChart() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${slug}&interval=5min&apikey=${API_KEY}`,
          { cache: "no-store" }
        );

        const json = await res.json();
        const series = json["Time Series (5min)"];

        if (!series) {
          throw new Error("Market data unavailable");
        }

        const data = Object.entries(series)
          .map(([time, v]) => ({
          time: Math.floor(new Date(time).getTime() / 1000),
          open: Number(v["1. open"]),
          high: Number(v["2. high"]),
          low: Number(v["3. low"]),
          close: Number(v["4. close"]),
        })).reverse(); /*(([time, v]) => ({
            time: time,
            open: +v["1. open"],
            high: +v["2. high"],
            low: +v["3. low"],
            close: +v["4. close"],
          }))
          .reverse();*/

        chart = createChart(containerRef.current, {
          height: 360,
          layout: {
            background: { color: "#ffffff" },
            textColor: "#1f2937",
          },
          grid: {
            vertLines: { color: "#e5e7eb" },
            horzLines: { color: "#e5e7eb" },
          },
          rightPriceScale: {
            borderColor: "#e5e7eb",
          },
          timeScale: {
            borderColor: "#e5e7eb",
          },
        });

        candleSeries = chart.addCandlestickSeries({
          upColor: "#16a34a",
          downColor: "#dc2626",
          wickUpColor: "#16a34a",
          wickDownColor: "#dc2626",
          borderVisible: false,
        });

        candleSeries.setData(data);
        chartData = data;
        chartRef.current = chart;
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    loadChart();

    return () => chart?.remove();
  }, [slug]);

  /* -------------------------------------------
     UI
  -------------------------------------------- */
  return (
 <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className='bg-white dark:bg-black '>
        <ScreenLoader />
        <Header />
         {/* 🔔 Ticker goes here */}
        <TradeTickerBar />
        <Menu />
       {/* <DynamicGrid key={`grid-${isDarkMode}`} />*/} 
        <div className="w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-3">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
             {slug.toUpperCase()} – Intraday Candlestick
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full h-[260px] sm:h-[320px] md:h-[420px] bg-white rounded-xl shadow"
          >
            <CandleChart data={chartData}  slugIn={slug.toUpperCase()}/>
          </motion.div>
        </div>
      </div>
          {/* <div className="space-y-6 px-6 ml-[88px]">
              Other content 

              {symbol ? (
                <StockCandleChart symbol={symbol} />
              ) : (
                <div className="text-sm text-gray-400 italic">
                  Select a stock to view chart
                </div>
              )}
         </div>*/}

           <SubscribePopup />
      </div>
    </div>


  );
}
/*


    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-4 py-4"
    >
      Header  
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        <h1 className="text-lg font-semibold text-gray-800">
          {slug.toUpperCase()} – Intraday Candlestick
        </h1>
      </div>

       Chart Card  
      <div className="bg-white rounded-xl border shadow-sm p-3">
        {loading && (
          <div className="h-[360px] flex items-center justify-center text-sm text-gray-500">
            Loading chart…
          </div>
        )}

        {error && (
          <div className="h-[360px] flex flex-col items-center justify-center text-red-600 gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div
          ref={containerRef}
          className="w-full h-[360px]"
        />
      </div>
    </motion.div>

*/