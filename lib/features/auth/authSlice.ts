import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../../api/config";
import {
  User,
  AuthState,
  LoginFormValues,
  RegisterFormValues,
  LoginResponse,
  RegisterResponse,
} from "@/types/auth";
import { getRoleFromEmail } from "@/utils/getRole";

export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginFormValues,
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    return response.data as LoginResponse;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return rejectWithValue(
      (error.response?.data as { message?: string })?.message || "Login failed"
    );
  }
});

export const registerThunk = createAsyncThunk<
  RegisterResponse,
  RegisterFormValues,
  { rejectValue: string }
>(
  "auth/register",
  async (
    { name, email, password, confirmPassword, address, phone },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
        confirmPassword,
        address,
        phone,
      });

      return response.data as RegisterResponse;
    } catch (err: unknown) {
      const error = err as AxiosError;
      return rejectWithValue(
        (error.response?.data as { message?: string })?.message ||
          "Register failed"
      );
    }
  }
);

export const getUser = (): User | null => {
  const user = localStorage.getItem("user");
  if (!user) return null;

  const parsed = JSON.parse(user) as User;

  return {
    ...parsed,
    role: getRoleFromEmail(parsed.email),
  };
};

const initialState: AuthState = {
  user: getUser(),
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;

      const backendUser = action.payload.user;

      const customUser = {
        ...backendUser,
        role: getRoleFromEmail(backendUser.email),
      };

      state.user = customUser;
      localStorage.setItem("user", JSON.stringify(customUser));

      localStorage.setItem("token", action.payload.token);
    });

    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
