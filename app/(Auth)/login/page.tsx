"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk as login } from "@/lib/features/auth/authSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import { ClipLoader } from "react-spinners";
import { FaSignInAlt } from "react-icons/fa";

import { AppDispatch, RootState } from "@/lib/store";
import {
  RenderPasswordInput,
  RenderRegularInput,
  LoginFields,
  formAnimation,
  inputAnimation,
  FormField,
} from "@/Components/auth/authFunctions";
import { LoginFormValues } from "@/types/general";

export default function Login() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const password = useWatch({ control, name: "password" });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const result = await dispatch(login(data)).unwrap();
      showToast.success(`Welcome back ${result.user.name}`, {
        duration: 4000,
        position: "top-right",
      });
      router.push("/");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      showToast.error(errorMessage, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full bg-gradient-to-br from-gray-600 to-gray-800 md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formAnimation}
          className="w-full max-w-md bg-white bg-gradient-to-b from-slate-700 to-slate-900 p-8 rounded-xl shadow-lg space-y-6">
          <motion.h2
            variants={inputAnimation}
            className="text-3xl font-extrabold text-center text-blue-400">
            Welcome Back!
          </motion.h2>
          <motion.h3
            variants={inputAnimation}
            className="text-center text-gray-300">
            Sign in to continue
          </motion.h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {LoginFields.map((field: FormField) =>
              field.type === "password" ? (
                <RenderPasswordInput
                  key={field.name}
                  field={field}
                  showPassword={showPassword}
                  showConfirmPassword={showConfirmPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  toggleConfirmPasswordVisibility={
                    toggleConfirmPasswordVisibility
                  }
                  password={password}
                  errors={errors}
                  register={register}
                />
              ) : (
                <RenderRegularInput
                  key={field.name}
                  field={field}
                  errors={errors}
                  register={register}
                />
              )
            )}

            <motion.button
              variants={inputAnimation}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-md shadow-lg ${
                loading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:from-sky-600 hover:to-blue-700"
              }`}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <ClipLoader className="h-5 w-5 mr-3" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <FaSignInAlt className="text-xl" />
                  <span>Sign In</span>
                </div>
              )}
            </motion.button>
          </form>

          <motion.p
            variants={inputAnimation}
            className="mt-4 text-center text-sm text-gray-300">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-sky-400 hover:underline ml-1">
              Sign Up
            </Link>
          </motion.p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:block w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1616763355603-9755a640a287?auto=format&fit=crop&w=1470&q=80")',
        }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-sky-800/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-6 max-w-lg text-center">
            Unlock exclusive discounts, fast checkout, and order history.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
