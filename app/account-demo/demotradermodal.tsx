"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Trophy,
  Mail,
  TrendingUp,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

interface DemoTradeModalProps {
  open: boolean;
  onClose: () => void;
}

const brokers = [
  {
    name: "FYERS",
    logo: "/fyers.jpg",
    color: "from-violet-500 to-purple-600",
    description:
      "Advanced trading platform with powerful charting and API access.",
  },
  {
    name: "Upstox",
    logo: "/upstox.svg",
    color: "from-pink-500 to-rose-500",
    description:
      "Simple investing and trading platform for beginners and professionals.",
  },
  {
    name: "ICICI Direct",
    logo: "/icici.webp",
    color: "from-orange-500 to-red-500",
    description:
      "Trade equities, derivatives, mutual funds and more from one account.",
  },
];

export default function DemoTradeModal({
  open,
  onClose,
}: DemoTradeModalProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const nextBroker = () => {
    setIndex((prev) => (prev + 1) % brokers.length);
  };

  const prevBroker = () => {
    setIndex((prev) => (prev - 1 + brokers.length) % brokers.length);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal    fixed
              z-[60]
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[95vw]
              max-w-4xl
              max-h-[90vh]
              overflow-y-auto
              rounded-3xl
              bg-white
              shadow-2xl
              p-5
              md:p-8*/}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed   inset-0  z-[60]  flex  items-center  justify-center  p-3  md:p-6       "
          >
            <div  className=" w-full  max-w-4xl max-h-[92vh] overflow-y-auto   overflow-x-hidden rounded-3xl bg-white shadow-2xl p-4 md:p-8  "
>
            <div  className=" w-full  sm:max-w-4xl max-h-[92vh] overflow-y-auto   overflow-x-hidden rounded-t-3xl sm:rounded-3xl bg-white   "
>
            {/* Header flex items-start justify-between gap-4*/}
            <div className="flex flex-row items-start justify-between gap-2">
              <div> {/** text-2xl md:text-3xl font-bold text-slate-900  */}
                <h2 className="text-xl md:text-3xl font-bold leading-tight ">
                  Start Trading Risk-Free
                </h2>

                <p className="text-slate-500 mt-2">
                  You are viewing a demo trading account.
                  Choose how you would like to continue.
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  rounded-full
                  p-2
                  hover:bg-slate-100
                  transition
                "
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 gap-4 mt-8">
              {/* Virtual Account */}
              <motion.button
                whileHover={{
                  y: -5,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  text-left
                  hover:border-emerald-500
                  hover:shadow-xl
                  transition-all
                "
              >
                <Trophy className="w-10 h-10 text-emerald-600" />

                <h3 className="font-semibold text-lg mt-4">
                  Trade with Virtual Account
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Practice trading using ₹10,00,000 virtual capital
                  without risking real money.
                </p>

                <div className="flex items-center mt-4 text-emerald-600 font-medium">
                  Start Trading
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </motion.button>

              {/* Email Invite */}
              <motion.button
                whileHover={{
                  y: -5,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  text-left
                  hover:border-blue-500
                  hover:shadow-xl
                  transition-all
                "
              >
                <Mail className="w-10 h-10 text-blue-600" />

                <h3 className="font-semibold text-lg mt-4">
                  Get Virtual Account Invite
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Receive a demo account invitation and onboarding
                  information directly in your email inbox.
                </p>

                <div className="flex items-center mt-4 text-blue-600 font-medium">
                  Send Invite
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </motion.button>
            </div>

            {/* Broker Section */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">
                  Open Live Trading Account
                </h3>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevBroker}
                    className="
                      rounded-full
                      p-2
                      bg-slate-100
                      hover:bg-slate-200
                    "
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextBroker}
                    className="
                      rounded-full
                      p-2
                      bg-slate-100
                      hover:bg-slate-200
                    "
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait"> {/**  min-h-[240px] */}
                <motion.div
                  key={brokers[index].name}
                  initial={{
                    opacity: 0,
                    x: 100,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -100,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className={`
                    mt-4
                    rounded-3xl
                    p-6
                    md:p-8
                    text-white
                   min-h-[180px] md:min-h-[240px]
                    bg-gradient-to-r
                    ${brokers[index].color}
                    flex
                    flex-col
                    justify-between
                  `}
                >
                  <div>
                    <div className="flex items-center gap-4"> {/** h-12 w-auto*/}
                      <img
                        src={brokers[index].logo}
                        alt={brokers[index].name}
                        className="h-8 md:h-12 w-auto bg-white rounded-lg p-2"
                      />

                      <TrendingUp className="w-10 h-10" />
                    </div>
                      {/** text-2xl md:text-3xl */}
                    <h4 className="text-xl md:text-3xl font-bold mt-5">
                      {brokers[index].name}
                    </h4>

                    <p className="mt-3 text-white/90 max-w-xl">
                      {brokers[index].description}
                    </p>
                  </div>

                  <button
                    className="
                      mt-6
                      self-start
                      bg-white
                      text-slate-900
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      hover:shadow-lg
                      transition
                    "
                  >
                    Open Account
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
