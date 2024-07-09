"use client";

import { DataTable } from "@/components/custom/table/data-table";
import { format } from "date-fns";
import { transactionMethodBudgetColumns } from "./transactionMethodBudgetColumns";
import { useTransactionMethodBudget } from "@/hooks/useBudgetGranulityTransactionMethod";
function TransactionMethodBudgetTable() {
  const { data: TransactionMethodBudget = [] }: any =
    useTransactionMethodBudget();
  console.log(TransactionMethodBudget);
  const filename = `${format(new Date(), "yyMMdd")}_Transaction_Method_Budget`;

  return (
    <DataTable
      columns={transactionMethodBudgetColumns}
      data={TransactionMethodBudget}
      tableSearchColumn="Transaction Method"
      filename={filename}
      showFooter={true}
    />
  );
}

export default TransactionMethodBudgetTable;
