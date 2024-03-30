import { createFileRoute } from "@tanstack/react-router";
import ExpenseTable from "@/routes/-components/tables/expenseTable";

export const Route = createFileRoute("/_private/_expense/expense")({
  component: Expense,
});

function Expense() {
  return <ExpenseTable />;
}
