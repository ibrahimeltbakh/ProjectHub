"use client";

import { motion } from "framer-motion";
import { ProjectType } from "@/types/general";

interface ProjectBudgetCardProps {
  project: ProjectType;
  delay?: number;
}

export default function ProjectBudgetCard({
  project,
  delay = 0,
}: ProjectBudgetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
      <h2 className="font-semibold text-lg text-gray-300 mb-2">Budget</h2>
      <p className="text-2xl font-bold text-yellow-400">
        ${project.budget.toLocaleString()}
      </p>
    </motion.div>
  );
}
