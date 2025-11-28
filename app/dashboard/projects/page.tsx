"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/Components/ProtectedRoute";
import { useProjects } from "@/lib/supabase/useProjects";
import Actions from "@/Components/dashboard/projects/Actions";
import ProductsTable from "@/Components/dashboard/projects/ProjectsTable";
import Loading from "@/Components/Loading/Loading";
import Error from "@/Components/Error/Error";

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState(projects);

  React.useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  if (isLoading) return <Loading />;
  if (isError) return <Error error="Failed to load projects" />;

  return (
    <ProtectedRoute allowedRoles={["admin", "manager", "developer"]}>
      <div className="sm:container flex flex-col justify-center items-center gap-6 mt-10">
        <h1 className="text-blue-400 text-3xl font-extrabold text-center">
          Projects
        </h1>

        {/* <Actions
          products={projects}
          filteredProducts={filteredProjects}
          setFilteredProducts={setFilteredProjects}
        /> */}

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ProductsTable projects={(filteredProjects as any) || []} />
      </div>
    </ProtectedRoute>
  );
}
