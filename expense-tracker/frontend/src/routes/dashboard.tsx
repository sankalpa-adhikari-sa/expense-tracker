import { createFileRoute, redirect } from "@tanstack/react-router";
import DataTableFiterOptions from "@/components/custom/table/data-table-date-filter";
import { date_range_atom } from "@/lib/atoms/atom";
import { Separator } from "@/components/ui/separator";
import pb from "@/_pocketbase/pocketbase";
import Analytics from "./-components/analytics";

export const Route = createFileRoute("/dashboard")({
  component: EventsLayout,
  beforeLoad: async ({ location }) => {
    if (!pb.authStore.isValid) {
      throw redirect({
        to: "/authentication",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function EventsLayout() {
  return (
    <main className="h-full flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="w-full font-bold">Summary</h1>
        <DataTableFiterOptions dateRangeAtom={date_range_atom} />
      </div>
      <Separator />
      <Analytics />
    </main>
  );
}
