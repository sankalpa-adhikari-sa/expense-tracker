import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import AddContacts from "@/routes/-components/create-update/addContacts";
export const Route = createFileRoute("/_private/_contacts")({
  component: ContactsLayout,
});

function ContactsLayout() {
  return (
    <main className="h-full w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="w-full font-bold">Contacts</h1>
        <AddContacts />
      </div>
      <Separator className="w-full" />
      <Outlet />
    </main>
  );
}
