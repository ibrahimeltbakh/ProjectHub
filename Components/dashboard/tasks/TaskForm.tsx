"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "@/lib/validations/projectSchema";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";

interface TaskFormProps {
  onSubmit: (data: {
    title: string;
    description?: string;
    status: "Todo" | "In Progress" | "Done";
    priority: "Low" | "Medium" | "High";
    assigned_to?: string;
    start_date: string;
    end_date: string;
  }) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const {
    register: registerTask,
    handleSubmit: handleTaskSubmit,
    formState: { errors: taskErrors },
    reset: resetTask,
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Todo" as "Todo" | "In Progress" | "Done",
      priority: "Medium" as "Low" | "Medium" | "High",
      assigned_to: "",
      start_date: "",
      end_date: "",
    },
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    resetTask();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-6">Add New Task</h3>
      <form onSubmit={handleTaskSubmit(handleSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-gray-300 mb-2">
              Task Title
            </label>
            <input
              id="task-title"
              type="text"
              {...registerTask("title")}
              className={`p-3 rounded-lg bg-gray-800/50 border text-white placeholder-gray-400 focus:outline-none transition-colors ${
                taskErrors.title
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              placeholder="Task Title"
              aria-invalid={taskErrors.title ? "true" : "false"}
            />
            {taskErrors.title && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {taskErrors.title.message as string}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="task-description"
              className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="task-description"
              {...registerTask("description")}
              className={`p-3 rounded-lg bg-gray-800/50 border text-white placeholder-gray-400 focus:outline-none transition-colors ${
                taskErrors.description
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              placeholder="Description"
              rows={3}
              aria-invalid={taskErrors.description ? "true" : "false"}
            />
            {taskErrors.description && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {taskErrors.description.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="task-status"
              className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              id="task-status"
              {...registerTask("status")}
              className={`p-3 rounded-lg bg-gray-800/50 border text-white focus:outline-none transition-colors ${
                taskErrors.status
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              aria-invalid={taskErrors.status ? "true" : "false"}>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {taskErrors.status && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {taskErrors.status.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="task-priority"
              className="block text-sm font-medium text-gray-300 mb-2">
              Priority
            </label>
            <select
              id="task-priority"
              {...registerTask("priority")}
              className={`p-3 rounded-lg bg-gray-800/50 border text-white focus:outline-none transition-colors ${
                taskErrors.priority
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              aria-invalid={taskErrors.priority ? "true" : "false"}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {taskErrors.priority && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {taskErrors.priority.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="task-assigned"
              className="block text-sm font-medium text-gray-300 mb-2">
              Assigned to
            </label>
            <input
              id="task-assigned"
              type="text"
              {...registerTask("assigned_to")}
              className={`p-3 rounded-lg bg-gray-800/50 border text-white placeholder-gray-400 focus:outline-none transition-colors ${
                taskErrors.assigned_to
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              placeholder="Assigned to"
              aria-invalid={taskErrors.assigned_to ? "true" : "false"}
            />
            {taskErrors.assigned_to && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {taskErrors.assigned_to.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="task-start-date"
              className="block text-sm font-medium text-gray-300 mb-2">
              Start Date
            </label>
            <input
              id="task-start-date"
              type="date"
              {...registerTask("start_date")}
              className={`p-3 rounded-lg bg-gray-800/50 border text-white focus:outline-none transition-colors ${
                taskErrors.start_date
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              aria-invalid={taskErrors.start_date ? "true" : "false"}
            />
            {taskErrors.start_date && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {taskErrors.start_date.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="task-end-date"
              className="block text-sm font-medium text-gray-300 mb-2">
              End Date
            </label>
            <input
              id="task-end-date"
              type="date"
              {...registerTask("end_date")}
              className={`p-3 rounded-lg bg-gray-800/50 border text-white focus:outline-none transition-colors ${
                taskErrors.end_date
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              aria-invalid={taskErrors.end_date ? "true" : "false"}
            />
            {taskErrors.end_date && (
              <p className="mt-1 text-sm text-red-400" role="alert">
                {taskErrors.end_date.message as string}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="md:col-span-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            Add Task
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
