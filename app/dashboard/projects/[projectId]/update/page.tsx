"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useProject } from "@/lib/supabase/useProject";
import { useUpdateProject } from "@/lib/supabase/useUpdateProject";
import SkeletonLoader from "@/Components/Loading/SkeletonLoader";
import Error from "@/Components/Error/Error";
import ProtectedRoute from "@/Components/ProtectedRoute";
import { FiEdit2 } from "react-icons/fi";
import { ProjectFormData } from "@/lib/validations/projectSchema";
import toast from "react-hot-toast";
import PageHeader from "@/Components/dashboard/common/PageHeader";
import ProjectForm from "@/Components/dashboard/projects/ProjectForm";

export default function UpdateProjectPage() {
  const { projectId } = useParams();
  const router = useRouter();
  const id = Array.isArray(projectId) ? projectId[0] : projectId || "";
  const { data: project, isLoading, isError } = useProject(id);
  const { mutate: updateProject, isPending } = useUpdateProject();

  const onSubmit = (data: ProjectFormData) => {
    updateProject(
      { projectId: id, project: data },
      {
        onSuccess: () => {
          router.push("/dashboard/projects");
        },
        onError: (error: Error) => {
          toast.error(error?.message || "Failed to update project");
        },
      }
    );
  };

  if (isLoading) return <SkeletonLoader />;
  if (isError || !project) return <Error error="Failed to load project" />;

  return (
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Update Project"
          description="Edit project details"
          icon={<FiEdit2 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />}
        />

        <ProjectForm
          onSubmit={onSubmit}
          onCancel={() => router.back()}
          isLoading={isPending}
          defaultValues={{
            name: project.name,
            status: project.status,
            progress: project.progress,
            budget: project.budget,
            start_date: project.start_date,
            end_date: project.end_date,
          }}
          submitLabel="Update Project"
        />
      </div>
    </ProtectedRoute>
  );
}
