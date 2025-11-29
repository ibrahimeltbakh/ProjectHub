"use client";

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarGroupProps {
  title: ReactNode;
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  alwaysOpen?: boolean;
  icon?: ReactNode;
  href?: string;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  title,
  children,
  isActive,
  onClick,
  alwaysOpen = false,
  icon,
  href,
}) => {
  const [open, setOpen] = useState(alwaysOpen);
  const pathname = usePathname();
  const isHomeActive = href && pathname === href;

  const handleClick = () => {
    if (!alwaysOpen) {
      setOpen(!open);
    }
    if (onClick) onClick();
  };

  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className="mb-4">
      {alwaysOpen ? (
        <div className="mb-2">
          {href && !hasChildren ? (
            <Link href={href} className="relative block">
              <div
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer group ${
                  isHomeActive
                    ? "bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-emerald-500/30 border border-blue-500/40 shadow-md"
                    : "bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-emerald-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:via-cyan-500/30 hover:to-emerald-500/30"
                }`}>
                {icon && (
                  <span
                    className={`transition-colors ${
                      isHomeActive
                        ? "text-cyan-400"
                        : "text-blue-400 group-hover:text-cyan-400"
                    }`}>
                    {icon}
                  </span>
                )}
                <span
                  className={`font-semibold text-sm transition-colors ${
                    isHomeActive
                      ? "text-cyan-300"
                      : "text-blue-300 group-hover:text-cyan-300"
                  }`}>
                  {title}
                </span>
                {isHomeActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-cyan-400 to-emerald-400 rounded-r-full"></div>
                )}
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-emerald-500/20 border border-blue-500/30">
              {icon && <span className="text-blue-400">{icon}</span>}
              <span className="font-semibold text-sm text-blue-300">
                {title}
              </span>
            </div>
          )}
          {hasChildren && <div className="ml-2 space-y-1 mt-2">{children}</div>}
        </div>
      ) : (
        <>
          <button
            onClick={handleClick}
            className={`w-full text-left font-semibold text-sm mb-2 px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between group
            ${
              isActive
                ? "bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-emerald-500/20 text-blue-300 border border-blue-500/30"
                : "text-gray-400 hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-cyan-500/10 hover:to-emerald-500/10 hover:text-cyan-300 border border-transparent hover:border-blue-500/20"
            }`}>
            <div className="flex items-center gap-2">
              {icon && (
                <span className="group-hover:text-cyan-400 transition-colors">
                  {icon}
                </span>
              )}
              <span>{title}</span>
            </div>
            <motion.div
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}>
              <FiChevronRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
            </motion.div>
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2 space-y-1 mt-2 overflow-hidden">
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};
