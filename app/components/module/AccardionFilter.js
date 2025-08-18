import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "iconsax-reactjs";
export default function AccardionFilter({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between w-full py-3 font-medium text-[var(--color-gray-900)]"
      >
        <span>{title}</span>
        <Icons.ArrowDown2
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
