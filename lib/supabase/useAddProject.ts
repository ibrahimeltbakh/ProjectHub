import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject, ProjectType } from "./projectsFunctions";
import toast from "react-hot-toast";

export const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: ProjectType) => addProject(project),
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
