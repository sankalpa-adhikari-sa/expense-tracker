"use client";
import { useEvents } from "@/hooks/useEvents";
import { DataTable } from "@/components/custom/table/data-table";
import { format } from "date-fns";
import { eventsColumns } from "./events_columns";

function EventsTable() {
  const { data: EventsData = [] }: any = useEvents();

  const filename = `${format(new Date(), "yyMMdd")}_Events`;

  return (
    <DataTable
      columns={eventsColumns}
      data={EventsData}
      tableSearchColumn="Event Name"
      filename={filename}
    />
  );
}

export default EventsTable;
