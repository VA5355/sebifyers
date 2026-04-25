//✅ Robust React Modal Component (Ready-to-use)
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const decodeHeader = (encoded) => {
  try {
    if (!encoded) return null;

    const jsonString = atob(encoded); // Base64 decode
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Decode failed:", err);
    return null;
  }
};

const convertMillisecondsToDate = (timestampStr) => {
  let timestamp = Number(timestampStr);

  if (isNaN(timestamp) || timestamp <= 0) {
    return "**/**/****";
  }

  if (timestampStr.length === 10) {
    timestamp *= 1000;
  }

  const date = new Date(timestamp);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

const PaymentResponseModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const encoded = searchParams.get("customboardingheader");

    if (encoded) {
      const decoded = decodeHeader(encoded);

      if (decoded) {
        setData(decoded);
        setOpen(true);
      }
    }
  }, [searchParams]);

  const handleClose = () => {
    setOpen(false);

    // Clean URL after closing
    router.replace("/customeronboard");
  };

  if (!open || !data) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-5"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-green-600">
              ✅ Payment Successful
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
            <p><strong>Order ID:</strong> {data?.razorpay_order_id || "-"}</p>
            <p><strong>Payment ID:</strong> {data?.razorpay_payment_id || "-"}</p>
            <p><strong>Status:</strong> {data?.status || "SUCCESS"}</p>

            {data?.created_at && (
              <p>
                <strong>Date:</strong>{" "}
                {convertMillisecondsToDate(String(data.created_at))}
              </p>
            )}

            {data?.amount && (
              <p>
                <strong>Amount:</strong> ₹{(data.amount / 100).toFixed(2)}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-5">
            <button
              onClick={handleClose}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentResponseModal;
