export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}
export interface ProjectType {
  id?: string;
  name: string;
  status: "In Progress" | "Completed" | "Pending ";
  start_date: string;
  end_date: string;
  progress: number;
  budget: number;
}
export interface TaskType {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  assigned_to?: string;
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
}
