"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Lock,
  User,
  Eye,
  EyeOff,
} from 'lucide-react';
import { BASEREF } from '@/libs/client';
interface Props {
  onGetStarted: () => void;
}
function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-3xl border border-indigo-100 bg-white/90 p-5 shadow-lg shadow-indigo-100"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
    </motion.div>
  );
}
export default function FirstLandingPage({
  onGetStarted,
}: Props) {
  return (
    
    <section className="relative overflow-hidden rounded-[40px] border border-indigo-100 bg-gradient-to-br from-[#f4f7ff] via-[#eef4ff] to-[#ffffff] shadow-2xl">
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 md:p-14 items-center min-h-[760px]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <img
             src={`${BASEREF}/splash-logo-new.png`}
              alt="OneDinaar"
              className="h-16 object-contain"  style={{ marginLeft: '-54px'}}
            />
          </div>

          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-black leading-tight"
            >
              <span className="text-blue-700">BEST</span>{' '}
              <span className="text-slate-700">web</span>{' '}
              <span className="text-emerald-500">virtual trade</span>{' '}
              <span className="text-slate-800">platform</span>
            </motion.h1>

            <p className="text-lg text-slate-600 max-w-2xl leading-8">
              Your premium virtual trading workspace is now ready. Practice,
              explore live market movement, test strategies, and experience a
              realistic trading ecosystem powered by OneDinaar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Realtime Trading"
              desc="Live market movement and advanced execution simulation."
            />

            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Secure Access"
              desc="Protected virtual trading credentials and cloud sync."
            />

            <FeatureCard
              icon={<Wallet className="h-6 w-6" />}
              title="Portfolio Ready"
              desc="Track virtual positions and monitor profit or loss."
            />
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}  onClick={onGetStarted}
            href="#get-started-page"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-indigo-200"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />

          <div className="relative overflow-hidden rounded-[32px] border border-white/50 bg-white/80 p-5 shadow-2xl backdrop-blur-lg">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm text-slate-400">Virtual Trading Preview</p>
                <h3 className="text-lg font-bold text-slate-800">
                  OneDinaar Live Experience
                </h3>
              </div>

              <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                LIVE
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-inner">
              <iframe
                src={`${BASEREF}`}
                title="OneDinaar Live"
                className="h-[620px] w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}