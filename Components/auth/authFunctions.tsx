"use client";

import { motion } from "framer-motion";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

// Animation objects
export const formAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

export const inputAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

// Types
export interface FormField {
  icon: React.ElementType;
  name: string;
  type: string;
  placeholder: string;
}

// Password Input Component
interface PasswordInputProps {
  field: FormField;
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;
  password: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

export const RenderPasswordInput: React.FC<PasswordInputProps> = ({
  field,
  showPassword,
  showConfirmPassword,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
  password,
  errors,
  register,
}) => (
  <motion.div key={field.name} variants={inputAnimation} className="relative">
    <div className="absolute left-3 top-3 text-sky-400 z-10">
      <field.icon />
    </div>
    <input
      type={
        field.name === "password"
          ? showPassword
            ? "text"
            : "password"
          : showConfirmPassword
          ? "text"
          : "password"
      }
      placeholder={field.placeholder}
      className={`w-full pl-10 pr-10 py-2 text-white border ${
        errors[field.name] ? "border-red-500" : "border-gray-300"
      } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300`}
      {...register(field.name, {
        required: `${field.placeholder} is required`,
        ...(field.name === "password" && {
          minLength: {
            value: 4,
            message: "Password must be at least 4 characters",
          },
          pattern: {
            value: /^[A-Za-z\d]{4,}$/,
            message: "Password must include letters and numbers",
          },
        }),
        ...(field.name === "confirmPassword" && {
          validate: (value) => value === password || "Passwords do not match",
        }),
      })}
    />
    <div
      className="absolute right-3 top-3 text-gray-500 cursor-pointer z-10 hover:text-sky-500 transition-colors duration-200"
      onClick={
        field.name === "password"
          ? togglePasswordVisibility
          : toggleConfirmPasswordVisibility
      }>
      {field.name === "password" ? (
        showPassword ? (
          <FaEyeSlash />
        ) : (
          <FaEye />
        )
      ) : showConfirmPassword ? (
        <FaEyeSlash />
      ) : (
        <FaEye />
      )}
    </div>
    {errors[field.name] && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1 text-sm text-red-500">
        {errors[field.name]?.message as string}
      </motion.p>
    )}
  </motion.div>
);

// Regular Input Component
interface RegularInputProps {
  field: FormField;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

export const RenderRegularInput: React.FC<RegularInputProps> = ({
  field,
  errors,
  register,
}) => (
  <motion.div key={field.name} variants={inputAnimation} className="relative">
    <div className="absolute left-3 top-3 text-sky-400 z-10">
      <field.icon />
    </div>
    <input
      type={field.type}
      placeholder={field.placeholder}
      className={`w-full pl-10 pr-4 py-2 text-white border ${
        errors[field.name] ? "border-red-500" : "border-gray-300"
      } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300`}
      {...register(field.name, {
        required: `${field.placeholder} is required`,
        ...(field.name === "email" && {
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        }),
        ...(field.name === "phone" && {
          pattern: {
            value: /^(\+?[0-9]{1,3})?[0-9]{10,15}$/,
            message: "Phone number must be 10-15 digits",
          },
        }),
      })}
    />
    {errors[field.name] && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1 text-sm text-red-500">
        {errors[field.name]?.message as string}
      </motion.p>
    )}
  </motion.div>
);

export const registerFields: FormField[] = [
  { icon: FaUser, name: "name", type: "text", placeholder: "Full Name" },
  {
    icon: FaEnvelope,
    name: "email",
    type: "email",
    placeholder: "Email Address",
  },
  { icon: FaPhone, name: "phone", type: "text", placeholder: "Phone Number" },
  {
    icon: FaMapMarkerAlt,
    name: "address",
    type: "text",
    placeholder: "Address",
  },
  { icon: FaLock, name: "password", type: "password", placeholder: "Password" },
  {
    icon: FaLock,
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

export const LoginFields: FormField[] = [
  {
    icon: FaEnvelope,
    name: "email",
    type: "email",
    placeholder: "Email Address",
  },
  { icon: FaLock, name: "password", type: "password", placeholder: "Password" },
];
