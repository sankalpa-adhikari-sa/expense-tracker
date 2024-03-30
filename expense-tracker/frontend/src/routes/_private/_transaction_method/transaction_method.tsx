import { createFileRoute } from "@tanstack/react-router";
import TransactionMethodTable from "@/routes/-components/tables/transactionMethodTable";

export const Route = createFileRoute(
  "/_private/_transaction_method/transaction_method"
)({
  component: TransactionMethod,
});

function TransactionMethod() {
  return <TransactionMethodTable />;
}
