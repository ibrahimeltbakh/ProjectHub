import { useQuery } from "@tanstack/react-query";
import { getProjects, ProjectType } from "./projectsFunctions";

export const useProjects = () => {
  return useQuery<ProjectType[], Error>({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};
