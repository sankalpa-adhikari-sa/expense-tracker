import { createFileRoute } from "@tanstack/react-router";
import IncomeTable from "@/routes/-components/tables/incomeTable";

export const Route = createFileRoute("/_private/_income/income")({
  component: Income,
});

function Income() {
  return <IncomeTable />;
}
