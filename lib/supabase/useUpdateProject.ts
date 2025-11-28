import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject, ProjectType } from "./projectsFunctions";
import toast from "react-hot-toast";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      project,
    }: {
      projectId: string;
      project: Partial<ProjectType>;
    }) => updateProject(projectId, project),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      toast.success("Project updated successfully ✅");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update project ❌");
    },
  });
};
