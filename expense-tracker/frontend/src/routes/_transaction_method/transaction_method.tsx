import { createFileRoute } from "@tanstack/react-router";
import TransactionMethodTable from "../-components/transactionMethodTable";

export const Route = createFileRoute("/_transaction_method/transaction_method")(
  {
    component: TransactionMethod,
  }
);

function TransactionMethod() {
  return <TransactionMethodTable />;
}
