"use client";

import { useEffect, useRef ,useState  } from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { createChart } from "lightweight-charts";
// instead of lightweight use https://apexcharts.com/react-chart-demos/candlestick-charts/category-x-axis/

export   const  CandleChart = ({ data , slugIn}) => {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const   slug  = slugIn; // IBM, AAPL, etc   
    const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!containerRef.current  || typeof ResizeObserver === "undefined" ) return;

   /* const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      layout: { background: { color: "#ffffff" }, textColor: "#333" },
    });*/
    let chart;
    let resizeObserver;
    try {  
      chart = createChart(containerRef.current, {
           width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
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

    let    candleSeries =  chart.addSeries({
        type: "Candlestick",
        upColor: "#22c55e",
        downColor: "#ef4444",
        borderUpColor: "#22c55e",
        borderDownColor: "#ef4444",
        wickUpColor: "#22c55e",
        wickDownColor: "#ef4444",
        });/*chart.addCandlestickSeries({
          upColor: "#16a34a",
          downColor: "#dc2626",
          wickUpColor: "#16a34a",
          wickDownColor: "#dc2626",
          borderVisible: false,
        });*/

        candleSeries.setData(data);

    chartRef.current = chart;
         setLoading(false);

    resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        chart.applyOptions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(containerRef.current);
   }
   catch(errr) {
      setError(errr.message);
        setLoading(false);
   }
    return () => {
        if(chart !==undefined && resizeObserver !== undefined){  
      resizeObserver.disconnect();
      chart.remove();}
    };
  }, []);

  return ( 
      <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-4 py-4"
    >
     {/*   Header  
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        <h1 className="text-lg font-semibold text-gray-800">
          {slug.toUpperCase()} – Intraday Candlestick
        </h1>
      </div> */}

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


           <div ref={containerRef} className="w-full h-full" >
            
            
            
             </div>
              </div>
        </motion.div>     
             
              ) ;
};
export default CandleChart;