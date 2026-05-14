//BrokerAuthModal.tsx
// BrokerAuthModal.tsx

import React, { useEffect } from "react";
import BrokerIframe from "./BrokerIframe";
import BrokerLoading from "./BrokerLoading";
import { useBrokerAuth } from "./useBrokerAuth";

interface BrokerAuthModalProps {
  isOpen: boolean;
  brokerName: string;
  authEndpoint: string;
  redirectUri?: string;

  onClose: () => void;

  onSuccess?: (authCode: string | null) => void;

  onError?: (error: string) => void;
}

const BrokerAuthModalImproved: React.FC<BrokerAuthModalProps> = ({
  isOpen,
  brokerName,
  authEndpoint,
  redirectUri,
  onClose,
  onSuccess,
  onError,
}) => {
  // ======================================================
  // HOOK
  // ======================================================

  const {
    loading,
    authenticated,
    error,
    authUrl,
    authCode,
    reset,
  } = useBrokerAuth({
    brokerName,
    authEndpoint,
    redirectUri,
    autoStart: isOpen,
  });

  // ======================================================
  // SUCCESS CALLBACK
  // ======================================================

  useEffect(() => {
    if (authenticated) {
      console.log("✅ Broker authentication completed");

      if (onSuccess) {
        onSuccess(authCode);
      }
    }
  }, [authenticated, authCode, onSuccess]);

  // ======================================================
  // ERROR CALLBACK
  // ======================================================

  useEffect(() => {
    if (error) {
      console.error("❌ Broker auth modal error:", error);

      if (onError) {
        onError(error);
      }
    }
  }, [error, onError]);

  // ======================================================
  // CLOSE HANDLER
  // ======================================================

  const handleClose = () => {
    reset();
    onClose();
  };

  // ======================================================
  // ESC KEY SUPPORT
  // ======================================================

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  // ======================================================
  // DO NOT RENDER
  // ======================================================

  if (!isOpen) return null;

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/60
        backdrop-blur-sm
        p-3 sm:p-5
      "
    >
      {/* ================================================= */}
      {/* MODAL CONTAINER */}
      {/* ================================================= */}

      <div
        className="
          relative
          w-full
          max-w-5xl
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
          animate-in fade-in zoom-in
        "
      >
        {/* ============================================= */}
        {/* HEADER */}
        {/* ============================================= */}

        <div
          className="
            flex items-center justify-between
            border-b border-gray-200
            px-4 py-4 sm:px-6
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-semibold
                text-gray-800
                sm:text-xl
              "
            >
              {brokerName} Authentication
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-gray-500
                sm:text-sm
              "
            >
              Complete broker login securely
            </p>
          </div>

          {/* CLOSE BUTTON */}

          <button
            onClick={handleClose}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-gray-100
              text-gray-500
              transition-all duration-200
              hover:bg-red-100
              hover:text-red-500
            "
          >
            ✕
          </button>
        </div>

        {/* ============================================= */}
        {/* BODY */}
        {/* ============================================= */}

        <div
          className="
            relative
            min-h-[500px]
            bg-gray-50
            p-3 sm:p-5
          "
        >
          {/* LOADING */}

          {loading && !authenticated && (
            <div className="mb-4">
              <BrokerLoading
                title={`Connecting ${brokerName}`}
                subtitle="Secure authentication is loading..."
              />
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div
              className="
                mb-4
                rounded-xl
                border border-red-200
                bg-red-50
                p-4
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {authenticated && (
            <div
              className="
                mb-4
                rounded-xl
                border border-green-200
                bg-green-50
                p-4
                text-sm
                text-green-700
              "
            >
              ✅ Authentication completed successfully
            </div>
          )}

          {/* IFRAME */}

          {!authenticated && (
            <BrokerIframe
              authUrl={authUrl}
              height="650px"
              onLoad={() => {
                console.log(
                  `📦 ${brokerName} iframe loaded`
                );
              }}
            />
          )}
        </div>

        {/* ============================================= */}
        {/* FOOTER */}
        {/* ============================================= */}

        <div
          className="
            flex flex-col-reverse gap-3
            border-t border-gray-200
            bg-white
            px-4 py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          <div
            className="
              text-center text-xs text-gray-500
              sm:text-left
            "
          >
            Your broker credentials are never stored locally.
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="
                rounded-xl
                border border-gray-300
                px-5 py-2
                text-sm font-medium
                text-gray-700
                transition-all duration-200
                hover:bg-gray-100
              "
            >
              Cancel
            </button>

            {authenticated && (
              <button
                onClick={handleClose}
                className="
                  rounded-xl
                  bg-indigo-600
                  px-5 py-2
                  text-sm font-medium
                  text-white
                  transition-all duration-200
                  hover:bg-indigo-700
                "
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerAuthModalImproved;