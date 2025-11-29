import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { TaskType } from "@/types/general";
import toast from "react-hot-toast";

export const getProjectTasks = async (
  projectId: string
): Promise<TaskType[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("start_date", { ascending: true });

  if (error) throw new Error(error.message);
  return data as TaskType[];
};

export const addTaskToProject = async (
  projectId: string,
  task: Omit<TaskType, "id" | "project_id">
) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ ...task, project_id: projectId }])
    .single();

  if (error) throw new Error(error.message);
  return data as TaskType;
};

export const updateTaskStatus = async (
  taskId: string,
  status: TaskType["status"]
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId)
    .single();

  if (error) throw new Error(error.message);
  return data as TaskType;
};

export const updateTask = async (
  taskId: string,
  task: Partial<Omit<TaskType, "id" | "project_id">>
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(task)
    .eq("id", taskId)
    .single();

  if (error) throw new Error(error.message);
  return data as TaskType;
};

export const bulkUpdateTasks = async (
  taskIds: string[],
  updates: Partial<Omit<TaskType, "id" | "project_id">>
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .in("id", taskIds)
    .select();

  if (error) throw new Error(error.message);
  return data as TaskType[];
};

export const useProjectTasks = (projectId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<TaskType[], Error>({
    queryKey: ["projectTasks", projectId],
    queryFn: () => getProjectTasks(projectId),
    enabled: !!projectId,
  });

  useEffect(() => {
    if (!projectId) return;

    const channel = supabase
      .channel(`tasks:${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ["projectTasks", projectId],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, queryClient]);

  const addMutation = useMutation({
    mutationFn: ({ task }: { task: Omit<TaskType, "id" | "project_id"> }) =>
      addTaskToProject(projectId, task),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({
        queryKey: ["projectTasks", projectId],
      });

      const previousTasks = queryClient.getQueryData<TaskType[]>([
        "projectTasks",
        projectId,
      ]);

      const optimisticTask: TaskType = {
        id: `temp-${Date.now()}`,
        project_id: projectId,
        ...newTask.task,
      };

      queryClient.setQueryData<TaskType[]>(
        ["projectTasks", projectId],
        (old = []) => [...old, optimisticTask]
      );

      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["projectTasks", projectId],
          context.previousTasks
        );
      }
      toast.error("Failed to add task");
    },
    onSuccess: () => {
      toast.success("Task added successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectTasks", projectId],
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      taskId,
      status,
    }: {
      taskId: string;
      status: TaskType["status"];
    }) => updateTaskStatus(taskId, status),
    onMutate: async ({ taskId, status }) => {
      await queryClient.cancelQueries({
        queryKey: ["projectTasks", projectId],
      });

      const previousTasks = queryClient.getQueryData<TaskType[]>([
        "projectTasks",
        projectId,
      ]);

      queryClient.setQueryData<TaskType[]>(
        ["projectTasks", projectId],
        (old = []) =>
          old.map((task) => (task.id === taskId ? { ...task, status } : task))
      );

      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["projectTasks", projectId],
          context.previousTasks
        );
      }
      toast.error("Failed to update task status");
    },
    onSuccess: () => {
      toast.success("Task status updated");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectTasks", projectId],
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      task,
    }: {
      taskId: string;
      task: Partial<Omit<TaskType, "id" | "project_id">>;
    }) => updateTask(taskId, task),
    onMutate: async ({ taskId, task }) => {
      await queryClient.cancelQueries({
        queryKey: ["projectTasks", projectId],
      });

      const previousTasks = queryClient.getQueryData<TaskType[]>([
        "projectTasks",
        projectId,
      ]);

      queryClient.setQueryData<TaskType[]>(
        ["projectTasks", projectId],
        (old = []) => old.map((t) => (t.id === taskId ? { ...t, ...task } : t))
      );

      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["projectTasks", projectId],
          context.previousTasks
        );
      }
      toast.error("Failed to update task");
    },
    onSuccess: () => {
      toast.success("Task updated successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectTasks", projectId],
      });
    },
  });

  const bulkUpdateMutation = useMutation({
    mutationFn: ({
      taskIds,
      updates,
    }: {
      taskIds: string[];
      updates: Partial<Omit<TaskType, "id" | "project_id">>;
    }) => bulkUpdateTasks(taskIds, updates),
    onMutate: async ({ taskIds, updates }) => {
      await queryClient.cancelQueries({
        queryKey: ["projectTasks", projectId],
      });

      const previousTasks = queryClient.getQueryData<TaskType[]>([
        "projectTasks",
        projectId,
      ]);

      queryClient.setQueryData<TaskType[]>(
        ["projectTasks", projectId],
        (old = []) =>
          old.map((task) =>
            taskIds.includes(task.id) ? { ...task, ...updates } : task
          )
      );

      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["projectTasks", projectId],
          context.previousTasks
        );
      }
      toast.error("Failed to bulk update tasks");
    },
    onSuccess: (_, variables) => {
      toast.success(`${variables.taskIds.length} task(s) updated successfully`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectTasks", projectId],
      });
    },
  });

  return {
    ...query,
    addTask: addMutation.mutateAsync,
    updateTaskStatus: updateStatusMutation.mutateAsync,
    updateTask: updateTaskMutation.mutateAsync,
    bulkUpdateTasks: bulkUpdateMutation.mutateAsync,
  };
};
