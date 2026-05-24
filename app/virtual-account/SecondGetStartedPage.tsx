"use client";

import { motion } from "framer-motion";
import { Lock, User, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function SecondGetStartedPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<any>({});

  const validate = () => {

    const newErrors: any = {};

    if (!username.trim()) {
      newErrors.username = "Username required";
    }

    if (!password.trim()) {
      newErrors.password = "Password required";
    }

    if (password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {

    if (!validate()) return;

    try {

      console.log("LOGIN");

      /**
       * CALL YOUR NETLIFY FUNCTION HERE
       */

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2ff] flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[32px] shadow-2xl p-8"
      >

        <img
          src="https://onedinaar.com/splash-logo-new.png"
          className="h-16 mb-6"
        />

        <h2 className="text-3xl font-bold text-slate-800">
          Login to OneDinaar
        </h2>

        <p className="text-slate-500 mt-2">
          Access your virtual trading account
        </p>

        {/* USERNAME */}
        <div className="mt-8">

          <div className="relative">

            <User className="absolute left-4 top-4 text-slate-400" />

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full border border-slate-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errors.username && (
            <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
              <AlertCircle size={14} />
              {errors.username}
            </div>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mt-5">

          <div className="relative">

            <Lock className="absolute left-4 top-4 text-slate-400" />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-slate-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errors.password && (
            <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
              <AlertCircle size={14} />
              {errors.password}
            </div>
          )}
        </div>

        <button
          onClick={handleContinue}
          className="w-full mt-8 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl py-4 font-semibold transition-all shadow-xl"
        >
          Continue
        </button>

      </motion.div>
    </div>
  );
}