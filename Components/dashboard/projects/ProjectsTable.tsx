"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

import { Button } from "@/Components/ui/button";

import UpdateProjectButton from "./UpdateProjectButton";
import RemoveProjectButton from "./RemoveProjectButton";
import { getUser } from "@/lib/features/auth/authSlice";
import { User } from "@/types/auth";

// تعريف الواجهة (مفترض أنك ستضعها في ملف منفصل مثل types.ts)
export interface ProjectType {
  _id: string;
  id: string;
  name: string;
  status: "Planning" | "In Progress" | "Completed" | "On Hold" | "Canceled";
  startDate: string;
  dueDate: string; // تم التعديل من endDate
  progress: number; // 0-100
  budget: number;
  client: string; // حقل جديد
  manager: string; // حقل جديد
}

interface ProjectsTableProps {
  projects: ProjectType[];
}

// تحويل المكون إلى TypeScript
export default function ProjectsTable({ projects = [] }: ProjectsTableProps) {
  const [user] = useState<User | null>(() => getUser());

  // تعديل رؤوس الأعمدة لتناسب المشاريع
  const tableHead = [
    { title: "Project Name", key: "name" },
    { title: "Status", key: "status" },
    { title: "Progress", key: "progress" },
    { title: "Start Date", key: "startDate" },
    { title: "Due Date", key: "dueDate" },
    { title: "Budget", key: "budget" },
    { title: "Client", key: "client" },
  ];

  if (user?.role === "admin")
    tableHead.push({ title: "Actions", key: "actions" });
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const selectedProjects = projects.slice(startIndex, endIndex);

  // دالة مساعدة لتنسيق الألوان حسب الحالة
  const getStatusColor = (status: ProjectType["status"]) => {
    switch (status) {
      case "Completed":
        return "text-green-400 bg-green-900/50";
      case "In Progress":
        return "text-blue-400 bg-blue-900/50";
      case "On Hold":
        return "text-yellow-400 bg-yellow-900/50";
      case "Canceled":
        return "text-red-400 bg-red-900/50";
      default:
        return "text-gray-400 bg-gray-900/50";
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-700 to-gray-800 py-5 rounded-lg shadow-md ">
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        <Table className="min-w-full text-sm sm:text-base text-center ">
          <TableHeader>
            <TableRow>
              {tableHead.map((item) => (
                <TableHead
                  key={item.key}
                  className="px-6 py-3 text-center font-semibold uppercase tracking-wide">
                  {item.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-border">
            {selectedProjects.map((project) => (
              <TableRow
                key={project?._id || project?.id}
                className="hover:bg-gray-700 transition-colors text-center">
                {/* اسم المشروع */}
                <TableCell className="px-6 py-3 font-semibold text-white">
                  {project?.name}
                </TableCell>

                <TableCell className="px-6 py-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      project?.status
                    )}`}>
                    {project?.status}
                  </span>
                </TableCell>

                <TableCell className="px-6 py-3">
                  <div className="w-20 bg-gray-600 rounded-full h-2.5 mx-auto">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${project?.progress || 0}%` }}></div>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {project?.progress}%
                    </span>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-3 text-gray-300">
                  {project?.startDate}
                </TableCell>

                <TableCell className="px-6 py-3 text-gray-300">
                  {project?.dueDate}
                </TableCell>

                <TableCell className="px-6 py-3 text-yellow-400 font-medium">
                  ${(project?.budget || 0).toLocaleString()}
                </TableCell>

                <TableCell className="px-6 py-3 text-gray-400">
                  {project?.client}
                </TableCell>

                {user?.role === "admin" && (
                  <TableCell className="px-6 py-3 space-x-2">
                    <UpdateProjectButton
                      projectId={project?._id || project?.id}
                    />
                    <RemoveProjectButton
                      projectId={project?._id || project?.id}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap  justify-center items-center  gap-2 mt-4">
        <Button
          variant="outline"
          className="border-blue-500 text-blue-500 hover:bg-blue-700 hover:text-white"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          Previous
        </Button>

        {[...Array(totalPages)].map((_, idx) => (
          <Button
            key={idx}
            variant={currentPage === idx + 1 ? "default" : "outline"}
            className={
              currentPage === idx + 1
                ? "bg-blue-500 text-white hover:bg-blue-700 "
                : "text-gray-500 border-blue-500"
            }
            onClick={() => setCurrentPage(idx + 1)}>
            {idx + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          className="border-blue-500 text-blue-500 hover:bg-blue-700 hover:text-white"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
