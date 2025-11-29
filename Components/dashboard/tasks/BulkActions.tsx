"use client";

import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

interface BulkActionsProps {
  selectedCount: number;
  bulkAction: {
    type: "status" | "priority" | null;
    value: string;
  };
  onActionTypeChange: (type: "status" | "priority" | null) => void;
  onActionValueChange: (value: string) => void;
  onUpdate: () => void;
  onCancel: () => void;
}

export default function BulkActions({
  selectedCount,
  bulkAction,
  onActionTypeChange,
  onActionValueChange,
  onUpdate,
  onCancel,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700"
      role="toolbar"
      aria-label="Bulk actions toolbar">
      <Select
        value={bulkAction.type || ""}
        onValueChange={(value) =>
          onActionTypeChange(value as "status" | "priority")
        }>
        <SelectTrigger
          className="w-[120px] border-gray-700 bg-gray-800/50 text-white"
          aria-label="Select bulk action type">
          <SelectValue placeholder="Bulk Action" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-gray-800 text-white">
            <SelectItem value="status">Change Status</SelectItem>
            <SelectItem value="priority">Change Priority</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {bulkAction.type === "status" && (
        <Select value={bulkAction.value} onValueChange={onActionValueChange}>
          <SelectTrigger className="w-[140px] border-gray-700 bg-gray-800/50 text-white">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="bg-gray-800 text-white">
              <SelectItem value="Todo">Todo</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {bulkAction.type === "priority" && (
        <Select value={bulkAction.value} onValueChange={onActionValueChange}>
          <SelectTrigger className="w-[140px] border-gray-700 bg-gray-800/50 text-white">
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="bg-gray-800 text-white">
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {bulkAction.type && bulkAction.value && (
        <Button
          onClick={onUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          aria-label={`Update ${selectedCount} selected tasks`}>
          Update {selectedCount} Task(s)
        </Button>
      )}

      <Button
        onClick={onCancel}
        variant="outline"
        className="border-gray-700 text-gray-300 hover:bg-gray-700"
        aria-label="Cancel bulk action">
        Cancel
      </Button>
    </div>
  );
}
