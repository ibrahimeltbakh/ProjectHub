import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportToPDF, exportToExcel } from "./pdfAndExcelFunctions";

export default function Actions({
  products,
  setFilteredProducts,
  filteredProducts,
}) {
  const handelFilteredProducts = (v) => {
    if (v === "all") {
      setFilteredProducts(products);
    } else if (v === "topSold") {
      setFilteredProducts([...products].sort((a, b) => b.sold - a.sold));
    } else if (v === "lowStock") {
      setFilteredProducts([...products].sort((a, b) => a.stock - b.stock));
    } else if (v === "highPrice") {
      setFilteredProducts([...products].sort((a, b) => b.price - a.price));
    } else if (v === "lowPrice") {
      setFilteredProducts([...products].sort((a, b) => a.price - b.price));
    }
  };

  const handelExportProducts = (v) => {
    if (v === "pdf") {
      exportToPDF(filteredProducts);
    } else if (v === "excel") {
      exportToExcel(filteredProducts);
    }
  };

  return (
    <div className="w-full  flex flex-col md:flex-row justify-between flex-wrap items-center my-2 gap-3">
      <Select onValueChange={(value) => handelExportProducts(value)}>
        <SelectTrigger className="w-[180px] border-blue-400 focus:ring-blue-400">
          <SelectValue placeholder="Export as" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-gradient-to-r from-gray-700 to-gray-800 text-center">
            <SelectItem value="pdf">Export As PDF</SelectItem>
            <SelectItem value="excel">Export As Excel</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => handelFilteredProducts(value)}>
        <SelectTrigger className="w-[180px] border-blue-400 focus:ring-blue-400">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-gradient-to-r from-gray-700 to-gray-800 text-center">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="topSold">Top Sold</SelectItem>
            <SelectItem value="lowPrice">Low Price</SelectItem>
            <SelectItem value="highPrice">High Price</SelectItem>
            <SelectItem value="lowStock">Low Stock</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
