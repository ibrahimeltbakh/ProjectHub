"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { ProjectType } from "@/types/general";
import { exportToPDF, exportToExcel } from "./pdfAndExcelFunctions";

interface ActionsProps {
  projects: ProjectType[];
  filteredProjects: ProjectType[];
  setFilteredProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
}

type FilterOption =
  | "all"
  | "completed"
  | "inProgress"
  | "pending"
  | "upcoming"
  | "overdue";

type SortOption =
  | "nameAsc"
  | "nameDesc"
  | "startDateNew"
  | "startDateOld"
  | "endDateClose"
  | "endDateFar";

type ExportOption = "pdf" | "excel";

export default function Actions({
  projects,
  filteredProjects,
  setFilteredProjects,
}: ActionsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const applySearch = (list: ProjectType[]) => {
    if (!searchTerm.trim()) return list;

    return list.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  const handleFilter = (value: FilterOption) => {
    let filtered = [...projects];

    switch (value) {
      case "completed":
        filtered = projects.filter((p) => p.status === "Completed");
        break;

      case "inProgress":
        filtered = projects.filter((p) => p.status === "In Progress");
        break;

      case "pending":
        filtered = projects.filter((p) => p.status === "Pending ");
        break;

      case "upcoming":
        filtered = projects.filter((p) => p.start_date > today);
        break;

      case "overdue":
        filtered = projects.filter((p) => p.end_date < today);
        break;

      case "all":
      default:
        filtered = projects;
        break;
    }

    setFilteredProjects(applySearch(filtered));
  };

  const handleSort = (value: SortOption) => {
    const sorted = [...filteredProjects];

    switch (value) {
      case "nameAsc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "nameDesc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "startDateNew":
        sorted.sort(
          (a, b) =>
            new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );
        break;

      case "startDateOld":
        sorted.sort(
          (a, b) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
        break;

      case "endDateClose":
        sorted.sort(
          (a, b) =>
            new Date(a.end_date).getTime() - new Date(b.end_date).getTime()
        );
        break;

      case "endDateFar":
        sorted.sort(
          (a, b) =>
            new Date(b.end_date).getTime() - new Date(a.end_date).getTime()
        );
        break;

      default:
        break;
    }

    setFilteredProjects(sorted);
  };

  const handleExport = (value: ExportOption) => {
    if (value === "pdf") exportToPDF(filteredProjects);
    if (value === "excel") exportToExcel(filteredProjects);
  };

  return (
    <div className="w-full">
      <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 shadow-lg mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="flex-1 min-w-0">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setFilteredProjects(applySearch(projects));
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Select
              onValueChange={(value: FilterOption) => handleFilter(value)}>
              <SelectTrigger className="w-full sm:w-[180px] border-gray-700 bg-gray-800/50 text-white hover:border-blue-500 transition-colors">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-800 text-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={(value: SortOption) => handleSort(value)}>
              <SelectTrigger className="w-full sm:w-[180px] border-gray-700 bg-gray-800/50 text-white hover:border-blue-500 transition-colors">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-800 text-white">
                  <SelectItem value="nameAsc">Name (A → Z)</SelectItem>
                  <SelectItem value="nameDesc">Name (Z → A)</SelectItem>
                  <SelectItem value="startDateNew">
                    Newest Start Date
                  </SelectItem>
                  <SelectItem value="startDateOld">
                    Oldest Start Date
                  </SelectItem>
                  <SelectItem value="endDateClose">Closest End Date</SelectItem>
                  <SelectItem value="endDateFar">Farthest End Date</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value: ExportOption) => handleExport(value)}>
              <SelectTrigger className="w-full sm:w-[180px] border-gray-700 bg-gray-800/50 text-white hover:border-blue-500 transition-colors">
                <SelectValue placeholder="Export as" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-gray-800 text-white">
                  <SelectItem value="pdf">Export PDF</SelectItem>
                  <SelectItem value="excel">Export Excel</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
