import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Copy, Eye, EyeOff, CheckCircle2, 
  AlertCircle, ArrowRight, Server, Key 
} from 'lucide-react';

const RefinedVirtualAccountModalImproved = ({ isOpen, onClose, onConfirm }) => {
  const [credentials, setCredentials] = useState({ vId: '', vPass: '', salt: '' });
  const [showPass, setShowPass] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mocking the Redux selector logic inside useEffect for the generation logic
  useEffect(() => {
    if (isOpen) {
      // Logic based on your provided order data example
      const orderId = "order_ShHjKtA45C4T3u"; 
      const receiptId = "razor_receipt_2026-03-05 15:04:31";

      try {
        // 1. Extract parts
        const partAfterUnderScore = orderId.split('_')[1]; // ShHjKtA45C4T3u
        const datePart = receiptId.match(/\d{4}-\d{2}-\d{2}/)[0]; // 2026-03-05
        const timePart = receiptId.trim().slice(-8).replace(/:/g, ''); // 150431

        // 2. Generate gVirtualId: reverse of orderPart + date (no dashes)
        const reversedPart = partAfterUnderScore.split('').reverse().join('');
        const gVirtualId = `VT_${reversedPart}_${datePart.replace(/-/g, '')}`;

        // 3. Generate gSalt: (date numbers sum + 15) + timePart
        // Simplified sum logic for date: 2026+03+05 = 2034
        const dateSum = datePart.split('-').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const gSalt = `${dateSum + 15}${timePart}`;

        // 4. Generate gVirtualPass
        const gVirtualPass = `${partAfterUnderScore}${gSalt}`;

        setCredentials({ vId: gVirtualId, vPass: gVirtualPass, salt: gSalt });
      } catch (err) {
        console.error("Credential Generation Failed", err);
      }
    }
  }, [isOpen]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* STATUS HEADER */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center text-white relative">
              <div className="absolute top-4 right-6 opacity-20">
                <Server size={80} />
              </div>
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <ShieldCheck size={32} />
              </motion.div>
              <h2 className="text-2xl font-bold">Account Generated!</h2>
              <p className="text-green-100 text-sm mt-1">Your virtual trading desk is ready</p>
            </div>

            <div className="p-8 space-y-6">
              {/* VIRTUAL ID BOX */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                  Virtual Account User ID
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <code className="flex-1 text-blue-700 font-mono font-bold text-sm truncate">
                    {credentials.vId}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(credentials.vId)}
                    className="p-2 hover:bg-blue-100 rounded-lg text-blue-500 transition-colors"
                  >
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* PASSWORD BOX */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                  Trading Password
                </label>
                <div className="flex items-center gap-2 bg-slate-900 p-4 rounded-2xl shadow-inner">
                  <code className="flex-1 text-emerald-400 font-mono font-bold text-sm">
                    {showPass ? credentials.vPass : "••••••••••••••••"}
                  </code>
                  <button 
                    onClick={() => setShowPass(!showPass)}
                    className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* SECURITY NOTE */}
              <div className="flex gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <Key className="text-amber-600 shrink-0" size={18} />
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Please save these credentials securely. You will need them to log in to the 
                  <span className="font-bold"> OneDinaar</span> trading terminal.
                </p>
              </div>

              {/* PROCEED BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onConfirm(credentials)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
              >
                Complete Setup <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
