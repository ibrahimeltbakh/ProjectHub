import { useQuery } from "@tanstack/react-query";
import { getProjects } from "./projectsFunctions";
import { ProjectType } from "@/types/general";

export const useProjects = () => {
  return useQuery<ProjectType[], Error>({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};
