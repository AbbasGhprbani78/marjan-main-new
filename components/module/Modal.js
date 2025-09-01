"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "iconsax-reactjs";

export default function Modal({ openModal, setOpenModal, children }) {
  return (
    <AnimatePresence>
      {openModal && (
        <motion.div
          className="fixed inset-0   z-50 bg-[#292D32CC] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 z-40"
            onClick={() => setOpenModal(false)}
          ></div>

          <motion.div
            className="z-50 w-[95%] lg:w-auto"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
