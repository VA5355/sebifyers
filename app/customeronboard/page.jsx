"use client";

import PaymentResponseModal from "@/app/PaymentResponseModal";

export default function CustomerOnboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      
      {/* Modal handles everything */}
      <PaymentResponseModal />

      {/* Optional fallback UI */}
      <p className="text-gray-500 text-sm">
        Processing your payment...
      </p>
    </div>
  );
}