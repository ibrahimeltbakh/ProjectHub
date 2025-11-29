"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useProject } from "@/lib/supabase/useProject";
import SkeletonLoader from "@/Components/Loading/SkeletonLoader";
import Error from "@/Components/Error/Error";
import { useProjectTasks } from "@/lib/supabase/useProjectTasks";
import { getUser } from "@/lib/features/auth/authSlice";
import { Button } from "@/Components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { TaskType } from "@/types/general";

import TaskCard from "@/Components/dashboard/tasks/TaskCard";
import TaskForm from "@/Components/dashboard/tasks/TaskForm";
import TaskFilters from "@/Components/dashboard/tasks/TaskFilters";
import BulkActions from "@/Components/dashboard/tasks/BulkActions";
import TaskSelectionBar from "@/Components/dashboard/tasks/TaskSelectionBar";

export default function ProjectPage() {
  const { projectId } = useParams();
  const id = Array.isArray(projectId) ? projectId[0] : projectId || "";
  const { data: project, isLoading, isError } = useProject(id);
  const {
    data: tasks,
    isLoading: tasksLoading,
    addTask,
    updateTaskStatus,
    updateTask,
    bulkUpdateTasks,
  } = useProjectTasks(id);
  const user = getUser();

  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<{
    type: "status" | "priority" | null;
    value: string;
  }>({ type: null, value: "" });

  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterAssigned, setFilterAssigned] = useState<string>("all");

  if (isLoading || tasksLoading) return <SkeletonLoader />;
  if (isError || !project) return <Error error="Failed to load project" />;

  // Get unique assigned users for filter
  const assignedUsers = Array.from(
    new Set(tasks?.map((t) => t.assigned_to).filter(Boolean) || [])
  ) as string[];

  // Filter tasks
  const filteredTasks = tasks?.filter((task) => {
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;
    const matchesAssigned =
      filterAssigned === "all" || task.assigned_to === filterAssigned;
    return matchesPriority && matchesAssigned;
  });

  const handleAddTask = async (data: {
    title: string;
    description?: string;
    status: "Todo" | "In Progress" | "Done";
    priority: "Low" | "Medium" | "High";
    assigned_to?: string;
    start_date: string;
    end_date: string;
  }) => {
    await addTask({ task: data });
  };

  const handleEditTask = (task: TaskType) => {
    setEditingTask({ ...task });
  };

  const handleSaveEdit = async () => {
    if (!editingTask) return;
    await updateTask({
      taskId: editingTask.id,
      task: {
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        priority: editingTask.priority,
        assigned_to: editingTask.assigned_to,
        start_date: editingTask.start_date,
        end_date: editingTask.end_date,
      },
    });
    setEditingTask(null);
  };

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedTasks.size === filteredTasks?.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(filteredTasks?.map((t) => t.id) || []));
    }
  };

  const handleBulkUpdate = async () => {
    if (selectedTasks.size === 0 || !bulkAction.type) return;

    const updates: Partial<TaskType> = {};
    if (bulkAction.type === "status") {
      updates.status = bulkAction.value as TaskType["status"];
    } else if (bulkAction.type === "priority") {
      updates.priority = bulkAction.value as TaskType["priority"];
    }

    await bulkUpdateTasks({
      taskIds: Array.from(selectedTasks),
      updates,
    });

    setSelectedTasks(new Set());
    setBulkAction({ type: null, value: "" });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          {project.name}
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Project Details & Tasks
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
          <h2 className="font-semibold text-lg text-gray-300 mb-2">Status</h2>
          <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
              project.status === "Completed"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : project.status === "In Progress"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            }`}>
            {project.status}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
          <h2 className="font-semibold text-lg text-gray-300 mb-3">Progress</h2>
          <div className="w-full bg-gray-700/50 rounded-full h-3 mb-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-linear-to-r from-blue-500 to-cyan-500 h-3 rounded-full shadow-lg"
            />
          </div>
          <p className="text-sm text-gray-400">{project.progress}% completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
          <h2 className="font-semibold text-lg text-gray-300 mb-2">Budget</h2>
          <p className="text-2xl font-bold text-yellow-400">
            ${project.budget.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
          <h2 className="font-semibold text-lg text-gray-300 mb-2">
            Start Date
          </h2>
          <p className="text-white">{project.start_date}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
          <h2 className="font-semibold text-lg text-gray-300 mb-2">End Date</h2>
          <p className="text-white">{project.end_date}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <span className="w-1 h-8 bg-linear-to-b from-blue-400 to-cyan-400 rounded"></span>
            Tasks
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            {user?.role === "admin" && selectedTasks.size > 0 && (
              <BulkActions
                selectedCount={selectedTasks.size}
                bulkAction={bulkAction}
                onActionTypeChange={(type) =>
                  setBulkAction({ type, value: "" })
                }
                onActionValueChange={(value) =>
                  setBulkAction({ ...bulkAction, value })
                }
                onUpdate={handleBulkUpdate}
                onCancel={() => {
                  setSelectedTasks(new Set());
                  setBulkAction({ type: null, value: "" });
                }}
              />
            )}
            <TaskFilters
              filterPriority={filterPriority}
              filterAssigned={filterAssigned}
              assignedUsers={assignedUsers}
              onPriorityChange={setFilterPriority}
              onAssignedChange={setFilterAssigned}
            />
          </div>
        </div>
        {user?.role === "admin" &&
          filteredTasks &&
          filteredTasks.length > 0 && (
            <TaskSelectionBar
              selectedCount={selectedTasks.size}
              totalCount={filteredTasks.length}
              onSelectAll={toggleSelectAll}
              isAllSelected={selectedTasks.size === filteredTasks.length}
            />
          )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks?.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              user={user}
              isSelected={selectedTasks.has(task.id)}
              onSelect={toggleTaskSelection}
              onEdit={handleEditTask}
              onStatusUpdate={(taskId, status) =>
                updateTaskStatus({ taskId, status })
              }
            />
          ))}
        </div>
      </motion.div>

      {user?.role === "admin" && <TaskForm onSubmit={handleAddTask} />}

      <AnimatePresence>
        {editingTask && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setEditingTask(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3
                    className="text-2xl font-bold text-white"
                    id="edit-task-title">
                    Edit Task
                  </h3>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Close edit task modal">
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                <form
                  id="edit-task-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveEdit();
                  }}
                  aria-labelledby="edit-task-title">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="edit-task-title-input"
                        className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        id="edit-task-title-input"
                        type="text"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        value={editingTask.title}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            title: e.target.value,
                          })
                        }
                        required
                        minLength={3}
                        maxLength={200}
                        aria-label="Task title"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="edit-task-description-input"
                        className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        id="edit-task-description-input"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        rows={3}
                        value={editingTask.description || ""}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            description: e.target.value,
                          })
                        }
                        maxLength={1000}
                        aria-label="Task description"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-task-status-select"
                        className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        id="edit-task-status-select"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        value={editingTask.status}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            status: e.target.value as TaskType["status"],
                          })
                        }
                        aria-label="Task status">
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="edit-task-priority-select"
                        className="block text-sm font-medium text-gray-300 mb-2">
                        Priority
                      </label>
                      <select
                        id="edit-task-priority-select"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        value={editingTask.priority}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            priority: e.target.value as TaskType["priority"],
                          })
                        }
                        aria-label="Task priority">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="edit-task-assigned-input"
                        className="block text-sm font-medium text-gray-300 mb-2">
                        Assigned To
                      </label>
                      <input
                        id="edit-task-assigned-input"
                        type="text"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        value={editingTask.assigned_to || ""}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            assigned_to: e.target.value,
                          })
                        }
                        maxLength={100}
                        aria-label="Assigned to"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-task-start-date-input"
                        className="block text-sm font-medium text-gray-300 mb-2">
                        Start Date
                      </label>
                      <input
                        id="edit-task-start-date-input"
                        type="date"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        value={editingTask.start_date}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            start_date: e.target.value,
                          })
                        }
                        required
                        aria-label="Start date"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="edit-task-end-date-input"
                        className="block text-sm font-medium text-gray-300 mb-2">
                        End Date
                      </label>
                      <input
                        id="edit-task-end-date-input"
                        type="date"
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        value={editingTask.end_date}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            end_date: e.target.value,
                          })
                        }
                        required
                        aria-label="End date"
                      />
                    </div>
                  </div>
                </form>

                <div className="flex gap-4 mt-6">
                  <Button
                    type="button"
                    onClick={() => setEditingTask(null)}
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                    aria-label="Cancel editing task">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="edit-task-form"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSaveEdit();
                    }}
                    className="flex-1 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
                    aria-label="Save task changes">
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
