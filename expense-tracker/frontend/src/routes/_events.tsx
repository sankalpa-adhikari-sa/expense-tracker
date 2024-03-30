import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import AddEvents from "@/routes/-components/addEvents";
export const Route = createFileRoute("/_events")({
  component: EventsLayout,
});

function EventsLayout() {
  return (
    <main className="h-full w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="w-full font-bold">Events</h1>
        <AddEvents />
      </div>
      <Separator className="w-full" />
      <Outlet />
    </main>
  );
}
