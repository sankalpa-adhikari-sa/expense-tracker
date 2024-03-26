"use client";
import { Table } from "@tanstack/react-table";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileSpreadsheetIcon } from "lucide-react";
interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  filename?: string;
}

export function DataTableExport<TData>({
  table,
  filename,
}: DataTableViewOptionsProps<TData>) {
  const handleExportasXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      table.getSelectedRowModel().flatRows.map((row) => row._valuesCache)
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.writeFile(workbook, `${filename}.xlsx`, {
      compression: true,
    });
  };
  const handleExportasCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      table.getSelectedRowModel().flatRows.map((row) => row._valuesCache)
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.utils.sheet_to_csv(worksheet, { forceQuotes: true });
    XLSX.writeFile(workbook, `${filename}.csv`, {
      compression: true,
    });
  };
  const handleExportasTXT = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      table.getSelectedRowModel().flatRows.map((row) => row._valuesCache)
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.utils.sheet_to_csv(worksheet, { forceQuotes: true });
    XLSX.writeFile(workbook, `${filename}.txt`, {
      compression: true,
    });
  };
  const handleExportasODS = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      table.getSelectedRowModel().flatRows.map((row) => row._valuesCache)
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.utils.sheet_to_csv(worksheet, { forceQuotes: true });
    XLSX.writeFile(workbook, `${filename}.ods`, {
      compression: true,
    });
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="ml-auto h-8 lg:flex">
            <FileSpreadsheetIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuLabel>Export as</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleExportasXLSX}>
            .xlsx
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportasCSV}>.csv</DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportasODS}>.ods</DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportasTXT}>.txt</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
