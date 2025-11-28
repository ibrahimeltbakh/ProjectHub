import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProject } from "./projectsFunctions";
import toast from "react-hot-toast";

export const useRemoveProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => removeProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      toast.success("Project removed successfully ✅");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to remove project ❌");
    },
  });
};
