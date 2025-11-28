import { supabase } from "../supabaseClient";

export type ProjectType = {
  id?: string;
  name: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  progress?: number;
  budget?: number;
};

export const getProjects = async (): Promise<ProjectType[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getProjectById = async (
  projectId: string
): Promise<ProjectType> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) throw error;
  return data;
};

export const addProject = async (project: ProjectType) => {
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select();

  if (error) throw error;
  return data[0];
};

export const updateProject = async (
  projectId: string,
  project: Partial<ProjectType>
) => {
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", projectId)
    .select();

  if (error) throw error;
  return data[0];
};

export const removeProject = async (projectId: string) => {
  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) throw error;
  return data;
};
