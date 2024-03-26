import { createFileRoute } from "@tanstack/react-router";
import ExpenseTable from "../-components/expenseTable";

export const Route = createFileRoute("/_expense/expense")({
  component: Expense,
});

function Expense() {
  return <ExpenseTable />;
}
