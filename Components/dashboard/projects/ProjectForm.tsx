"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  projectSchema,
  ProjectFormData,
} from "@/lib/validations/projectSchema";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<ProjectFormData>;
  submitLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
}

export default function ProjectForm({
  onSubmit,
  onCancel,
  isLoading = false,
  defaultValues,
  submitLabel = "Add Project",
  cancelLabel = "Cancel",
  showCancel = true,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      name: "",
      status: "In Progress" as "In Progress" | "Completed" | "Pending ",
      progress: 0,
      budget: 0,
      start_date: "",
      end_date: "",
      ...defaultValues,
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
        <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2">
                Project Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className={`w-full p-3 rounded-lg bg-gray-800/50 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="Enter project name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="mt-1 text-sm text-red-400"
                  role="alert">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                className={`w-full p-3 rounded-lg bg-gray-800/50 border text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.status
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                aria-invalid={errors.status ? "true" : "false"}>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending ">Pending</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.status.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="progress"
                className="block text-sm font-medium text-gray-300 mb-2">
                Progress (%)
              </label>
              <input
                id="progress"
                type="number"
                min="0"
                max="100"
                {...register("progress", { valueAsNumber: true })}
                className={`w-full p-3 rounded-lg bg-gray-800/50 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.progress
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="0"
                aria-invalid={errors.progress ? "true" : "false"}
              />
              {errors.progress && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.progress.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-300 mb-2">
                Budget
              </label>
              <input
                id="budget"
                type="number"
                min="0"
                {...register("budget", { valueAsNumber: true })}
                className={`w-full p-3 rounded-lg bg-gray-800/50 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.budget
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                placeholder="0"
                aria-invalid={errors.budget ? "true" : "false"}
              />
              {errors.budget && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.budget.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="start_date"
                className="block text-sm font-medium text-gray-300 mb-2">
                Start Date
              </label>
              <input
                id="start_date"
                type="date"
                {...register("start_date")}
                className={`w-full p-3 rounded-lg bg-gray-800/50 border text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.start_date
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                aria-invalid={errors.start_date ? "true" : "false"}
              />
              {errors.start_date && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.start_date.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="end_date"
                className="block text-sm font-medium text-gray-300 mb-2">
                End Date
              </label>
              <input
                id="end_date"
                type="date"
                {...register("end_date")}
                className={`w-full p-3 rounded-lg bg-gray-800/50 border text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.end_date
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                aria-invalid={errors.end_date ? "true" : "false"}
              />
              {errors.end_date && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.end_date.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            {showCancel && onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800">
                {cancelLabel}
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Processing...
                </span>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
