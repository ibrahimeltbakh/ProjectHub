"use client";

import { motion } from "framer-motion";
import { ProjectType } from "@/types/general";

interface ProjectProgressCardProps {
  project: ProjectType;
  delay?: number;
}

export default function ProjectProgressCard({
  project,
  delay = 0,
}: ProjectProgressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
      <h2 className="font-semibold text-lg text-gray-300 mb-3">Progress</h2>
      <div className="w-full bg-gray-700/50 rounded-full h-3 mb-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${project.progress}%` }}
          transition={{ duration: 1, delay: delay + 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"></motion.div>
      </div>
      <p className="text-white font-semibold">{project.progress}%</p>
    </motion.div>
  );
}
