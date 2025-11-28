"use client";

import ProtectedRoute from "@/Components/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Chart from "@/Components/dashboard/charts/Chart";

import { useProjects } from "@/lib/supabase/useProjects";
import { ProjectType } from "@/types/general";

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
        backgroundColor: ["#4ade80", "#3b82f6"],
      },
    ],
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "manager", "developer"]}>
      <div>
        <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
        <p className="text-gray-600 mb-6">
          Welcome, <span className="font-semibold">{user?.name}</span> 👋
        </p>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          {user?.role === "admin" && (
            <div className="p-4 bg-blue-600 text-white rounded-lg flex-1">
              Admin Panel – You can manage users & all projects.
            </div>
          )}

          {user?.role === "manager" && (
            <div className="p-4 bg-green-600 text-white rounded-lg flex-1">
              Project Manager Area – You can edit, create and assign tasks.
            </div>
          )}

          {user?.role === "developer" && (
            <div className="p-4 bg-gray-600 text-white rounded-lg flex-1">
              Developer Area – You can only view assigned projects.
            </div>
          )}
        </div>

        <div className="mt-6 w-full max-w-lg">
          <Chart data={chartData} title="Projects Overview" />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-200 rounded-lg text-blue-700 font-bold">
            Total Projects: {totalProjects}
          </div>
          <div className="p-4 bg-yellow-200 rounded-lg text-yellow-700 font-bold">
            In Progress: {inProgress}
          </div>
          <div className="p-4 bg-green-200 rounded-lg text-green-700 font-bold">
            Completed: {completed}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
