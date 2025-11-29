import * as yup from "yup";

export const projectSchema = yup.object({
  name: yup
    .string()
    .required("Project name is required")
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must not exceed 100 characters"),
  status: yup
    .string()
    .oneOf(["In Progress", "Completed", "Pending "], "Invalid status")
    .required("Status is required"),
  progress: yup
    .number()
    .required("Progress is required")
    .min(0, "Progress must be at least 0")
    .max(100, "Progress must not exceed 100")
    .integer("Progress must be a whole number"),
  budget: yup
    .number()
    .required("Budget is required")
    .min(0, "Budget must be at least 0")
    .integer("Budget must be a whole number"),
  start_date: yup
    .string()
    .required("Start date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  end_date: yup
    .string()
    .required("End date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { start_date } = this.parent;
        if (!start_date || !value) return true;
        return new Date(value) >= new Date(start_date);
      }
    ),
});

export const taskSchema = yup.object({
  title: yup
    .string()
    .required("Task title is required")
    .min(3, "Task title must be at least 3 characters")
    .max(200, "Task title must not exceed 200 characters"),
  description: yup
    .string()
    .max(1000, "Description must not exceed 1000 characters"),
  status: yup
    .string()
    .oneOf(["Todo", "In Progress", "Done"], "Invalid status")
    .required("Status is required"),
  priority: yup
    .string()
    .oneOf(["Low", "Medium", "High"], "Invalid priority")
    .required("Priority is required"),
  assigned_to: yup
    .string()
    .max(100, "Assigned to must not exceed 100 characters"),
  start_date: yup
    .string()
    .required("Start date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  end_date: yup
    .string()
    .required("End date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { start_date } = this.parent;
        if (!start_date || !value) return true;
        return new Date(value) >= new Date(start_date);
      }
    ),
});

export type ProjectFormData = yup.InferType<typeof projectSchema>;
export type TaskFormData = yup.InferType<typeof taskSchema>;
