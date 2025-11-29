"use client";

import { ReactNode } from "react";

interface RoleInfoCardProps {
  role: "admin" | "manager" | "developer";
  title: string;
  description: string;
  icon: ReactNode;
}

const roleStyles = {
  admin: {
    gradient: "from-blue-600/20 to-blue-800/20",
    border: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    titleColor: "text-blue-300",
    circleBg: "bg-blue-500/10",
  },
  manager: {
    gradient: "from-green-600/20 to-emerald-800/20",
    border: "border-green-500/30",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    titleColor: "text-green-300",
    circleBg: "bg-green-500/10",
  },
  developer: {
    gradient: "from-gray-600/20 to-gray-800/20",
    border: "border-gray-500/30",
    iconBg: "bg-gray-500/20",
    iconColor: "text-gray-400",
    titleColor: "text-gray-300",
    circleBg: "bg-gray-500/10",
  },
};

export default function RoleInfoCard({
  role,
  title,
  description,
  icon,
}: RoleInfoCardProps) {
  const styles = roleStyles[role];

  return (
    <div
      className={`relative p-6 bg-linear-to-br ${styles.gradient} backdrop-blur-sm border ${styles.border} rounded-xl shadow-lg overflow-hidden`}>
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${styles.circleBg} rounded-full -mr-16 -mt-16`}></div>
      <div className="relative flex items-start gap-4">
        <div className={`p-3 ${styles.iconBg} rounded-lg`}>
          <div className={styles.iconColor}>{icon}</div>
        </div>
        <div className="flex-1">
          <h3
            className={`text-lg font-bold ${styles.titleColor} mb-2 flex items-center gap-2`}>
            {icon}
            {title}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
