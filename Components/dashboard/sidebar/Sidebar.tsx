"use client";

import React, { useState, ReactNode } from "react";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  children: ReactNode;
  roleTitle?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  roleTitle = "Dashboard",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open Sidebar"
        className="md:hidden fixed top-15 left-3 z-50 p-2 text-3xl rounded-lg text-emerald-400 bg-gradient-to-br from-blue-600/80 to-emerald-600/80 hover:from-blue-500 hover:to-emerald-500 transition-all duration-300 shadow-lg"
        onClick={() => setIsOpen(true)}>
        <BiMenu />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col h-auto border-r border-blue-500/30 bg-gradient-to-b from-blue-950/40 via-cyan-950/40 to-emerald-950/40 backdrop-blur-sm p-6 w-64 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent tracking-wide">
            {roleTitle}
          </h2>
          <div className="mt-2 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-full"></div>
        </motion.div>
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-transparent">
          {children}
        </div>
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
              className="fixed top-0 left-0 z-50 w-64 min-h-screen bg-gradient-to-b from-blue-950/90 via-cyan-950/90 to-emerald-950/90 backdrop-blur-sm p-5 shadow-2xl border-r border-blue-500/30">
              <div className="flex justify-between items-center mb-6">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  {roleTitle}
                </motion.h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-red-400 text-2xl hover:text-red-300 hover:rotate-90 transition-all duration-300">
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
