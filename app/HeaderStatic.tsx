"use client";

import React from "react";
import Image from "next/image";
import { Menu, SearchNormal } from "iconsax-react";

const HeaderStatic = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 w-full px-3 py-3 bg-white dark:bg-black">
      
      {/* Logo */}
      <div className="flex justify-start items-center cursor-pointer">
        <Image
          src={require("@/public/storenotify.in.png")}
          alt="logo"
          className="mr-2"
          width={65}
          height={65}
        />

        <h1 className="hidden  h5 fw-bold md:block text-md text-black font-semibold dark:text-white">
          Store Notify Stocks
        </h1>
      </div>

      {/* Static Search Bar */}
      <div className="w-full md:w-auto px-3 pb-2">
        <div className="flex-1 mx-2 md:mx-4">
          <div className="flex items-center bg-gray-100 dark:bg-neutral-800 rounded-full px-3 py-2 md:px-4 md:py-2 w-full min-w-[250px]">
            <SearchNormal className="text-gray-500 mr-2" size={16} />

            {/* STATIC INPUT */}
            <input
              type="text"
              placeholder="Search stocks..."
              className="bg-transparent text-sm md:text-xs w-full focus:outline-none text-black dark:text-white"
              readOnly
            />
          </div>

          {/* Placeholder Search Results 
          <div className="hidden md:block mt-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm p-3">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Search suggestions placeholder
            </div>
          </div>*/}
        </div>
      </div>

      {/* Static Menu */}
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded-full transition-all"
            id="menu-button"
          >
            <Menu className="text-black dark:text-white" size={20} />
          </button>
        </div>

        {/* Always visible static dropdown */}
        <div
          style={{ maxWidth: "85vw" }}
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-neutral-900 text-black dark:text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >

              {/* extra clicked pop we don't need this  */}
         {/** <div className="py-1">
            <button
              className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              Turn on Dark Mode
            </button>
 */}
            {/* Static Mobile Search */}
             {/* extra clicked pop we don't need this 
            <div className="p-3">
              <div className="bg-gray-100 dark:bg-neutral-800 flex items-center border border-green-500 justify-start py-2 px-3 rounded-lg">
                <SearchNormal
                  className="text-gray-500 dark:text-white mr-2"
                  size={17}
                />

                <input
                  type="text"
                  placeholder="search e.g, tencent, tesco"
                  className="bg-transparent text-gray-500 text-sm dark:text-white py-1 focus-visible:outline-none w-full"
                  readOnly
                />
              </div>

              {/* Placeholder */}
               {/* extra clicked pop we don't need this 
              <div className="mt-2 text-xs text-gray-400">
                Search popup placeholder
              </div>
            </div>
          </div> */} 
        </div>
      </div>
    </div>
  );
};

export default HeaderStatic;