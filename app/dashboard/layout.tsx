"use client";

import Navbar from "@/Components/navbar/Navbar";
import { Sidebar } from "@/Components/dashboard/sidebar/Sidebar";
import { SidebarGroup } from "@/Components/dashboard/sidebar/SidebarGroup";
import { SidebarItem } from "@/Components/dashboard/sidebar/SidebarItem";
import { FiHome, FiFolder, FiPlus } from "react-icons/fi";
import { getUser } from "@/lib/features/auth/authSlice";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user] = useState(() => getUser());
  const userRole = user?.role || "developer";

  const getRoleTitle = () => {
    switch (userRole) {
      case "admin":
        return "Admin Dashboard";
      case "manager":
        return "Manager Dashboard";
      case "developer":
        return "Developer Dashboard";
      default:
        return "Dashboard";
    }
  };

  const sidebarGroups: Array<{
    icon: React.ReactNode;
    title: string;
    links: Array<{ label: string; href: string; icon: React.ReactNode }>;
    alwaysOpen: boolean;
    href?: string;
  }> = [
    {
      icon: <FiHome className="w-4 h-4" />,
      title: "Home",
      links: [],
      alwaysOpen: true,
      href: "/dashboard",
    },
    {
      icon: <FiFolder className="w-4 h-4" />,
      title: "Projects",
      links: [
        {
          label: "All Projects",
          href: "/dashboard/projects",
          icon: <FiFolder className="w-4 h-4" />,
        },
      ],
      alwaysOpen: false,
    },
  ];

  if (userRole === "manager") {
    sidebarGroups[1].links.push({
      label: "Add Project",
      href: "/dashboard/projects/add",
      icon: <FiPlus className="w-4 h-4" />,
    });
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar roleTitle={getRoleTitle()}>
          {sidebarGroups.map((group, idx) => (
            <SidebarGroup
              key={idx}
              title={group.title}
              alwaysOpen={group.alwaysOpen}
              icon={group.icon}
              href={group.href}>
              {group.links.map((link, index) => (
                <SidebarItem
                  key={index}
                  label={link.label}
                  href={link.href}
                  icon={link.icon}
                />
              ))}
            </SidebarGroup>
          ))}
        </Sidebar>
        <div className="flex-1 w-full overflow-x-hidden">{children}</div>
      </div>
    </>
  );
}
