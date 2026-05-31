"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import "./buttonwrapper.css";
import "./htmltheme-wrapper.module.css";
// Prevent SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface AdvancedStockChartProps {
  data: StockData[];
  buyClick : () => void;
  sellClick : () => void;
}

const AdvancedStockChart: React.FC<AdvancedStockChartProps> = ({ 
  data, buyClick , sellClick
}) => {
  const [options, setOptions] = useState<ApexOptions>({});
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    /* Transform data into OHLC format for ApexCharts */
    const ohlc: [number, number, number, number, number][] = [];
    const volume: [number, number][] = [];

    data.forEach((d) => {
      const time = new Date(d.date).getTime();
      ohlc.push([time, d.open, d.high, d.low, d.close]);
      volume.push([time, d.volume]);
    });

    /* Stock Chart options */
    const opts: ApexOptions = {
      chart: {
        type: "candlestick",
        height: 400,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      title: {
        text: "Advanced Stock Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: [
        {
          seriesName: "OHLC",
          tooltip: { enabled: true },
        },
        {
          seriesName: "Volume",
          opposite: true,
          labels: {
            formatter: (val) => val.toString(),
          },
        },
      ],
      tooltip: {
        shared: true,
        custom: [
          function ({ seriesIndex, dataPointIndex, w }) {
            return (
              '<div class="arrow_box">' +
              "<span>" +
              "Open: " +
              w.globals.seriesCandleO[seriesIndex][dataPointIndex] +
              "</span><br/>" +
              "<span>" +
              "High: " +
              w.globals.seriesCandleH[seriesIndex][dataPointIndex] +
              "</span><br/>" +
              "<span>" +
              "Low: " +
              w.globals.seriesCandleL[seriesIndex][dataPointIndex] +
              "</span><br/>" +
              "<span>" +
              "Close: " +
              w.globals.seriesCandleC[seriesIndex][dataPointIndex] +
              "</span>" +
              "</div>"
            );
          },
        ],
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#00B746",
            downward: "#EF403C",
          },
        },
      },
    };

    setOptions(opts);
    setSeries([
      {
        name: "Price",
        data: ohlc,
      },
      {
        name: "Volume",
        type: "column",
        data: volume,
      },
    ]);
  }, [data]);

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={450}
      />

      <div className="buttonsWrapper-hw_3o_pb">
                                       
                                       <div className="sellBuyAndPresetsButtonsContainer-hw_3o_pb">
                                          
                                          <div className="sellBuyButtonsContainer-hw_3o_pb">
                                             
                                             <div data-name="sell-order-button" className="apply-common-tooltip button-hw_3o_pb sellButton-hw_3o_pb"><span className="blockHidden-e6PF69Df loader-hw_3o_pb"><span className="loader-UL6iwcBa static-UL6iwcBa"><span className="item-UL6iwcBa black-UL6iwcBa small-UL6iwcBa"></span><span className="item-UL6iwcBa black-UL6iwcBa small-UL6iwcBa"></span><span className="item-UL6iwcBa black-UL6iwcBa small-UL6iwcBa"></span></span></span><span className="buttonTextWrapper-hw_3o_pb"><span className="buttonText-hw_3o_pb">76.85</span>
                                             
                                             <span   onClick={() =>   sellClick()} className="title-hw_3o_pb">Sell</span></span></div>
                                             
                                             <div className="spreadQtyWrapper-hw_3o_pb withoutQty-hw_3o_pb">
                                                
                                                <div className="apply-common-tooltip spread-hw_3o_pb" title="Spread">0.20</div>
                                                
                                                <div data-name="qtyEl" className="apply-common-tooltip button-hw_3o_pb qty-hw_3o_pb blockHidden-e6PF69Df colorStyle" title="Quantity" ><span>65</span></div>
                                                
                                             </div>
                                             
                                             <div data-name="buy-order-button" className="apply-common-tooltip button-hw_3o_pb buyButton-hw_3o_pb"><span className="blockHidden-e6PF69Df loader-hw_3o_pb"><span className="loader-UL6iwcBa static-UL6iwcBa"><span className="item-UL6iwcBa black-UL6iwcBa small-UL6iwcBa"></span><span className="item-UL6iwcBa black-UL6iwcBa small-UL6iwcBa"></span><span className="item-UL6iwcBa black-UL6iwcBa small-UL6iwcBa"></span></span></span><span className="buttonTextWrapper-hw_3o_pb"><span className="buttonText-hw_3o_pb">77.05</span>
                                             
                                             <span  onClick={() => buyClick()}  className="title-hw_3o_pb">Buy</span></span></div>
                                             
                                          </div>
                                          
                                       </div>
                                       
                                       <div className="blockHidden-e6PF69Df brokerButton-hw_3o_pb">
                                          
                                          <span className="blockHidden-e6PF69Df circleLoader-hw_3o_pb">
                                             
                                             <div className="tv-spinner tv-spinner--shown tv-spinner--size_xxsmall" role="progressbar"></div>
                                             
                                          </span>
                                          
                                          <div className="brokerButtonIconWrap-hw_3o_pb"></div>
                                          
                                       </div>
                                       
                                    </div>
    </div>
  );
};

export default AdvancedStockChart;
