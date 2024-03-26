import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import AddExpense from "./-components/addExpense";
export const Route = createFileRoute("/_expense")({
  component: ExpenseLayout,
});

function ExpenseLayout() {
  return (
    <main className="h-full w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="w-full font-bold">Expense</h1>
        <AddExpense />
      </div>
      <Separator className="w-full" />
      <Outlet />
    </main>
  );
}
