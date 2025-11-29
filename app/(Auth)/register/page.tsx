"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk as registerAction } from "@/lib/features/auth/authSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import { ClipLoader } from "react-spinners";

import { AppDispatch, RootState } from "@/lib/store";
import {
  RenderPasswordInput,
  RenderRegularInput,
  registerFields,
  formAnimation,
  inputAnimation,
  FormField,
} from "@/Components/auth/authFunctions";
import { RegisterFormValues } from "@/types/general";

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const password = useWatch({ control, name: "password" });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const result = await dispatch(registerAction(data)).unwrap();
      showToast.success(result.message, {
        duration: 4000,
        position: "top-right",
      });
      router.push("/login");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      showToast.error(errorMessage, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full bg-linear-to-br from-gray-600 to-gray-800 md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formAnimation}
          className="w-full max-w-md bg-white bg-linear-to-b from-slate-700 to-slate-900 p-8 rounded-xl shadow-lg space-y-6">
          <motion.h2
            variants={inputAnimation}
            className="text-3xl font-extrabold text-center text-blue-400">
            Create an Account
          </motion.h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {registerFields.map((field: FormField) =>
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
              className={`w-full py-3 px-4 bg-linear-to-r from-sky-500 to-blue-600 text-white font-bold rounded-md shadow-lg ${
                loading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:from-sky-600 hover:to-blue-700"
              }`}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <ClipLoader className="h-5 w-5 mr-3" />
                  Registering...
                </div>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <motion.p
            variants={inputAnimation}
            className="mt-4 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link href="/login" className="text-sky-400 hover:underline ml-1">
              Login here
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
            'url("https://images.unsplash.com/photo-1594028879160-a5702f8c0b5b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}>
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/30 to-sky-800/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl font-bold mb-4 text-shadow">
            Join ProjectHub
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl mb-6 text-center text-shadow max-w-lg">
            Create your account and start managing projects, tracking progress,
            and collaborating efficiently with your team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Project Management</div>
              <div className="text-sm">
                Create, edit, and organize all your projects easily
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Task Tracking</div>
              <div className="text-sm">
                Assign tasks and monitor progress in real-time
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Team Collaboration</div>
              <div className="text-sm">
                Work seamlessly with team members and managers
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="font-bold text-xl mb-1">Performance Insights</div>
              <div className="text-sm">
                Get analytics and insights to improve workflow
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
