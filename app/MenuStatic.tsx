//MenuStatic.tsx
"use client";

import React from "react";

const MenuStatic = () => {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-between w-full px-3 py-3 bg-white dark:bg-black">
      
      {/* Mobile Select */}
      <select
        defaultValue="Educate"
        className="p-2 text-sm rounded-lg w-full md:hidden bg-gray-100 dark:bg-neutral-800 text-black dark:text-white"
      >
        <option value="Educate">Educate</option>
        <option value="Observe">Observe</option>
        <option value="Trade">Trade</option>
        <option value="Position">Position</option>
        <option value="Subscribe">Subscribe</option>
      </select>

      {/* Desktop Menu */}
      <div className="hidden px-3 mx-12 md:flex relative flex-wrap items-center justify-between">
        
        {[
          "Educate",
          "Observe",
          "Trade",
          "Position",
          "Subscribe",
        ].map((item, index) => (
          <button
            key={index}
            className="mx-3 hover:scale-105 rounded-lg transition-all py-1 cursor-pointer"
          >
            <h1 className="text-md  h5 fw-bold text-black dark:text-white hover:text-blue-500 font-semibold">
              {item}
            </h1>
          </button>
        ))}

        {/* Placeholder underline */}
        <div className="hidden ml-16 md:flex relative py-4 w-20 border-b-2 border-blue-500"></div>
      </div>

      {/* Platform Select */}
      <div className="md:flex mr-6 flex-wrap items-center justify-between">
        <select
          defaultValue="1"
          className="p-2 focus-visible:outline-none rounded-lg bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
        >
          <option value="1">Alpha-Vantage</option>
          <option value="2">Fyers</option>
          <option value="3">Upstox</option>
          <option value="4">Icicidirect</option>
        </select>
      </div>
    </div>
  );
};

export default MenuStatic;