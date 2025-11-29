import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "./projectsFunctions";
import { ProjectType } from "@/types/general";

export const useProject = (projectId: string) => {
  return useQuery<ProjectType, Error>({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });
};
