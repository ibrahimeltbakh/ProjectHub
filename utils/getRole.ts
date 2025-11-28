export function getRoleFromEmail(email: string) {
  const normalized = email.toLowerCase().trim();

  if (normalized === "admin@gmail.com") return "admin";
  if (normalized === "manager@gmail.com") return "manager";

  return "developer";
}
