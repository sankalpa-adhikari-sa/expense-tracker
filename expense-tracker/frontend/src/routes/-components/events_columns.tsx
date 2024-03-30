"use client";
import { parseISO } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Events } from "@/types/type";
import { DataTableColumnHeader } from "@/components/custom/table/data-table-column-header";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useDeleteEventsByID } from "@/hooks/useEvents";
import EventsForm from "./EventsForm";
import { format } from "date-fns";
import { useNavigate } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";

function TableRowActions({ id, data }: { id: any; data?: any }) {
  const deleteEvents = useDeleteEventsByID();
  const handleDelete = (id: any) => {
    return deleteEvents.mutate(id);
  };
  const navigate = useNavigate({ from: "/events" });
  return (
    <div className="flex flex-row gap-4">
      <Separator orientation="vertical" className="h-4" />
      <ExternalLinkIcon
        className="cursor-pointer w-4 h-4"
        onClick={() =>
          navigate({
            to: "/events/$eventsId",
            params: { eventsId: id },
          })
        }
      />
      <Sheet>
        <SheetTrigger asChild>
          <PencilIcon className="cursor-pointer w-4 h-4" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Manage Events Methods</SheetTitle>
          </SheetHeader>
          <EventsForm data={data} />
        </SheetContent>
      </Sheet>

      <Separator orientation="vertical" className="h-4" />
      <TrashIcon
        onClick={() => handleDelete(id)}
        className="cursor-pointer w-4 h-4 stroke-destructive"
      />
    </div>
  );
}

export const eventsColumns: ColumnDef<Events>[] = [
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
    id: "Event Name",
    accessorKey: "event_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("Event Name")}
          </span>
        </div>
      );
    },
  },
  {
    id: "Start Date",
    accessorKey: "event_start_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => {
      const start_date = parseISO(row.getValue("End Date"));
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {format(start_date, "MMMM dd, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    id: "End Date",
    accessorKey: "event_end_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => {
      const end_date = parseISO(row.getValue("End Date"));

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {/* need to change this date to local time frm UTc */}

            {format(end_date, "MMMM dd, yyyy")}
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
          <span className="max-w-[500px] truncate font-medium capitalize">
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
