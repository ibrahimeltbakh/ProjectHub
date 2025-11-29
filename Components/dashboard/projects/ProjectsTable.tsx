"use client";

import { useState, useRef, useEffect } from "react";
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
import { ProjectType } from "@/types/general";
import Link from "next/link";
import { useUpdateProject } from "@/lib/supabase/useUpdateProject";
import { FiCheck, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

interface ProjectsTableProps {
  projects: ProjectType[];
}

export default function ProjectsTable({ projects = [] }: ProjectsTableProps) {
  const [user] = useState<User | null>(() => getUser());
  const { mutate: updateProject } = useUpdateProject();
  const [editingCell, setEditingCell] = useState<{
    projectId: string;
    field: string;
  } | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const tableHead = [
    { title: "Project Name", key: "name" },
    { title: "Status", key: "status" },
    { title: "Progress", key: "progress" },
    { title: "Start Date", key: "startDate" },
    { title: "Due Date", key: "dueDate" },
    { title: "Budget", key: "budget" },
  ];

  if (user?.role === "admin" || user?.role === "manager")
    tableHead.push({ title: "Actions", key: "actions" });
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const selectedProjects = projects.slice(startIndex, endIndex);

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingCell]);

  const canEdit = user?.role === "admin" || user?.role === "manager";

  const handleDoubleClick = (
    projectId: string | undefined,
    field: string,
    currentValue: string | number
  ) => {
    if (!canEdit || !projectId) return;
    setEditingCell({ projectId, field });
    setEditValue(String(currentValue));
  };

  const handleSave = (projectId: string) => {
    if (!editingCell) return;

    const updates: Partial<ProjectType> = {};

    if (editingCell.field === "progress") {
      const numValue = parseInt(editValue);
      if (isNaN(numValue) || numValue < 0 || numValue > 100) {
        toast.error("Progress must be between 0 and 100");
        return;
      }
      updates.progress = numValue;
    } else if (editingCell.field === "budget") {
      const numValue = parseInt(editValue);
      if (isNaN(numValue) || numValue < 0) {
        toast.error("Budget must be a positive number");
        return;
      }
      updates.budget = numValue;
    } else if (editingCell.field === "status") {
      if (!["In Progress", "Completed", "Pending "].includes(editValue)) {
        toast.error("Invalid status");
        return;
      }
      updates.status = editValue as ProjectType["status"];
    } else if (editingCell.field === "name") {
      if (editValue.trim().length < 3) {
        toast.error("Project name must be at least 3 characters");
        return;
      }
      updates.name = editValue.trim();
    } else if (
      editingCell.field === "startDate" ||
      editingCell.field === "endDate"
    ) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(editValue)) {
        toast.error("Invalid date format (YYYY-MM-DD)");
        return;
      }
      updates[editingCell.field === "startDate" ? "start_date" : "end_date"] =
        editValue;
    }

    updateProject(
      { projectId, project: updates },
      {
        onSuccess: () => {
          setEditingCell(null);
        },
      }
    );
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, projectId: string) => {
    if (e.key === "Enter") {
      handleSave(projectId);
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const getStatusColor = (status: ProjectType["status"]) => {
    switch (status) {
      case "Completed":
        return "text-green-400 bg-green-900/50";
      case "In Progress":
        return "text-blue-400 bg-blue-900/50";
      default:
        return "text-gray-400 bg-gray-900/50";
    }
  };

  return (
    <div
      className="w-full bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl overflow-hidden"
      role="region"
      aria-label="Projects table">
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        <Table className="min-w-full text-sm sm:text-base" role="table">
          <TableHeader>
            <TableRow className="border-b border-gray-700/50 bg-gray-800/30">
              {tableHead.map((item) => (
                <TableHead
                  key={item.key}
                  className="px-4 sm:px-6 py-4 text-center font-semibold uppercase tracking-wide text-gray-300"
                  scope="col">
                  {item.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-700/30">
            {selectedProjects.map((project) => (
              <TableRow
                key={project?.id}
                className="hover:bg-gray-800/50 transition-colors text-center border-b border-gray-700/30">
                <TableCell
                  className="px-4 sm:px-6 py-4 font-semibold text-white"
                  onDoubleClick={() =>
                    canEdit && project.id
                      ? handleDoubleClick(project.id, "name", project.name)
                      : undefined
                  }
                  title={canEdit ? "Double-click to edit" : undefined}
                  role={canEdit ? "button" : undefined}
                  tabIndex={canEdit ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (
                      canEdit &&
                      project.id &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      handleDoubleClick(project.id, "name", project.name);
                    }
                  }}>
                  {editingCell?.projectId === project.id &&
                  editingCell?.field === "name" ? (
                    <div className="flex items-center gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, project.id!)}
                        className="flex-1 px-2 py-1 bg-gray-800 border border-blue-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onBlur={() => handleSave(project.id!)}
                        aria-label={`Edit ${editingCell.field}`}
                      />
                      <button
                        onClick={() => handleSave(project.id!)}
                        className="text-green-400 hover:text-green-300 transition-colors"
                        aria-label="Save changes"
                        type="button">
                        <FiCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Cancel editing"
                        type="button">
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ) : project.id ? (
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                      {project.name}
                    </Link>
                  ) : (
                    <span>{project.name}</span>
                  )}
                </TableCell>

                {/* <TableCell
                  className="px-4 sm:px-6 py-4"
                  onDoubleClick={() =>
                    canEdit && project.id
                      ? handleDoubleClick(project.id, "status", project.status)
                      : undefined
                  }
                  title={canEdit ? "Double-click to edit" : undefined}
                  role={canEdit ? "button" : undefined}
                  tabIndex={canEdit ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (
                      canEdit &&
                      project.id &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      handleDoubleClick(project.id, "status", project.status);
                    }
                  }}>
                  {editingCell?.projectId === project.id &&
                  editingCell?.field === "status" ? (
                    <div className="flex items-center gap-2">
                      <select
                        ref={inputRef as any}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, project.id!)}
                        className="px-2 py-1 bg-gray-800 border border-blue-500 rounded text-white text-sm"
                        onBlur={() => handleSave(project.id!)}>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending ">Pending</option>
                      </select>
                      <button
                        onClick={() => handleSave(project.id!)}
                        className="text-green-400 hover:text-green-300"
                        aria-label="Save">
                        <FiCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-400 hover:text-red-300"
                        aria-label="Cancel">
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full ${getStatusColor(
                        project?.status
                      )}`}>
                      {project?.status}
                    </span>
                  )}
                </TableCell> */}
                <TableCell className="px-4 sm:px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full ${getStatusColor(
                      project?.status
                    )}`}>
                    {project?.status}{" "}
                  </span>
                </TableCell>

                <TableCell
                  className="px-4 sm:px-6 py-4"
                  onDoubleClick={() =>
                    canEdit && project.id
                      ? handleDoubleClick(
                          project.id,
                          "progress",
                          project.progress
                        )
                      : undefined
                  }
                  title={canEdit ? "Double-click to edit" : undefined}
                  role={canEdit ? "button" : undefined}
                  tabIndex={canEdit ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (
                      canEdit &&
                      project.id &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      handleDoubleClick(
                        project.id,
                        "progress",
                        project.progress
                      );
                    }
                  }}>
                  {editingCell?.projectId === project.id &&
                  editingCell?.field === "progress" ? (
                    <div className="flex items-center gap-2">
                      <input
                        ref={inputRef}
                        type="number"
                        min="0"
                        max="100"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, project.id!)}
                        className="w-20 px-2 py-1 bg-gray-800 border border-blue-500 rounded text-white text-sm"
                        onBlur={() => handleSave(project.id!)}
                      />
                      <span className="text-xs text-gray-400">%</span>
                      <button
                        onClick={() => handleSave(project.id!)}
                        className="text-green-400 hover:text-green-300"
                        aria-label="Save">
                        <FiCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-400 hover:text-red-300"
                        aria-label="Cancel">
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-24 bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-linear-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${project?.progress || 0}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">
                        {project?.progress}%
                      </span>
                    </div>
                  )}
                </TableCell>

                <TableCell
                  className="px-4 sm:px-6 py-4 text-gray-300 text-sm"
                  onDoubleClick={() =>
                    canEdit && project.id
                      ? handleDoubleClick(
                          project.id,
                          "startDate",
                          project.start_date
                        )
                      : undefined
                  }
                  title={canEdit ? "Double-click to edit" : undefined}
                  role={canEdit ? "button" : undefined}
                  tabIndex={canEdit ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (
                      canEdit &&
                      project.id &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      handleDoubleClick(
                        project.id,
                        "startDate",
                        project.start_date
                      );
                    }
                  }}>
                  {editingCell?.projectId === project.id &&
                  editingCell?.field === "startDate" ? (
                    <div className="flex items-center gap-2">
                      <input
                        ref={inputRef}
                        type="date"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, project.id!)}
                        className="px-2 py-1 bg-gray-800 border border-blue-500 rounded text-white text-sm"
                        onBlur={() => handleSave(project.id!)}
                      />
                      <button
                        onClick={() => handleSave(project.id!)}
                        className="text-green-400 hover:text-green-300"
                        aria-label="Save">
                        <FiCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-400 hover:text-red-300"
                        aria-label="Cancel">
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span>{project?.start_date}</span>
                  )}
                </TableCell>

                <TableCell
                  className="px-4 sm:px-6 py-4 text-gray-300 text-sm"
                  onDoubleClick={() =>
                    canEdit && project.id
                      ? handleDoubleClick(
                          project.id,
                          "endDate",
                          project.end_date
                        )
                      : undefined
                  }
                  title={canEdit ? "Double-click to edit" : undefined}
                  role={canEdit ? "button" : undefined}
                  tabIndex={canEdit ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (
                      canEdit &&
                      project.id &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      handleDoubleClick(
                        project.id,
                        "endDate",
                        project.end_date
                      );
                    }
                  }}>
                  {editingCell?.projectId === project.id &&
                  editingCell?.field === "endDate" ? (
                    <div className="flex items-center gap-2">
                      <input
                        ref={inputRef}
                        type="date"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, project.id!)}
                        className="px-2 py-1 bg-gray-800 border border-blue-500 rounded text-white text-sm"
                        onBlur={() => handleSave(project.id!)}
                      />
                      <button
                        onClick={() => handleSave(project.id!)}
                        className="text-green-400 hover:text-green-300"
                        aria-label="Save">
                        <FiCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-400 hover:text-red-300"
                        aria-label="Cancel">
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span>{project?.end_date}</span>
                  )}
                </TableCell>

                <TableCell
                  className="px-4 sm:px-6 py-4 text-yellow-400 font-semibold"
                  onDoubleClick={() =>
                    canEdit && project.id
                      ? handleDoubleClick(project.id, "budget", project.budget)
                      : undefined
                  }
                  title={canEdit ? "Double-click to edit" : undefined}
                  role={canEdit ? "button" : undefined}
                  tabIndex={canEdit ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (
                      canEdit &&
                      project.id &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      handleDoubleClick(project.id, "budget", project.budget);
                    }
                  }}>
                  {editingCell?.projectId === project.id &&
                  editingCell?.field === "budget" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">$</span>
                      <input
                        ref={inputRef}
                        type="number"
                        min="0"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, project.id!)}
                        className="w-24 px-2 py-1 bg-gray-800 border border-blue-500 rounded text-white text-sm"
                        onBlur={() => handleSave(project.id!)}
                      />
                      <button
                        onClick={() => handleSave(project.id!)}
                        className="text-green-400 hover:text-green-300"
                        aria-label="Save">
                        <FiCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-400 hover:text-red-300"
                        aria-label="Cancel">
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span>${(project?.budget || 0).toLocaleString()}</span>
                  )}
                </TableCell>

                {user?.role === "admin" && project.id && (
                  <TableCell className="px-4 sm:px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <UpdateProjectButton projectId={project.id} />
                    </div>
                  </TableCell>
                )}

                {user?.role === "manager" && project.id && (
                  <TableCell className="px-4 sm:px-6 py-4">
                    <div className="flex justify-center gap-2 flex-wrap">
                      <UpdateProjectButton projectId={project.id} />
                      <RemoveProjectButton projectId={project.id} />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <nav
          className="flex flex-wrap justify-center items-center gap-2 p-4 sm:p-6 border-t border-gray-700/50 bg-gray-800/30"
          aria-label="Pagination">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Go to previous page">
            Previous
          </Button>

          {[...Array(totalPages)].map((_, idx) => (
            <Button
              key={idx}
              variant={currentPage === idx + 1 ? "default" : "outline"}
              className={
                currentPage === idx + 1
                  ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg"
                  : "border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
              }
              onClick={() => setCurrentPage(idx + 1)}
              aria-label={`Go to page ${idx + 1}`}
              aria-current={currentPage === idx + 1 ? "page" : undefined}>
              {idx + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            aria-label="Go to next page">
            Next
          </Button>
        </nav>
      )}
    </div>
  );
}
