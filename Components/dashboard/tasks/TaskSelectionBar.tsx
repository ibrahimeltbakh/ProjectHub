"use client";

interface TaskSelectionBarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  isAllSelected: boolean;
}

export default function TaskSelectionBar({
  selectedCount,
  totalCount,
  onSelectAll,
  isAllSelected,
}: TaskSelectionBarProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <button
        onClick={onSelectAll}
        className="text-gray-400 hover:text-white transition-colors"
        aria-label="Select all tasks">
        {isAllSelected ? (
          <svg
            className="w-5 h-5 text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>
      <span className="text-sm text-gray-400">
        {selectedCount > 0
          ? `${selectedCount} task(s) selected`
          : "Select tasks for bulk update"}
      </span>
    </div>
  );
}
