"use client";
import { useTransactionMethod } from "@/hooks/useTransactionMethod";
import { DataTable } from "@/components/custom/table/data-table";
import { format } from "date-fns";
import { transactionMethodColumns } from "./transactionMethodColumns";

function TransactionMethodTable() {
  const { data: TransactionMethodData = [] }: any = useTransactionMethod();

  const filename = `${format(new Date(), "yyMMdd")}_TransactionMethod`;

  return (
    <DataTable
      columns={transactionMethodColumns}
      data={TransactionMethodData}
      tableSearchColumn="Method"
      filename={filename}
    />
  );
}

export default TransactionMethodTable;
