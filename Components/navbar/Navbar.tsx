"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUserFromStorage } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import type { AppDispatch, RootState } from "@/lib/store";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    dispatch(setUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    setTimeout(() => router.push("/login"), 150);
  };

  return (
    <nav
      className="bg-linear-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm border-b border-gray-700/50 shadow-lg sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation">
      <div className="flex justify-between items-center container py-3">
        <Link
          href="/dashboard"
          className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all"
          aria-label="ProjectHub Home">
          ProjectHub
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-md hover:from-blue-500/30 hover:to-cyan-500/30 hover:shadow-md transition-all text-sm text-gray-100"
            aria-label="User menu">
            <FaUser aria-hidden="true" />
            <span>{user ? user.name : "Guest"}</span>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-linear-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-xl z-50 overflow-hidden"
                role="menu">
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-linear-to-r hover:from-blue-500/20 hover:to-cyan-500/20 text-sm transition-colors"
                      role="menuitem">
                      <FaSignInAlt className="inline mr-2 text-blue-400" />
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-linear-to-r hover:from-blue-500/20 hover:to-cyan-500/20 text-sm transition-colors"
                      role="menuitem">
                      <FaUserPlus className="inline mr-2 text-cyan-400" />
                      Register
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-3 text-red-400 hover:bg-red-900/20 text-sm transition-colors"
                    role="menuitem">
                    <FaSignOutAlt className="inline mr-2" />
                    Logout
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
