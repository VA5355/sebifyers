import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Mail, Calendar, Phone, 
  ShieldCheck, ArrowRight, Lock 
} from 'lucide-react';

const RefinedKYCModalImproved = ({ isOpen, onClose, onProceed }) => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', dob: '', mobile: ''
  });

  const inputStyle =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-10 py-3 text-sm sm:text-base text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          {/* MODAL */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            onClick={(e) => e.stopPropagation()}
            className="
              w-full 
              sm:max-w-lg 
              bg-white 
              rounded-t-3xl sm:rounded-3xl 
              shadow-2xl 
              overflow-hidden
              max-h-[95vh] 
              flex flex-col
            "
          >
            {/* HEADER */}
            <div className="relative p-5 sm:p-6 border-b border-gray-100">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <ShieldCheck size={20} className="text-white" />
                </div>
                <span className="text-blue-600 font-semibold text-xs uppercase tracking-wide">
                  Identity Verification
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mt-2">
                Complete your KYC
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Unlock lifetime virtual trading access
              </p>
            </div>

            {/* FORM (SCROLLABLE) */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">

              {/* NAME */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="First Name"
                    className={inputStyle}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={inputStyle}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className={inputStyle}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {/* DOB + MOBILE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="date"
                    className={inputStyle}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className={inputStyle}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* TRUST BOX */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2">
                <Lock className="text-blue-600 shrink-0" size={16} />
                <p className="text-[11px] sm:text-xs text-blue-800 leading-relaxed">
                  Your data is encrypted and used only for compliance & payment verification.
                </p>
              </div>
            </div>

            {/* CTA (STICKY FOOTER) */}
            <div className="p-4 border-t border-gray-100">
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => onProceed(formData)}
                className="
                  w-full 
                  bg-gradient-to-r from-yellow-200 via-amber-300 to-green-300
                  text-gray-900
                  font-semibold 
                  py-3 
                  rounded-xl 
                  flex items-center justify-center gap-2
                  shadow-md
                "
              >
                Proceed to Payment <ArrowRight size={18} />
              </motion.button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RefinedKYCModalImproved;
