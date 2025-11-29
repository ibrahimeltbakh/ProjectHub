"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  icon,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
        {icon}
        {title}
      </h1>
      {description && (
        <p className="text-gray-400 text-sm sm:text-base">{description}</p>
      )}
    </motion.div>
  );
}
