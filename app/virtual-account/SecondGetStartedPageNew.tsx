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
import { useMemo, useState } from "react";
import { showModal, showError } from '@/components/common/service/ModalService';
import { BASEREF } from '@/libs/client';
import {useDispatch, useSelector} from 'react-redux';

export default function SecondGetStartedPage() {
const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
 const dispatch = useDispatch();
  const usernameError = useMemo(() => {
    if (!submitted) return '';

    if (!username.trim()) {
      return 'Username is required';
    }

    if (username.trim().length < 4) {
      return 'Username must be at least 4 characters';
    }

    return '';
  }, [username, submitted]);

  const passwordError = useMemo(() => {
    if (!submitted) return '';

    if (!password.trim()) {
      return 'Password is required';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return '';
  }, [password, submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitted(true);

    if (!usernameError && !passwordError && username && password) {
      console.log('Proceed with authentication');
// display the modal showing appreciate you interest at Onedinaar virtual platform. Please use the right credentials provided to you during Virtual Account activation.
// In case you are facing issue please concat sales-man@storenotify.in with the query.
       let sym =`Dear ${username} , appreciate you interest at Onedinaar virtual platform. \n Please use the right credentials provided to you during Virtual Account activation.
       \n In case you are facing issue please concat sales-man@storenotify.in with the query.`

       dispatch(showModal({ title: 'Virtual Login Status', message: `${sym}  `, }  ));
    }
  };

  return (
    <section
      id="get-started-page"
      className="relative overflow-hidden rounded-[40px] border border-indigo-100 bg-[#eef2ff] shadow-2xl"
    >
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_35%)]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 p-8 md:p-14 min-h-[900px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[40px] bg-indigo-200/30 blur-2xl" />

          <div className="relative rounded-[40px] border-[3px] border-indigo-600 bg-[#f7f9ff]/90 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between flex-wrap gap-4">{/** */}
                <div className="flex item-start  ml-[-12] gap-3"> {/** items-center  mx-36*/}
                  <img
                    src={`${BASEREF}/splash-logo-new.png`}
                    alt="OneDinaar"
                    className="h-16 object-contain" style={{ marginLeft: '-54px'}}
                  />
                </div>

                <nav className="flex items-center gap-6 text-sm font-semibold text-indigo-800">
                  <a href="#" className="hover:text-indigo-500">
                    HOME
                  </a>

                  <a
                    href="#"
                    className="rounded-xl bg-indigo-700 px-5 py-2 text-white shadow-lg"
                  >
                    PAGE
                  </a>

                  <a href="#" className="hover:text-indigo-500">
                    ABOUT
                  </a>

                  <a href="#" className="hover:text-indigo-500">
                    SEE MORE
                  </a>
                </nav>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <p className="text-xl uppercase tracking-widest text-indigo-700">
                      Business Company
                    </p>

                    <h2 className="mt-3 text-5xl font-black text-indigo-800 leading-tight">
                      TRADE VIRTUAL
                    </h2>
                  </div>

                  <p className="max-w-lg text-4xl font-black leading-tight text-blue-950">
                    Best partner with the zeal to guide better in all trades
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-2xl bg-white-700 px-10 py-4 text-lg font-bold tracking-wide text-white shadow-xl"
                  >
                      <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    src={`${BASEREF}/virtual-trading-logo.png`}
                    alt="Virtual Trading"
                    className="w-full max-w-[560px] object-contain drop-shadow-2xl"
                  />
                  </motion.button>
                </div>

                <div className="relative flex justify-center">
               
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-xl rounded-[32px] border border-white/60 bg-white/90 p-10 shadow-2xl backdrop-blur-xl">
            <div className="mb-10">
              <h3 className="text-4xl font-black text-slate-800">
                Login to{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Onedinaar
                </span>
              </h3>

              <p className="mt-3 text-slate-500">
                Continue your virtual trading journey with secure account access.
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <label className="mb-3 block text-sm font-bold uppercase tracking-widest text-slate-500">
                  Username
                </label>

                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
                  <User className="mr-3 h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent text-lg outline-none placeholder:text-slate-300"
                  />
                </div>

                {usernameError && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {usernameError}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-bold uppercase tracking-widest text-slate-500">
                  Password
                </label>

                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
                  <Lock className="mr-3 h-5 w-5 text-slate-400" />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-lg outline-none placeholder:text-slate-300"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-indigo-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {passwordError && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-5 text-lg font-bold text-white shadow-xl shadow-indigo-200"
              >
                Continue
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-500">
                Don&apos;t have an account?{' '}
                <a
                  href={`${BASEREF}`}
                  target="_blank"
                  className="font-bold text-indigo-600 hover:text-indigo-500"
                  rel="noreferrer"
                >
                  Open account
                </a>
              </p>
            </div>

            <div className="mt-12 border-t border-slate-100 pt-6 text-center text-sm leading-7 text-slate-400">
              By proceeding, you agree to the T&amp;C and Privacy Policy of
              OneDinaar Ltd.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}