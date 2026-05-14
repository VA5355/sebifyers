//BrokerLoading.tsx
import React from "react";

interface BrokerLoadingProps {
  title?: string;
  subtitle?: string;
}

const BrokerLoading: React.FC<BrokerLoadingProps> = ({
  title = "Connecting Broker",
  subtitle = "Please wait while authentication is being prepared...",
}) => {
  return (
    <div
      className="
        flex
        min-h-[300px]
        w-full
        flex-col
        items-center
        justify-center
        rounded-2xl
        bg-white
        p-6
        text-center
        shadow-lg
      "
    >
      {/* Spinner */}
      <div
        className="
          h-14
          w-14
          animate-spin
          rounded-full
          border-4
          border-gray-200
          border-t-indigo-600
        "
      />

      {/* Title */}
      <h2
        className="
          mt-6
          text-xl
          font-semibold
          text-gray-800
        "
      >
        {title}
      </h2>

      {/* Subtitle */}
      <p
        className="
          mt-2
          max-w-md
          text-sm
          leading-relaxed
          text-gray-500
        "
      >
        {subtitle}
      </p>
    </div>
  );
};

export default BrokerLoading;