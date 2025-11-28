import React from "react";
import { Button } from "@/Components/ui/button";
import { MdOutlineEditNote } from "react-icons/md";
import Link from "next/link";

interface UpdateProjectButtonProps {
  projectId: string;
}

export default function UpdateProjectButton({
  projectId,
}: UpdateProjectButtonProps) {
  return (
    <Link href={`/dashboard/projects/${projectId}/update`}>
      <Button className="bg-transparent  cursor-pointer text-blue-600 hover:text-blue-400 hover:border hover:border-blue-600  hover:bg-transparent focus:outline-none">
        <MdOutlineEditNote />
      </Button>
    </Link>
  );
}
