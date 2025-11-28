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
  id: string;
  name: string;
  status: "In Progress" | "Completed" | "Pending";
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
}
