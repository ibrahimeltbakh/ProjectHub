"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  icon?: ReactNode;
  label: string;
  href: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg w-full text-sm transition-all duration-200 group relative
      ${
        isActive
          ? "bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-emerald-500/30 text-cyan-300 border border-blue-500/40 shadow-md"
          : "text-gray-400 hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-cyan-500/10 hover:to-emerald-500/10 hover:text-cyan-300 border border-transparent hover:border-blue-500/20"
      }`}>
      {icon && (
        <span
          className={`transition-all duration-200 ${
            isActive
              ? "text-cyan-400 scale-110"
              : "group-hover:text-cyan-400 group-hover:scale-110"
          }`}>
          {icon}
        </span>
      )}
      <span className="font-medium">{label}</span>
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-cyan-400 to-emerald-400 rounded-r-full"></div>
      )}
    </Link>
  );
};
