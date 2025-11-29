"use client";

import * as XLSX from "xlsx";
import pdfMake from "@/lib/pdfMakeSetup";
import { ProjectType } from "@/types/general";

export const exportToPDF = (projects: ProjectType[]): void => {
  const tableBody = [
    ["Name", "Status", "Start Date", "End Date", "Budget"],
    ...projects.map((p) => [
      p.name || "N/A",
      p.status || "N/A",
      p.start_date || "N/A",
      p.end_date || "N/A",
      p.budget?.toString() || "0",
    ]),
  ];

  const docDefinition = {
    content: [
      { text: "Projects Report", style: "header" },
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto", "auto", "auto"],
          body: tableBody,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
  };

  pdfMake.createPdf(docDefinition).download("projects.pdf");
};

export const exportToExcel = (projects: ProjectType[]): void => {
  const worksheet = XLSX.utils.json_to_sheet(projects);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
  XLSX.writeFile(workbook, "projects.xlsx");
};
