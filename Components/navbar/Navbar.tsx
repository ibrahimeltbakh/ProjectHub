"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getUser, logout } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import type { AppDispatch } from "@/lib/store";
import { User } from "@/types/auth";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [user] = useState<User | null>(() => getUser());

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

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

  const handleLogout = async () => {
    setDropdownOpen(false);
    dispatch(logout());
    setTimeout(() => {
      router.push("/login");
    }, 150);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center container py-3">
        <Link href="/admin" className=" text-2xl font-bold text-white ">
          ProjectHub
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-600 rounded-md hover:shadow-md transition text-sm text-gray-100">
            <FaUser />
            {user ? user.name : "Guest"}
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-gray-700 text-sm">
                      <FaSignInAlt className="inline mr-2" />
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-3 hover:bg-gray-700 text-sm">
                      <FaUserPlus className="inline mr-2" />
                      Register
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-3 text-red-600 hover:bg-red-900/20 text-sm">
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
