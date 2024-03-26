"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { Income } from "@/types/type";
import { DataTableColumnHeader } from "@/components/custom/table/data-table-column-header";
import { useDeleteIncomeByID } from "@/hooks/useIncome";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PencilIcon, TrashIcon } from "lucide-react";
import IncomeForm from "./IncomeForm";
import { format } from "date-fns";
function TableRowActions({ id, data }: { id: any; data?: any }) {
  const deleteIncome = useDeleteIncomeByID();
  const handleDelete = (id: any) => {
    return deleteIncome.mutate(id);
  };
  return (
    <div className="flex flex-row gap-3">
      <Sheet>
        <SheetTrigger asChild>
          <PencilIcon className="cursor-pointer w-4 h-4" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Manage Income</SheetTitle>
          </SheetHeader>
          <IncomeForm data={data} />
        </SheetContent>
      </Sheet>

      <TrashIcon
        onClick={() => handleDelete(id)}
        className="cursor-pointer w-4 h-4 stroke-destructive"
      />
    </div>
  );
}
export const incomeColumns: ColumnDef<Income>[] = [
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
    id: "Title",
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("Title")}
          </span>
        </div>
      );
    },
  },
  {
    id: "Category",
    accessorKey: "expand.category.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] capitalize">{row.getValue("Category")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "Amount",
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("Amount")}
          </span>
        </div>
      );
    },
  },

  {
    id: "Transaction Method",
    accessorKey: "expand.transaction_method.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Method" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] capitalize">
        {row.getValue("Transaction Method")}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "Transaction Date",
    accessorKey: "transaction_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {format(
              new Date(row.getValue("Transaction Date")),
              "MMMM dd, yyyy"
            )}
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
            {row.getValue("Details")}
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
