import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Mail, Calendar, Phone, 
  ShieldCheck, ArrowRight, Lock, CheckCircle2 
} from 'lucide-react';

const RefinedKYCModal = ({ isOpen, onClose, onProceed }) => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', dob: '', mobile: ''
  });

  const [errors, setErrors] = useState({});

  const inputStyle = "w-full bg-gray-50 border border-gray-200 rounded-xl px-11 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400";

  return (<> 
    <AnimatePresence>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={onClose}
          >
                {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative"
            ></motion.div>
      {isOpen && (
        
          <> 
        
            
              <div className="bg-white rounded-3xl p-8 text-dark relative">  {/*bg-gradient-to-br from-slate-900 to-slate-800  Header / Brand Area */}
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <ShieldCheck size={24} className="text-white" />
                  </div>
                  <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Identity Verification</span>
                </div>
                <h2 className="text-3xl font-bold mt-2">Almost there!</h2>
                <p className="text-slate-400 text-sm mt-1">Complete your KYC to unlock lifetime virtual trading.</p>
              </div>

           
              <div className="p-8 space-y-5">   {/* Form Area */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      className={inputStyle}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      className={inputStyle}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className={inputStyle}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="date" 
                      className={inputStyle}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="tel" 
                      placeholder="Mobile Number" 
                      className={inputStyle}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    />
                  </div>
                </div>

               
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3"> {/* Trust Footer */}
                  <Lock className="text-blue-600 shrink-0" size={20} />
                  <p className="text-[11px] text-blue-800 leading-relaxed">
                    Your data is encrypted with bank-grade security. We use this information solely for regulatory compliance and payment verification.
                  </p>
                </div>

           
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onProceed(formData)}
                  className="w-full bg-gradient-to-r   from-yellow-200   via-amber-300   to-green-300   text-blue   italic font-semibold tracking-wide   shadow-[0_8px_24px_rgba(255,165,0,0.45)]  py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gree-300 transition-colors shadow-lg shadow-slate-200"
                >      {/* bg-slate-900 CTA Button */}
                  Confirm & Proceed to Pay <ArrowRight size={20} />
                </motion.button>
              </div>
             </>
           
        )}

           </motion.div>
    </AnimatePresence> 
    
    </>
  ) 
}

export default RefinedKYCModal;
