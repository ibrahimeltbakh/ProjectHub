"use client";

import React, { useState, ReactNode } from "react";

interface SidebarGroupProps {
  title: ReactNode;
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  title,
  children,
  isActive,
  onClick,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    if (onClick) onClick();
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleClick}
        className={`w-full border text-left font-bold text-sm mb-2 px-3 py-1 rounded 
        ${
          isActive
            ? "bg-gradient-to-l from-blue-300 to-blue-500 text-white"
            : "hover:bg-gradient-to-l hover:from-blue-300 hover:to-blue-500 "
        }`}>
        {title}
      </button>
      {open && (
        <div className="ml-4 space-y-1 text-xl text-gray-500 font-bold">
          {children}
        </div>
      )}
    </div>
  );
};
