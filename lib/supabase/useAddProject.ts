import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject } from "./projectsFunctions";
import toast from "react-hot-toast";
import { ProjectType } from "@/types/general";

export const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: Omit<ProjectType, "id">) => addProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      toast.success("Project added successfully ✅");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add project ❌");
    },
  });
};
