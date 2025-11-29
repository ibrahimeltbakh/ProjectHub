"use client";

import { motion } from "framer-motion";

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <div className="h-10 bg-gray-700/50 rounded-lg w-64 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-700/50 rounded w-48 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
            <div className="h-6 bg-gray-700/50 rounded w-24 mb-4 animate-pulse"></div>
            <div className="h-8 bg-gray-700/50 rounded w-full animate-pulse"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 shadow-lg">
            <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-700/50 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-700/50 rounded w-2/3 mb-4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700/50 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-700/50 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-700/50 rounded w-4/6 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-700/50 rounded w-full mt-4 animate-pulse"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TableSkeletonLoader() {
  return (
    <div className="w-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl overflow-hidden">
      <div className="p-6">
        <div className="h-8 bg-gray-700/50 rounded w-48 mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border-b border-gray-700/30">
              <div className="h-4 bg-gray-700/50 rounded flex-1 animate-pulse"></div>
              <div className="h-4 bg-gray-700/50 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-700/50 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-700/50 rounded w-28 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
