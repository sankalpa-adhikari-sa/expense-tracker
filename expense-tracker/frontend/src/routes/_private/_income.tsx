import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import AddIncome from "@/routes/-components/create-update/addIncome";
export const Route = createFileRoute("/_private/_income")({
  component: IncomeLayout,
});

function IncomeLayout() {
  return (
    <main className="h-full w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="w-full font-bold">Income</h1>
        <AddIncome />
      </div>
      <Separator className="w-full" />
      <Outlet />
    </main>
  );
}
