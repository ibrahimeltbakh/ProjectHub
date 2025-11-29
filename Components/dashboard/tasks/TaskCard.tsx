"use client";

import { motion } from "framer-motion";
import { TaskType } from "@/types/general";
import { Button } from "@/Components/ui/button";
import { FiEdit2 } from "react-icons/fi";
import { User } from "@/types/auth";

interface TaskCardProps {
  task: TaskType;
  index: number;
  user: User | null;
  isSelected: boolean;
  onSelect: (taskId: string) => void;
  onEdit: (task: TaskType) => void;
  onStatusUpdate: (taskId: string, status: TaskType["status"]) => void;
}

export default function TaskCard({
  task,
  index,
  user,
  isSelected,
  onSelect,
  onEdit,
  onStatusUpdate,
}: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
      className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-500/50"
          : "border-gray-700/50"
      }`}>
      {user?.role === "admin" && (
        <div className="flex justify-end mb-2">
          <button
            onClick={() => onSelect(task.id)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={`Select task ${task.title}`}>
            {isSelected ? (
              <svg
                className="w-5 h-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>
        </div>
      )}
      <h3 className="font-bold text-lg text-white mb-3">{task.title}</h3>
      {task.description && (
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Status:</span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              task.status === "Done"
                ? "bg-green-500/20 text-green-400"
                : task.status === "In Progress"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-gray-500/20 text-gray-400"
            }`}>
            {task.status}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Priority:</span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              task.priority === "High"
                ? "bg-red-500/20 text-red-400"
                : task.priority === "Medium"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-green-500/20 text-green-400"
            }`}>
            {task.priority}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Assigned to:</span>
          <span className="text-white text-sm">
            {task.assigned_to || "Unassigned"}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-700/50">
          <span>{task.start_date}</span>
          <span>→</span>
          <span>{task.end_date}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {user?.role === "developer" && task.status === "Todo" && (
          <Button
            onClick={() => onStatusUpdate(task.id, "In Progress")}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            aria-label={`Start task: ${task.title}`}>
            Start Task
          </Button>
        )}
        {user?.role === "admin" && task.status === "In Progress" && (
          <Button
            onClick={() => onStatusUpdate(task.id, "Done")}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white transition-colors"
            aria-label={`Approve task: ${task.title}`}>
            Approve Task
          </Button>
        )}
        {user?.role === "admin" && (
          <Button
            onClick={() => onEdit(task)}
            className="bg-amber-500 hover:bg-amber-600 text-white transition-colors"
            aria-label={`Edit task: ${task.title}`}>
            <FiEdit2 className="w-4 h-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
