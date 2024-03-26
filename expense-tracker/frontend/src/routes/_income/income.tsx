import { createFileRoute } from "@tanstack/react-router";
import IncomeTable from "../-components/incomeTable";

export const Route = createFileRoute("/_income/income")(
  {
    component: Income,
  }
);

function Income() {
  return <IncomeTable />;
}
