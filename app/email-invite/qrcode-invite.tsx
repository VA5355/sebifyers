"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  QrCode,
  ShieldCheck,
  ArrowRight,
  X,
   
  ExternalLink,
  RefreshCcw,
  LockKeyhole,
} from "lucide-react";
import { useState , useRef, } from "react";
import QRCode from "react-qr-code";

export default function QRInvitePage() {
  const [openModal, setOpenModal] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeFailed, setIframeFailed] = useState(false);
  const [loading, setLoading] = useState(true);
 
  const FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL!;
 const handleExternalLogin = () => {
    window.open(FORM_URL, "_self");
  //  openWindowWithPost(authUrl, )
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-[-120px] right-[-120px] w-[300px] h-[300px] bg-blue-300/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] left-[-120px] w-[300px] h-[300px] bg-indigo-300/20 blur-3xl rounded-full" />

      <div className="relative z-10 flex items-center justify-center px-4 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-6xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[34px] overflow-hidden grid grid-cols-1 lg:grid-cols-2"
        >
          {/* LEFT SIDE */}
          <div className="p-7 md:p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                  <QrCode className="text-white w-7 h-7" />
                </div>

                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                    OneDinaar
                  </h1>
                  <p className="text-sm text-slate-500">
                    Virtual Trading Invite
                  </p>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-black leading-tight text-slate-900">
                Scan & Access
                <span className="block text-blue-600 mt-1">
                  Premium Virtual Trading
                </span>
              </h2>

              <p className="mt-6 text-slate-600 text-base md:text-lg leading-relaxed">
                Experience real-time virtual trading with premium access,
                portfolio tracking, live simulations, and broker integrations.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4">
                {[
                  "Secure virtual account onboarding",
                  "Realtime trading experience",
                  "Fast mobile-first access",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                    </div>

                    <span className="text-slate-700 font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setOpenModal(true)}
                className="mt-10 h-14 px-7 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold flex items-center gap-3 shadow-xl"
              >
                <Mail className="w-5 h-5" />
                Get Email Invite
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-[34px] shadow-2xl p-6 md:p-8 max-w-md w-full"
            >
              <div className="text-center mb-5">
                <h3 className="text-2xl font-black text-slate-900">
                  Scan QR Code
                </h3>

                <p className="text-slate-500 mt-2 text-sm">
                  Open directly on your mobile device
                </p>
              </div>

              {/* QR IMAGE */}
              <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white p-4 shadow-inner">
                <Image
                  src="/Ef32N7.png"
                  alt="QR Code"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
                    {/** 
                      IN CASE the QR Code does not work 
                      
                      <div className="bg-white p-5 rounded-3xl">
                    <QRCode
                        value="https://docs.google.com/forms/d/e/1FAIpQLSdt1cNM4fEvswqPX7461H0br0OZosFWOED6F7GYK5OEp8JNRw/viewform?usp=publish-editor"
                        size={260}
                        style={{
                            width: "100%",
                            height: "auto"
                        }}
                    />
                    </div>
                    
                     */}
              <div className="mt-5 text-center text-sm text-slate-500">
                Point your camera to scan instantly
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ========================= */}
      {/* MODAL */}
      {/* ========================= */}

      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white rounded-[30px] overflow-hidden shadow-2xl w-full max-w-5xl h-[92vh]"
          >
            {/* HEADER */}
            <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-white">
              <div>
                <h2 className="font-black text-slate-900 text-xl">
                  OneDinaar Invite Form
                </h2>

                <p className="text-xs text-slate-500">
                  Complete your virtual account request
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* IFRAME  className="w-full h-full border-0 bg-white"    referrerPolicy="strict-origin-when-cross-origin"*/}
            {!iframeFailed && ( 

                  <iframe
              src={FORM_URL}
              className="w-full h-[calc(92vh-64px)]"
              loading="lazy"
              
                  allow="clipboard-read; clipboard-write"
               
                  sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                  onLoad={() => {
                    setLoading(false);
                  }}
                  onError={() => {
                    setIframeFailed(true);
                    setLoading(false);
                  }}
            />
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
                  EMAIL INVITE
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
                    Invites from Social Identity providers as Google/Facebook are blocked 
                    for security reasons.

                    Continue safely in the same browser tab to
                    complete invitation.
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
                    Retry Invite
                  </button>
                </div>
              </motion.div>
            )}
          
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}