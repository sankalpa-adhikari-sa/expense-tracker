import { createFileRoute } from "@tanstack/react-router";
import EventsTable from "../-components/eventsTable";

export const Route = createFileRoute("/_events/events")({
  component: Events,
});

function Events() {
  return <EventsTable />;
}
