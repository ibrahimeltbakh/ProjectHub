"use client";

import React, { useState, ReactNode } from "react";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open Sidebar"
        className="md:hidden fixed top-15 left-3 z-50 p-2 text-3xl rounded-lg text-blue-400 bg-gray-800/80 hover:bg-gray-700/80 transition-all duration-300 shadow-md"
        onClick={() => setIsOpen(true)}>
        <BiMenu />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col h-auto border-r border-gray-700 bg-gradient-to-r from-gray-700 to-gray-900 p-6 w-64 shadow-xl">
        <div className="text-center text-2xl font-bold text-blue-400 mb-8 tracking-wide">
          Admin Panel
        </div>
        {children}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="fixed top-0 left-0 z-50 w-64 min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-5 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-400">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-red-500 text-2xl hover:rotate-180 transition-transform duration-300">
                  <MdClose />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-80px)] pr-2">
                {children}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
