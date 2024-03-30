"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { Expense } from "@/types/type";
import { DataTableColumnHeader } from "@/components/custom/table/data-table-column-header";
import { useDeleteExpenseByID } from "@/hooks/useExpense";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PencilIcon, TrashIcon } from "lucide-react";
import ExpenseForm from "./ExpenseForm";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
function TableRowActions({ id, data }: { id: any; data?: any }) {
  const deleteExpense = useDeleteExpenseByID();
  const handleDelete = (id: any) => {
    return deleteExpense.mutate(id);
  };
  return (
    <div className="flex flex-row gap-3">
      <Sheet>
        <SheetTrigger asChild>
          <PencilIcon className="cursor-pointer w-4 h-4" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Manage Expense</SheetTitle>
          </SheetHeader>
          <ExpenseForm data={data} />
        </SheetContent>
      </Sheet>

      <TrashIcon
        onClick={() => handleDelete(id)}
        className="cursor-pointer w-4 h-4 stroke-destructive"
      />
    </div>
  );
}
export const expenseColumns: ColumnDef<Expense>[] = [
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
          <span className="max-w-[500px] truncate font-medium flex gap-3">
            {row.original.expand.events ? (
              <Badge variant="outline" className="rounded-md">
                {row.original.expand.events.event_name}
              </Badge>
            ) : null}
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
