"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAddProject } from "@/lib/supabase/useAddProject";
import { getUser } from "@/lib/features/auth/authSlice";
import Error from "@/Components/Error/Error";
import ProtectedRoute from "@/Components/ProtectedRoute";
import { FiPlus } from "react-icons/fi";
import { ProjectFormData } from "@/lib/validations/projectSchema";
import toast from "react-hot-toast";
import PageHeader from "@/Components/dashboard/common/PageHeader";
import ProjectForm from "@/Components/dashboard/projects/ProjectForm";

export default function AddProjectPage() {
  const router = useRouter();
  const user = getUser();
  const { mutate: addProject, isPending } = useAddProject();

  const onSubmit = (data: ProjectFormData) => {
    addProject(data, {
      onSuccess: () => {
        router.push("/dashboard/projects");
      },
      onError: (error: Error) => {
        toast.error(error?.message || "Failed to add project");
      },
    });
  };

  if (user?.role !== "manager") {
    return <Error error="Access denied. Only managers can add projects." />;
  }

  return (
    <ProtectedRoute allowedRoles={["manager"]}>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Add New Project"
          description="Create a new project to get started"
          icon={<FiPlus className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />}
        />

        <ProjectForm
          onSubmit={onSubmit}
          onCancel={() => router.back()}
          isLoading={isPending}
          submitLabel="Add Project"
        />
      </div>
    </ProtectedRoute>
  );
}
