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
import { Category } from "@/types/type";
import { DataTableColumnHeader } from "@/components/custom/table/data-table-column-header";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useDeleteCategoryByID } from "@/hooks/useCategory";
import CategoryForm from "../forms/CategoryForm";

function TableRowActions({ id, data }: { id: any; data?: any }) {
  const deleteCategory = useDeleteCategoryByID();
  const handleDelete = (id: any) => {
    return deleteCategory.mutate(id);
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
          <CategoryForm data={data} />
        </SheetContent>
      </Sheet>

      <TrashIcon
        onClick={() => handleDelete(id)}
        className="cursor-pointer w-4 h-4 stroke-destructive"
      />
    </div>
  );
}

export const categoryColumns: ColumnDef<Category>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("Category")}
          </span>
        </div>
      );
    },
  },
  {
    id: "Details",
    accessorKey: "details",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate text-sm font-normal">
            {row.getValue("Details") ? (
              row.getValue("Details")
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
      return <TableRowActions data={row.original} id={row.original.id} />;
    },
  },
];
