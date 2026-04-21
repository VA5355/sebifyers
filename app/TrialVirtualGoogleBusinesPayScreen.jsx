import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

const TrialVirtualGoogleBusinesPayScreen = ({ amount, orderId }) => {
  // Replace this with the link you extracted in Step 1
  const merchantUpiLink = `upi://pay?pa=MERCHANT_VPA@bank&pn=MERCHANT_NAME&am=${amount}&cu=INR&tn=Order_${orderId}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
      >
        {/* Header */}
        <div className="bg-blue-600 p-8 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode size={32} />
          </div>
          <h2 className="text-2xl font-bold">Secure Checkout</h2>
          <p className="text-blue-100 mt-1 text-sm">Pay via any UPI App</p>
        </div>

        {/* Amount Section */}
        <div className="p-8 text-center">
          <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Total Amount</span>
          <div className="text-5xl font-black text-gray-900 mt-2 mb-8">
            ₹{amount}
          </div>

          {/* Action Button */}
          <motion.a
            href={merchantUpiLink}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
          >
            Pay with UPI <ArrowRight size={20} />
          </motion.a>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-green-600 bg-green-50 py-2 rounded-full">
            <ShieldCheck size={16} />
            <span className="text-xs font-bold uppercase tracking-tighter">NPCI Secure Payment</span>
          </div>
        </div>

        {/* Refund Policy Note */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex gap-3">
            <AlertCircle className="text-amber-500 shrink-0" size={20} />
            <p className="text-[10px] text-gray-500 leading-relaxed">
              <strong>Note:</strong> In case of transaction failure where amount is debited but order is not confirmed, 
              refunds are processed automatically within 3-5 business days as per UPI/NPCI guidelines.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrialVirtualGoogleBusinesPayScreen;
