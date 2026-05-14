//SubscribePopupStatic.tsx
"use client";

import React from "react";

const SubscribePopupStatic = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      
      <div className="bg-white dark:bg-neutral-900 p-5 md:p-6 rounded-2xl shadow-xl w-[90%] max-w-md text-center">
        
        <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
          API Limit Reached
        </h2>

        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Please subscribe to access more stock data and remove limits.
        </p>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubscribePopupStatic;