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
import EventsForm from "../forms/EventsForm";
import { format } from "date-fns";
import { useNavigate } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Currencyformatter } from "@/lib/currencyFormatter";
// const Currencyformatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
//   minimumFractionDigits: 0,
// });

function TableRowActions({ id, data }: { id: any; data?: any }) {
  const deleteEvents = useDeleteEventsByID();
  const handleDelete = (id: any) => {
    return deleteEvents.mutate(id);
  };
  const navigate = useNavigate({ from: "/events" });
  return (
    <div className="flex flex-row gap-4">
      <Separator orientation="vertical" className="h-4" />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <ExternalLinkIcon
              className="cursor-pointer w-4 h-4"
              onClick={() =>
                navigate({
                  to: "/events/$eventsId/dashboard",
                  params: { eventsId: id },
                })
              }
            />
          </TooltipTrigger>
          <TooltipContent side="top" className="flex items-center gap-4">
            <p>Open Events</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
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
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="flex items-center gap-4">
            <p>Edit Events</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" className="h-4" />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <TrashIcon
              onClick={() => handleDelete(id)}
              className="cursor-pointer w-4 h-4 stroke-destructive"
            />
          </TooltipTrigger>
          <TooltipContent side="top" className="flex items-center gap-4">
            <p>Delete Events</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
      const start_date = parseISO(row.getValue("Start Date"));
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
    id: "Event Budget",
    accessorKey: "event_budget",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event Budget" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {row.getValue("Event Budget") ? (
            <span className="max-w-[500px] truncate font-medium">
              {Currencyformatter.format(row.getValue("Event Budget"))}
            </span>
          ) : (
            <span className="text-muted-foreground">N/A</span>
          )}
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
