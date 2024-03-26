import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_contacts/contacts")({
  component: Contacts,
});

function Contacts() {
  return <div>contacts</div>;
}
