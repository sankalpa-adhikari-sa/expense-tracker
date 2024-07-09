"use client";
import { useTransactionMethod } from "@/hooks/useTransactionMethod";
import { Category, TransactionMethod } from "@/types/type";
import { useCategory } from "@/hooks/useCategory";
import { useIncome } from "@/hooks/useIncome";
import { DataTable } from "@/components/custom/table/data-table";
import { incomeColumns } from "./incomeColumns";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { dr_income_atom } from "@/lib/atoms/atom";
import { dateFilterOptions } from "@/lib/dateRange";

function IncomeTable(props: any) {
  const eventsId = props?.eventsId;
  const [dateRange, _] = useAtom(dr_income_atom);
  const col_name = "transaction_date";
  const dateFilter = dateFilterOptions(dateRange, col_name);
  const eventsFilter = `events = "${eventsId}"`;
  const filter = eventsId ? `${dateFilter} && ${eventsFilter}` : dateFilter;
  const { data: IncomeData = [] }: any = useIncome(filter);
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

  const filename = `${format(new Date(), "yyMMdd")}_Income`;

  return (
    <DataTable
      columns={incomeColumns}
      data={IncomeData}
      filterOptions={filterOptions}
      tableSearchColumn="Title"
      filename={filename}
      dateFilterRange={dr_income_atom}
    />
  );
}

export default IncomeTable;
