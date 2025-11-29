"use client";

import { motion } from "framer-motion";
import { ProjectType } from "@/types/general";

interface ProjectInfoCardProps {
  project: ProjectType;
  delay?: number;
}

export default function ProjectInfoCard({
  project,
  delay = 0,
}: ProjectInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
      <h2 className="font-semibold text-lg text-gray-300 mb-2">Status</h2>
      <span
        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
          project.status === "Completed"
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : project.status === "In Progress"
            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
        }`}>
        {project.status}
      </span>
    </motion.div>
  );
}
