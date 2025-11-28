// RemoveProjectButton.tsx
"use client";

import { Button } from "@/Components/ui/button";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

import { useRemoveProject } from "@/lib/supabase/useRemoveProject";

interface RemoveProjectButtonProps {
  projectId: string;
}

export default function RemoveProjectButton({
  projectId,
}: RemoveProjectButtonProps) {
  const { mutate } = useRemoveProject();

  return (
    <Button
      className="bg-transparent cursor-pointer text-red-800 hover:text-red-600 hover:border hover:border-red-600 hover:bg-transparent focus:outline-none"
      onClick={() => {
        Swal.fire({
          title: "Are you sure?",
          text: "You want to remove this project!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!",
        }).then((result) => {
          if (result.isConfirmed) {
            mutate(projectId);
          }
        });
      }}>
      <FaTrash />
    </Button>
  );
}
