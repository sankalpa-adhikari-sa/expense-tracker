import { Outlet, createFileRoute } from "@tanstack/react-router";
import AddTransactionMethod from "./-components/addTransactionMethod";
import { Separator } from "@/components/ui/separator";
export const Route = createFileRoute("/_transaction_method")({
  component: TransactionMethodLayout,
});

function TransactionMethodLayout() {
  return (
    <main className="h-full w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="w-full font-bold">Transaction Method</h1>
        <AddTransactionMethod />
      </div>
      <Separator className="w-full" />
      <Outlet />
    </main>
  );
}
