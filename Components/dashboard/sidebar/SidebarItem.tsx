"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface SidebarItemProps {
  icon?: ReactNode;
  label: string;
  href: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
}) => (
  <Link
    href={href}
    className="flex items-center justify-center gap-2 px-3 py-2 rounded w-full text-sm hover:bg-gray-800 hover:text-white transition">
    {icon}
    {label}
  </Link>
);
