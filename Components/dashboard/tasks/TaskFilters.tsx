"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

interface TaskFiltersProps {
  filterPriority: string;
  filterAssigned: string;
  assignedUsers: string[];
  onPriorityChange: (value: string) => void;
  onAssignedChange: (value: string) => void;
}

export default function TaskFilters({
  filterPriority,
  filterAssigned,
  assignedUsers,
  onPriorityChange,
  onAssignedChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Select
        value={filterPriority}
        onValueChange={onPriorityChange}
        aria-label="Filter tasks by priority">
        <SelectTrigger className="w-[150px] border-gray-700 bg-gray-800/50 text-white">
          <SelectValue placeholder="Filter by Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-gray-800 text-white">
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={filterAssigned}
        onValueChange={onAssignedChange}
        aria-label="Filter tasks by assigned user">
        <SelectTrigger className="w-[150px] border-gray-700 bg-gray-800/50 text-white">
          <SelectValue placeholder="Filter by User" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-gray-800 text-white">
            <SelectItem value="all">All Users</SelectItem>
            {assignedUsers.map((userName) => (
              <SelectItem key={userName} value={userName || ""}>
                {userName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
