//BrokerAuthModal.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  ShieldCheck,
  ExternalLink,
  RefreshCcw,
  LockKeyhole,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  authUrl: string;
  title?: string;
  onClose: () => void;
}

const BrokerAuthModal = ({
  isOpen,
  authUrl,
  title = "Secure Broker Login",
  onClose,
}: Props) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [iframeFailed, setIframeFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  /**
   * Detect iframe blocking
   */
  useEffect(() => {
    if (!isOpen) return;

    setIframeFailed(false);
    setLoading(true);

    const timeout = setTimeout(() => {
      try {
        const iframe = iframeRef.current;

        /**
         * If iframe still blank after timeout,
         * broker likely blocked embedding
         */
        if (iframe) {
          setIframeFailed(true);
          setLoading(false);
        }
      } catch (err) {
        setIframeFailed(true);
        setLoading(false);
      }
    }, 3500);

    return () => clearTimeout(timeout);
  }, [isOpen, authUrl]);

  const handleExternalLogin = () => {
    window.open(authUrl, "_self");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-0 z-[9999]
          bg-black/60 backdrop-blur-md
          flex items-center justify-center
          p-0 md:p-6
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="
            relative
            w-full
            h-full
            md:h-[92vh]
            md:w-[92vw]
            lg:w-[1180px]
            bg-white
            rounded-none
            md:rounded-[32px]
            overflow-hidden
            shadow-[0_25px_80px_rgba(0,0,0,0.35)]
            flex
            flex-col
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-2xl">
                <ShieldCheck className="text-green-600 w-5 h-5" />
              </div>

              <div>
                <h2 className="font-bold text-slate-800 text-lg">
                  {title}
                </h2>

                <p className="text-xs text-slate-500">
                  Secure OAuth Authorization
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                p-2 rounded-xl
                hover:bg-slate-100
                transition
              "
            >
              <X />
            </button>
          </div>

          {/* BODY */}
          <div className="relative flex-1 overflow-hidden bg-slate-100">
            {!iframeFailed && (
              <>
                {/* LOADING */}
                {loading && (
                  <div
                    className="
                      absolute inset-0 z-20
                      flex flex-col items-center justify-center
                      bg-white
                    "
                  >
                    <div
                      className="
                        h-14 w-14 rounded-full
                        border-4 border-slate-200
                        border-t-blue-600
                        animate-spin
                      "
                    />

                    <p className="mt-5 text-slate-600 font-medium">
                      Connecting securely...
                    </p>
                  </div>
                )}

                {/* IFRAME */}
                <iframe
                  ref={iframeRef}
                  src={authUrl}
                  className="w-full h-full border-0 bg-white"
                  allow="clipboard-read; clipboard-write"
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                  onLoad={() => {
                    setLoading(false);
                  }}
                  onError={() => {
                    setIframeFailed(true);
                    setLoading(false);
                  }}
                />
              </>
            )}

            {/* FALLBACK UI */}
            {iframeFailed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="
                  absolute inset-0
                  flex items-center justify-center
                  p-6
                  bg-gradient-to-br
                  from-indigo-700
                  via-blue-700
                  to-cyan-600
                "
              >
                <div
                  className="
                    w-full max-w-2xl
                    text-center
                    flex flex-col items-center
                  "
                >
                  {/* ICON */}
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                    }}
                    className="
                      mb-8
                      w-24 h-24
                      rounded-full
                      bg-white/10
                      backdrop-blur-xl
                      flex items-center justify-center
                      border border-white/20
                      shadow-2xl
                    "
                  >
                    <LockKeyhole
                      className="text-white"
                      size={42}
                    />
                  </motion.div>

                  {/* TITLE */}
                  <h2
                    className="
                      text-white
                      text-3xl md:text-5xl
                      font-black
                      tracking-wide
                    "
                  >
                    COMPLETE LOGIN
                  </h2>

                  <p
                    className="
                      mt-5
                      text-white/80
                      text-sm md:text-lg
                      max-w-xl
                      leading-relaxed
                    "
                  >
                    Your broker blocked embedded authentication
                    for security reasons.

                    Continue safely in the same browser tab to
                    complete authorization.
                  </p>

                  {/* CTA BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleExternalLogin}
                    className="
                      mt-10
                      px-8 py-5
                      rounded-3xl
                      bg-white
                      text-blue-700
                      font-bold
                      text-lg
                      shadow-[0_15px_50px_rgba(255,255,255,0.35)]
                      flex items-center gap-3
                      transition-all
                    "
                  >
                    Complete Login
                    <ExternalLink size={20} />
                  </motion.button>

                  {/* RETRY */}
                  <button
                    onClick={() => {
                      setIframeFailed(false);
                      setLoading(true);
                    }}
                    className="
                      mt-6
                      text-white/80
                      hover:text-white
                      flex items-center gap-2
                      text-sm
                    "
                  >
                    <RefreshCcw size={16} />
                    Retry Embedded Login
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* FOOTER */}
          <div
            className="
              border-t
              px-4 py-3
              bg-white
              flex items-center justify-between
            "
          >
            <button
              onClick={handleExternalLogin}
              className="
                text-sm text-blue-600
                hover:text-blue-800
                hover:underline
                transition
              "
            >
              Open externally
            </button>

            <div className="text-xs text-slate-400">
              OAuth Protected Session
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BrokerAuthModal;