//ScreenLoaderStatic.tsx
"use client";

import React from "react";
import Image from "next/image";

const ScreenLoaderStatic = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80">
      <Image
        src={require("@/public/loader.gif")}
        alt="logo"
        className="rounded-lg"
        width={40}
        height={40}
      />
    </div>
  );
};

export default ScreenLoaderStatic;