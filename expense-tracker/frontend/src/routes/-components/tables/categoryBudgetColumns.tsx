"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BudgetGranulityCategory } from "@/types/type";
import { DataTableColumnHeader } from "@/components/custom/table/data-table-column-header";
import { PencilIcon, TrashIcon } from "lucide-react";

import { useDeleteCategoryBudgetByID } from "@/hooks/useBudgetGranulityCategory";
import BudgetGranulityCategoryForm from "../forms/BudgetGranulityCategoryForm";
import { Currencyformatter } from "@/lib/currencyFormatter";

function TableRowActions({ id, data }: { id: any; data?: any }) {
  const deleteCategoryBudget = useDeleteCategoryBudgetByID();
  const handleDelete = (id: any) => {
    return deleteCategoryBudget.mutate(id);
  };
  return (
    <div className="flex flex-row gap-3">
      <Sheet>
        <SheetTrigger asChild>
          <PencilIcon className="cursor-pointer w-4 h-4" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Manage Category</SheetTitle>
          </SheetHeader>
          <BudgetGranulityCategoryForm data={data} />
        </SheetContent>
      </Sheet>

      <TrashIcon
        onClick={() => handleDelete(id)}
        className="cursor-pointer w-4 h-4 stroke-destructive"
      />
    </div>
  );
}

export const categoryBudgetColumns: ColumnDef<BudgetGranulityCategory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "Category",
    accessorKey: "expand.category.name",
    footer: "Total Category Budget",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[80px] capitalize">{row.getValue("Category")}</div>
      );
    },
  },

  {
    id: "Category Budget",
    accessorKey: "category_budget",
    footer: (props) => {
      const totalBudget = props.table
        .getRowModel()
        .rows.reduce((sum, row) => sum + row.original.category_budget, 0);
      return (
        <div className="text-base font-bold">
          {Currencyformatter.format(totalBudget)}
        </div>
      );
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Budget" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {Currencyformatter.format(row.getValue("Category Budget"))}
          </span>
        </div>
      );
    },
  },
  {
    id: "Overflow Message",
    accessorKey: "overflow_message",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Overflow Message" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate text-sm font-normal">
            {row.getValue("Overflow Message") ? (
              row.getValue("Overflow Message")
            ) : (
              <span className="text-muted-foreground">N/A</span>
            )}
          </span>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div>
          <TableRowActions data={row.original} id={row.original.id} />
        </div>
      );
    },
  },
];
