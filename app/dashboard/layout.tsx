"use client";

import Navbar from "@/Components/navbar/Navbar";
import { Sidebar } from "@/Components/dashboard/sidebar/Sidebar";
import { SidebarGroup } from "@/Components/dashboard/sidebar/SidebarGroup";
import { SidebarItem } from "@/Components/dashboard/sidebar/SidebarItem";
import { AiOutlineProject } from "react-icons/ai";
import { getRoleFromEmail } from "@/utils/getRole";
import { getUser } from "@/lib/features/auth/authSlice";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole] = useState<string | null>(() => {
    const user = getUser();
    return user ? getRoleFromEmail(user.email) : null;
  });

  const sidebarGroups = [
    {
      icon: <AiOutlineProject className="w-4 h-4" />,
      title: "Home",
      links: [{ label: "Home", href: "/dashboard" }],
    },
    {
      icon: <AiOutlineProject className="w-4 h-4" />,
      title: "Projects",
      links: [{ label: "All Projects", href: "/dashboard/projects" }],
    },
  ];

  if (userRole === "admin" || userRole === "manager") {
    sidebarGroups[0].links.push({
      label: "Add Project",
      href: "/dashboard/projects/addProject",
    });
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar>
          {sidebarGroups.map((group, idx) => (
            <SidebarGroup key={idx} title={group.title}>
              {group.links.map((link, index) => (
                <SidebarItem key={index} label={link.label} href={link.href} />
              ))}
            </SidebarGroup>
          ))}
        </Sidebar>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </>
  );
}
