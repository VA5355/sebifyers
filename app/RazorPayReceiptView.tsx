import React from 'react';
import { CheckCircle, Clock, Receipt, IndianRupee, ArrowRight } from 'lucide-react';

export interface RazorOrderPayload {
  id: string;
  receipt: string;
  status: string;
  amount: number;
  created_at: number;
  notes?: {
    key1?: string;
    key2?: string;
  };
}

interface RazorPayReceiptViewProps {
  orderData: RazorOrderPayload | null;
  onProceed: () => void;
  onCancel?: () => void;
}

export const RazorPayReceiptView: React.FC<RazorPayReceiptViewProps> = ({
  orderData,
  onProceed,
  onCancel
}) => {
  // Graceful fallback UI if data hasn't arrived or was dropped
  if (!orderData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <Receipt className="w-12 h-12 text-gray-300 mb-3 animate-pulse" />
        <h3 className="text-base font-bold text-gray-700">No Transaction Data Available</h3>
        <p className="text-xs text-gray-400 mt-1 text-center max-w-xs">
          If your payment was completed, please refresh or contact support with your payment confirmation.
        </p>
      </div>
    );
  }

  const isSuccess = ['paid', 'created', 'captured'].includes(orderData.status?.toLowerCase());
  
  // Safe arithmetic operation to prevent division-by-zero bugs
  const formattedAmount = typeof orderData.amount === 'number' && orderData.amount > 0 
    ? (orderData.amount / 100).toFixed(2) 
    : '0.00';

  const formattedDate = orderData.created_at 
    ? new Date(orderData.created_at * 1000).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    : 'N/A';

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      
      {/* Visual Indicator Status Banner */}
      <div className={`p-5 text-center border-b ${isSuccess ? 'bg-emerald-50/60 border-emerald-100' : 'bg-amber-50/60 border-amber-100'}`}>
        <div className="inline-flex p-3 rounded-full mb-3 bg-white shadow-sm">
          {isSuccess ? (
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          ) : (
            <Clock className="w-8 h-8 text-amber-500" />
          )}
        </div>
        <h2 className="text-lg font-extrabold text-gray-800">
          {isSuccess ? 'Payment Received Successfully' : 'Payment Processing'}
        </h2>
        <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide">
          Status Code: <span className="uppercase font-mono font-bold">{orderData.status || 'Pending'}</span>
        </p>
      </div>

      {/* Main Structural Metadata Stack */}
      <div className="p-6 space-y-4 text-sm">
        
        {/* Dynamic Amount Segment */}
        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <span className="text-gray-500 font-medium">Subscription Fee</span>
          <span className="font-black text-xl text-gray-900 flex items-center gap-0.5">
            <IndianRupee className="w-4 h-4 text-gray-700 stroke-[2.5]" />
            {formattedAmount}
          </span>
        </div>

        {/* Transaction Meta Fields */}
        <div className="grid grid-cols-1 gap-3 text-xs bg-slate-50/60 p-4 rounded-xl border border-slate-100">
          <div className="flex justify-between items-start gap-4">
            <span className="text-gray-400 font-medium">Receipt Key</span>
            <span className="font-mono text-gray-700 font-semibold break-all text-right">{orderData.receipt || 'N/A'}</span>
          </div>
          
          <div className="flex justify-between items-start gap-4">
            <span className="text-gray-400 font-medium">Order Reference</span>
            <span className="font-mono text-gray-700 font-semibold break-all text-right">{orderData.id || 'N/A'}</span>
          </div>

          <div className="flex justify-between items-start gap-4">
            <span className="text-gray-400 font-medium">Timestamp</span>
            <span className="text-gray-700 font-semibold text-right">{formattedDate}</span>
          </div>
        </div>

        {/* Dynamic Notes Section */}
        {orderData.notes?.key2 && (
          <div className="p-3 bg-indigo-50/40 border border-indigo-100/50 rounded-xl">
            <h4 className="text-[11px] font-bold text-indigo-900/60 uppercase tracking-wider">Plan Coverage</h4>
            <p className="text-xs text-indigo-950 font-medium mt-1 leading-relaxed">
              {orderData.notes.key2}
            </p>
          </div>
        )}

        {/* Core Control CTA System */}
        <div className="space-y-2 pt-4">
          <button
            type="button"
            onClick={onProceed}
            className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Proceed to Setup Virtual Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2.5 text-xs text-gray-400 hover:text-gray-600 font-bold tracking-wide transition-colors"
            >
              Back to Home
            </button>
          )}
        </div>

      </div>
    </div>
  );
};