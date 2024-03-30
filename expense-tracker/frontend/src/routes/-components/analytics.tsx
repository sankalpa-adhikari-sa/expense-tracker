import { date_range_atom } from "@/lib/atoms/atom";
import { useAtom } from "jotai";
import { dateFilterOptions } from "@/lib/dateRange";
import { useIncome } from "@/hooks/useIncome";
import { useExpense } from "@/hooks/useExpense";

import CashflowOptions from "@/lib/echarts/cashflowOption";
import PieChartOption from "@/lib/echarts/PieChartOption";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
function Analytics(props: any) {
  const eventsId = props?.eventsId;
  const [dateRange, _] = useAtom(date_range_atom);
  const col_name = "transaction_date";
  const dateFilter = dateFilterOptions(dateRange, col_name);
  const eventsFilter = `events = "${eventsId}"`;
  const filter = eventsId ? `${dateFilter} && ${eventsFilter}` : dateFilter;
  const { data: IncomeData = [] }: any = useIncome(filter);
  const { data: ExpenseData = [] }: any = useExpense(filter);
  const IncomeCategory = Category(IncomeData, "category");
  const ExpenseCategory = Category(ExpenseData, "category");
  const IncomeTransactionMethod = Category(IncomeData, "transaction_method");
  const ExpenseTransactionMethod = Category(ExpenseData, "transaction_method");
  const IncomeTransactionData = TransactionData(IncomeData);
  const ExpenseTransactionData = TransactionData(ExpenseData);
  return (
    <>
      <h4 className="font-bold text-lg">Income</h4>
      <div className="flex flex-col w-full gap-3">
        <Card>
          <CardHeader className="font-bold">Income</CardHeader>
          <CardContent>
            <CashflowOptions
              data={IncomeTransactionData}
              category_type="Income"
            />
          </CardContent>
        </Card>

        <div className="flex flex-row w-full gap-3">
          <Card className="w-full">
            <CardHeader className="font-bold">Income by Category</CardHeader>
            <CardContent>
              <PieChartOption
                title="Category"
                data={IncomeCategory}
                cashflow_type="Income"
              />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="font-bold">
              Income by Transaction Method
            </CardHeader>
            <CardContent>
              <PieChartOption
                data={IncomeTransactionMethod}
                cashflow_type="Income"
                title="Transaction Method"
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <h4 className="text-lg font-bold">Expenses</h4>
      <div className="flex flex-col w-full gap-3">
        <Card className="w-full">
          <CardHeader className="font-bold">Expense</CardHeader>

          <CardContent>
            <CashflowOptions
              data={ExpenseTransactionData}
              category_type="Expense"
            />
          </CardContent>
        </Card>
        <div className="flex flex-row w-full gap-3">
          <Card className="w-full">
            <CardHeader className="font-bold">Expense by Category</CardHeader>

            <CardContent>
              <PieChartOption
                data={ExpenseCategory}
                cashflow_type="Expense"
                title="Category"
              />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="font-bold">
              Expense by Transaction Method
            </CardHeader>
            <CardContent>
              <PieChartOption
                data={ExpenseTransactionMethod}
                cashflow_type="Expense"
                title="Transaction Method"
              />
            </CardContent>
          </Card>
        </div>
      </div>{" "}
    </>
  );
}

export default Analytics;
function Category(data: any, category: string) {
  //@ts-ignore
  const Category = Object.groupBy(
    data,
    (item: any) => item.expand[category].name
  );
  const TestData = Object.entries(Category).map(
    ([key, val]: [key: string, val: any]) => {
      const amount = val.reduce((amount: number, item: any) => {
        return amount + item.amount;
      }, 0);
      return { category: key, amount: amount };
    }
  );
  return TestData;
}

function TransactionData(data: any) {
  //@ts-ignore
  const Category = Object.groupBy(data, (item: any) => item.transaction_date);
  const TestData = Object.entries(Category).map(
    ([key, val]: [key: string, val: any]) => {
      const amount = val.reduce((amount: number, item: any) => {
        return amount + item.amount;
      }, 0);
      return {
        transaction_date: format(new Date(key), "yyyy-MM-dd HH:mm:ss"),
        amount: amount,
      };
    }
  );
  return TestData;
}
