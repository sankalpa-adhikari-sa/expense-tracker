"use client";
import { useTransactionMethod } from "@/hooks/useTransactionMethod";
import { Category, TransactionMethod } from "@/types/type";
import { useCategory } from "@/hooks/useCategory";
import { useExpense } from "@/hooks/useExpense";
import { DataTable } from "@/components/custom/table/data-table";
import { expenseColumns } from "./expense_columns";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { dr_expense_atom } from "@/lib/atoms/atom";
import { dateFilterOptions } from "@/lib/dateRange";
function ExpenseTable() {
  const [dateRange, _] = useAtom(dr_expense_atom);
  const col_name = "transaction_date";
  const dateFilter = dateFilterOptions(dateRange, col_name);
  const { data: ExpenseData = [] }: any = useExpense(dateFilter);
  const { data: TransactionMethodData = [] }: any = useTransactionMethod();
  const { data: CategoryData = [] }: any = useCategory("");
  const filterOptions = Array(
    {
      title: "Category",
      column_name: "Category",
      data: CategoryData
        ? CategoryData.map((item: Category) => ({
            label: item.name,
            value: item.name,
          }))
        : [],
    },
    {
      title: "Transaction Method",
      column_name: "Transaction Method",
      data: TransactionMethodData
        ? TransactionMethodData.map((item: TransactionMethod) => ({
            label: item.name,
            value: item.name,
          }))
        : [],
    }
  );
  const filename = `${format(new Date(), "yyMMdd")}_Expense`;

  return (
    <div>
      <DataTable
        columns={expenseColumns}
        data={ExpenseData}
        filterOptions={filterOptions}
        tableSearchColumn="Title"
        filename={filename}
        dateFilterRange={dr_expense_atom}
      />
    </div>
  );
}

export default ExpenseTable;
