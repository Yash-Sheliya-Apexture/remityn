// components/NicknamePopup.tsx
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface NicknamePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const NicknamePopup: React.FC<NicknamePopupProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-10 w-full max-w-xl relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }}
            exit={{ y: -50, opacity: 0 }}
          >
            <button
              className="absolute top-4 right-4 p-3 hover:bg-secondary/80 rounded-full transition-colors duration-300 ease-in-out"
              onClick={onClose}
            >
              <IoClose size={28} className="text-primary "/>
            </button>
            <h3 className="text-3xl font-semibold text-main my-6">{title}</h3>
            {description && (
              <p className="text-gray font-medium mb-6">
                {description}
              </p>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NicknamePopup;