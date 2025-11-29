"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: number | string;
  label: string;
  gradient: string;
  border: string;
  iconColor: string;
  valueColor: string;
  delay?: number;
}

export default function StatCard({
  icon,
  value,
  label,
  gradient,
  border,
  iconColor,
  valueColor,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-linear-to-br ${gradient} backdrop-blur-sm border ${border} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <div className="flex items-center justify-between mb-2">
        <div className={iconColor}>{icon}</div>
        <span className={`text-3xl font-bold ${valueColor}`}>{value}</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
        {label}
      </h3>
    </motion.div>
  );
}
