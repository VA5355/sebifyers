"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";

interface Props {
  onGetStarted: () => void;
}

export default function FirstLandingPage({
  onGetStarted,
}: Props) {
  return (
    <div className="min-h-screen bg-[#eef2ff] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 py-10">

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://onedinaar.com/splash-logo-new.png"
              className="h-20 mb-4"
            />

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="text-blue-700">BEST</span>{" "}
              <span className="text-slate-700">web</span>{" "}
              <span className="text-green-600">
                virtual trade
              </span>{" "}
              <span className="text-slate-800">platform</span>
            </h1>

            <p className="mt-6 text-slate-600 text-lg max-w-xl">
              Experience real-time virtual trading with
              institutional-grade execution simulation,
              portfolio insights and AI-powered signals.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-white rounded-2xl px-5 py-4 shadow-md flex items-center gap-3">
                <ShieldCheck className="text-blue-700" />
                <span className="font-medium">
                  Secure Virtual Accounts
                </span>
              </div>

              <div className="bg-white rounded-2xl px-5 py-4 shadow-md flex items-center gap-3">
                <TrendingUp className="text-green-600" />
                <span className="font-medium">
                  Live Market Feel
                </span>
              </div>
            </div>

            <button
              onClick={onGetStarted}
              className="mt-10 bg-blue-700 hover:bg-blue-800 transition-all text-white px-8 py-4 rounded-2xl font-semibold shadow-xl flex items-center gap-3"
            >
              GET STARTED
              <ArrowRight size={20} />
            </button>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-white rounded-[40px] p-5 shadow-2xl border border-slate-200">

              <div className="overflow-hidden rounded-3xl h-[650px]">
                <iframe
                  src="https://onedinaar.com"
                  className="w-full h-full"
                />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}