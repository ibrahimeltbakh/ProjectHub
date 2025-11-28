export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  confirmEmail: boolean;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address?: string;
  phone?: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
  success: boolean;
}
export interface LoginResponse {
  message: string;
  token: string;
  user: User;
  success: boolean;
}
