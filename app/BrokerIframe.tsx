import React from "react";

interface BrokerIframeProps {
  authUrl: string;
  onLoad?: () => void;
  height?: string;
}

const BrokerIframe: React.FC<BrokerIframeProps> = ({
  authUrl,
  onLoad,
  height = "650px",
}) => {
  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border border-gray-200
        bg-white
        shadow-xl
      "
    >
      <iframe
        src={authUrl}
        title="Broker Authentication"
        onLoad={onLoad}
        className="
          w-full
          border-0
        "
        style={{
          height,
        }}
        allow="clipboard-read; clipboard-write"
      />

      {/* Mobile overlay gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-3
          bg-gradient-to-b
          from-black/5
          to-transparent
        "
      />
    </div>
  );
};

export default BrokerIframe;