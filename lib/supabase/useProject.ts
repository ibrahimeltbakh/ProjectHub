import { useQuery } from "@tanstack/react-query";
import { getProjectById, ProjectType } from "./projectsFunctions";

export const useProject = (projectId: string) => {
  return useQuery<ProjectType, Error>({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });
};
