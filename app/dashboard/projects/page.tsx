"use client";
import React, { useState } from "react";
import ProtectedRoute from "@/Components/ProtectedRoute";
import { useProjects } from "@/lib/supabase/useProjects";
import Actions from "@/Components/dashboard/projects/Actions";
import ProjectsTable from "@/Components/dashboard/projects/ProjectsTable";
import { TableSkeletonLoader } from "@/Components/Loading/SkeletonLoader";
import Error from "@/Components/Error/Error";
import { motion } from "framer-motion";
import { FiFolder } from "react-icons/fi";

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState(projects || []);

  React.useEffect(() => {
    setFilteredProjects(projects || []);
  }, [projects]);

  if (isLoading) return <TableSkeletonLoader />;
  if (isError) return <Error error="Failed to load projects" />;

  return (
    <ProtectedRoute allowedRoles={["admin", "manager", "developer"]}>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <FiFolder className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
            Projects
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Manage and track all your projects in one place
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <Actions
            projects={projects || []}
            filteredProjects={filteredProjects}
            setFilteredProjects={setFilteredProjects}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6">
          <ProjectsTable projects={filteredProjects} />
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
