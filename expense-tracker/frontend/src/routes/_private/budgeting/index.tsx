import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import EventsTable from "@/routes/-components/tables/eventsTable";
import { Button } from "@/components/ui/button";
import { HandCoinsIcon } from "lucide-react";

export const Route = createFileRoute("/_private/budgeting/")({
  component: Events,
});

function Events() {
  return (
    <main className="h-full w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="w-full font-bold">Budget</h1>
        <Button size="sm" className="gap-2">
          <HandCoinsIcon size={16} />
          Add
        </Button>
      </div>
      <Separator className="w-full" />
      <EventsTable />
    </main>
  );
}
