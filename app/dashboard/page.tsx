"use client";

import ProtectedRoute from "@/Components/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Chart from "@/Components/dashboard/charts/Chart";
import { useProjects } from "@/lib/supabase/useProjects";
import { ProjectType } from "@/types/general";
import { motion } from "framer-motion";
import PageHeader from "@/Components/dashboard/common/PageHeader";
import RoleInfoCard from "@/Components/dashboard/common/RoleInfoCard";
import StatCard from "@/Components/dashboard/common/StatCard";
import {
  FiBriefcase,
  FiTrendingUp,
  FiCheckCircle,
  FiShield,
  FiUsers,
  FiCode,
} from "react-icons/fi";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: projects } = useProjects();
  console.log(projects);

  const totalProjects = projects?.length || 0;
  const inProgress =
    (projects as ProjectType[])?.filter((p) => p.status === "In Progress")
      .length || 0;
  const completed =
    (projects as ProjectType[])?.filter((p) => p.status === "Completed")
      .length || 0;

  const chartData = {
    labels: ["In Progress", "Completed"],
    datasets: [
      {
        label: "Projects",
        data: [inProgress, completed],
        backgroundColor: ["#3b82f6", "#10b981"],
        borderColor: ["#2563eb", "#059669"],
        borderWidth: 2,
      },
    ],
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "manager", "developer"]}>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Dashboard Overview"
          description={`Welcome back, ${user?.name} 👋`}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8">
          {user?.role === "admin" && (
            <RoleInfoCard
              role="admin"
              title="Admin Panel"
              description="You have full access to manage all projects. You can create, update, and assign projects, as well as approve and oversee all tasks for every project."
              icon={<FiShield className="w-6 h-6" />}
            />
          )}

          {user?.role === "manager" && (
            <RoleInfoCard
              role="manager"
              title="Project Manager Area"
              description="You can add, update, and remove projects, and monitor all tasks associated with your team's projects."
              icon={<FiUsers className="w-6 h-6" />}
            />
          )}

          {user?.role === "developer" && (
            <RoleInfoCard
              role="developer"
              title="Developer Area"
              description="You can view the projects assigned to you and update the status of tasks you are working on."
              icon={<FiCode className="w-6 h-6" />}
            />
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="lg:col-span-2">
            <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FiTrendingUp className="w-5 h-5 text-blue-400" />
                Projects Overview
              </h2>
              <div className="h-64 sm:h-80">
                <Chart data={chartData} title="Projects Overview" />
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <StatCard
              icon={<FiBriefcase className="w-8 h-8" />}
              value={totalProjects}
              label="Total Projects"
              gradient="from-blue-600/20 to-blue-800/20"
              border="border-blue-500/30"
              iconColor="text-blue-400"
              valueColor="text-blue-400"
              delay={0.1}
            />

            <StatCard
              icon={<FiTrendingUp className="w-8 h-8" />}
              value={inProgress}
              label="In Progress"
              gradient="from-yellow-600/20 to-amber-800/20"
              border="border-yellow-500/30"
              iconColor="text-yellow-400"
              valueColor="text-yellow-400"
              delay={0.2}
            />

            <StatCard
              icon={<FiCheckCircle className="w-8 h-8" />}
              value={completed}
              label="Completed"
              gradient="from-green-600/20 to-emerald-800/20"
              border="border-green-500/30"
              iconColor="text-green-400"
              valueColor="text-green-400"
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
