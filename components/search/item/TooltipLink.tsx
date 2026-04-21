"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointerClick } from "lucide-react";

export default function TooltipLink({
  href,onMouseEnter , onMouseLeave,onClick,className,
  children,parentOnClick,parentMouseEnter,parentMouseLeave
}: {
  href: string;onMouseEnter : any;onMouseLeave : any;onClick:any; className:any;
  children: React.ReactNode;
  parentOnClick: any;
  parentMouseEnter: any;
  parentMouseLeave: any;
}) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => parentMouseEnter()}
      onMouseLeave={() => parentMouseLeave()}
    >
      {/* ✅ Next.js Link */}
      <Link
        href={href}
        className="text-blue-600 font-semibold hover:underline"
          onClick={parentOnClick }
      >
        {children}
      </Link>

      {/* ✅ Tooltip */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 -translate-x-1/2 mt-2 
                       px-3 py-1.5 rounded-lg shadow-md
                       bg-black text-white text-xs flex items-center gap-1.5
                       whitespace-nowrap z-50"
          >
            <MousePointerClick size={14} />
            Stay In Click

            {/* Arrow */}
            <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 
                             w-2 h-2 bg-black rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
