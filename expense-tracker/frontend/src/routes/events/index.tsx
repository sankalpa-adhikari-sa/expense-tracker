import { createFileRoute } from "@tanstack/react-router";
import EventsTable from "@/routes/-components/eventsTable";
import { Separator } from "@/components/ui/separator";
import AddEvents from "../-components/addEvents";

export const Route = createFileRoute("/events/")({
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
