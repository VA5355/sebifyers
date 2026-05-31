
import Link from "next/link";
 
import React ,  { useEffect } from 'react';
 import dynamic from "next/dynamic";
export default function ApexCoreChart() {
 useEffect(() => {
    let controller: any;

    async function loadChart() {
      // Dynamically import browser-only libs
      const ApexCharts = (await import("apexcharts")).default;
     // const ApexStock = (await import(*  from 'apexstock')).default;
      const ApexStock =  dynamic(
        () => { return (import (  'apexstock')); } , 
        { ssr: false }
      );

      // Inject your controller AFTER DOM exists
      controller = new (window as any).StockChartController(
        ApexCharts,
        ApexStock
      );
      controller.initChart();
    }

    loadChart();

    return () => {
      controller?.stockChart?.destroy();
    };
  }, []);
return (
    <div className="flex min-h-screen items-start justify-start bg-zinc-50 font-sans dark:bg-black">
   
         <div  className="flex w-full max-w-3xl flex-col my-[45px] ">
                <div id="chart">
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
  );
}
