//Updated TrialVirtualGoogleBusinesPayScreen.jsx
//You will need to install qrcode.react to render the merchant link into a scannable image:
//npm install qrcode.react

//JavaScript
import React, { useState, useEffect } from 'react';
 import   useIsMobile   from "@/components/listing/tradeGrid/useIsMobile";
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, ShieldCheck, AlertCircle, ArrowRight, X, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const TrialVirtualGoogleBusinesPayScreenImproved = ({ amount, orderId, onClose }) => {
  const [showDesktopQR, setShowDesktopQR] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
   // CHECK MOBILE OR DESTOP
       const isMobile = useIsMobile();

  // Your unique Merchant Link
  //const merchantUpiLink = `upi://pay?pa=MERCHANT_VPA@bank&pn=MERCHANT_NAME&am=${amount}&cu=INR&tn=Order_${orderId}`; 
   // upi://pay?pa=7588230462@okbizaxis&pn=Store%20Notify&mc=8220&aid=uGICAgJDR4_iPBA&ver=01&mode=01&tr=BCR2DN6D5HE5VIJ7
   let merchantVPA = '7588230462@okbizaxis';
   let merchantName = 'Store%20Notify';

  const merchantUpiLink = `upi://pay?pa=${merchantVPA}&pn=${merchantName}&am=${amount}&cu=INR&tn=Order_${orderId}`;

  // Timer Logic
  useEffect(() => {
    if (!showDesktopQR) return;
    if (timeLeft === 0) {
      setShowDesktopQR(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showDesktopQR, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const openUPI = () => {
  const upiLink = merchantUpiLink;

  // Try intent (best for Android Chrome)
  const intentLink = `intent://${upiLink.replace('upi://', '')}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;

  if (/Android/i.test(navigator.userAgent)) {
    window.location.href = intentLink;
  } else {
    window.location.href = upiLink;
  }
};

  const handlePaymentClick = (e) => {
    // Check if user is on Desktop (simple check)
    /*if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      e.preventDefault();
      setShowDesktopQR(true);
      setTimeLeft(180); // Reset timer when opened
    }*/
   /*  if (isMobile) {
    // Mobile → open UPI directly
        return;
    } else {
        // Desktop → show QR
        e.preventDefault();
        setShowDesktopQR(true);
        setTimeLeft(180);
    }*/ 
    if (isMobile) {
         openUPI();

    setTimeout(() => {
      setShowDesktopQR(true);
    }, 1500);

  } else {
    e.preventDefault();
    setShowDesktopQR(true);
  }


  };

  return (
    <div className="min-h-screen bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 fixed inset-0 z-[110]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={` max-w-md w-full bg-white rounded-[2.5rem] ${isMobile ? "gap-6 mt-12 py-4": "gap-2"}  shadow-2xl overflow-hidden relative`}
      > 

        
                      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white relative">  {/* Header / Brand Area */}
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
                          <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Pay Gateway </span>
                        </div>
                        <h2 className="text-3xl font-bold mt-2">Almost there!</h2>
                        <p className="text-slate-400 text-sm mt-1">Complete Payment for lifetime virtual trading.</p>
                      </div>
        
        {/* Header */}
        <div className="bg-blue-600 p-8 text-center text-white relative">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode size={32} />
          </div>
          <h2 className="text-2xl font-bold font-sans">Payment Portal</h2>
          <p className="text-blue-100 mt-1 text-sm">Secure Merchant Transaction</p>
        </div>

        {/* Amount Section */}
        <div className="p-10 text-center">
          <span className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold">Payable Amount</span>
          <div className="text-5xl font-black text-slate-900 mt-3 mb-10">
            ₹{amount}
          </div>

          <motion.a
            href={merchantUpiLink}
            onClick={handlePaymentClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all mb-6"
          >
            Pay with Any UPI App <ArrowRight size={20} />
          </motion.a>

          <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-[10px] uppercase tracking-wider">
            <ShieldCheck size={16} />
            NPCI Verified Merchant
          </div>
        </div>

        {/* Desktop QR Modal / Overlay 
        absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-8 text-center
        absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-gray-100 rounded-full
           */}

        <AnimatePresence>
          {showDesktopQR && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center px-4 py-6 sm:p-8"
            >
              <button 
                onClick={() => setShowDesktopQR(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-gray-100 rounded-full"
              >  {/* absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-black transition-colors
                     
           */}
                <X size={20} />
              </button>
                    {/* text-xl font-bold text-slate-900 mb-2   */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Scan to Pay</h3>
                {/*  text-gray-500 text-sm mb-6*/}
              <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">Open GPay, PhonePe, or Paytm on your phone</p>

              <div className="p-4 bg-white border-2 border-slate-100 rounded-3xl shadow-inner mb-6">
                {/*   THIS CODE SHOW the QR from the MERCHANT LNINK   no NEED of SEPARATE IMAGE  <QRCodeSVG value={merchantUpiLink} size={200} level="H" includeMargin={true} />*/ }
                <div className="w-full flex justify-center">
                    <QRCodeSVG 
                        value={merchantUpiLink} 
                        size={isMobile ? 180 : 220} 
                        level="H" 
                        includeMargin={true} 
                    />
                    </div>
              </div>
                {/* flex items-center gap-2 text-amber-600 font-mono font-bold bg-amber-50 px-4 py-2 rounded-full text-sm */}
              <div className="flex items-center gap-2 text-amber-600 font-mono font-bold bg-amber-50 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm">
                <Clock size={16} />
                Link expires in {formatTime(timeLeft)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-6 bg-slate-50 border-t border-gray-100">
          <div className="flex gap-3">
            <AlertCircle className="text-amber-500 shrink-0" size={20} />
            <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
              Payment guidelines: If money is debited but status is not updated, refunds are initiated per UPI 2.0 standards within 72 hours.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrialVirtualGoogleBusinesPayScreenImproved;
