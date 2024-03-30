import { createFileRoute } from "@tanstack/react-router";

import AddEvents from "../../-components/create-update/addEvents";
import { Separator } from "@/components/ui/separator";
import EventsTable from "@/routes/-components/tables/eventsTable";

export const Route = createFileRoute("/_private/events/")({
  component: Events,
});

function Events() {
  return (
    <main className="h-full w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="w-full font-bold">Events</h1>
        <AddEvents />
      </div>
      <Separator className="w-full" />
      <EventsTable />
    </main>
  );
}
