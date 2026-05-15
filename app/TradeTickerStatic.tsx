//TraderTickerStatic.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

const tickerData = [
  {
    symbol: "RELIANCE",
    companyname: "Reliance Industries",
    price: 1560,
    change: 2.45,
  },
  {
    symbol: "INFY",
    companyname: "Infosys",
    price: 1630,
    change: -1.12,
  },
  {
    symbol: "TCS",
    companyname: "Tata Consultancy Services",
    price: 3280,
    change: 0,
  },
  {
    symbol: "HDFCBANK",
    companyname: "HDFC Bank",
    price: 1980,
    change: 1.55,
  },
];

const TradeTickerStatic = () => {
  return (
    <div className="flex-wrap gap-2 relative px-3 ml-6 md:ml-[88px] mr-6 md:mr-[80px] overflow-hidden bg-gray-100  border-y border-gray-200 dark:border-neutral-800">
           {/* dark:bg-black dark:bg-neutral-900 above causes mobile black */}
      <motion.div
        className="w-full flex gap-4 py-2 px-4 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {[...tickerData, ...tickerData].map((item, index) => {
          const isUp = item.change > 0;
          const isDown = item.change < 0;

          return (
            <div
              key={index}
              className="flex items-center gap-2 text-sm font-medium text-gray-800"
            >     {/* dark:bg-black  dark:text-gray-100 above causes mobile black */}
              <span
                className="font-semibold cursor-pointer"
                title={item.companyname}
              >
                {item.symbol}
              </span>

              <span className="text-gray-500 dark:text-gray-400">
                ₹{item.price.toLocaleString()}
              </span>

              <span
                className={`flex items-center gap-1 ${
                  isUp
                    ? "text-green-600"
                    : isDown
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {isUp && <TrendingUp size={14} />}
                {isDown && <TrendingDown size={14} />}
                {!isUp && !isDown && <Minus size={14} />}

                {item.change > 0 ? "+" : ""}
                {item.change}%
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TradeTickerStatic;
