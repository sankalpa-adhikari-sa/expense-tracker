import { date_range_atom } from "@/lib/atoms/atom";
import { useAtom } from "jotai";
import { dateFilterOptions } from "@/lib/dateRange";
import { useIncome } from "@/hooks/useIncome";
import { useExpense } from "@/hooks/useExpense";

import CashflowOptions from "@/lib/echarts/cashflowOption";
import PieChartOption from "@/lib/echarts/PieChartOption";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { DollarSignIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
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
  const total_income = IncomeData.reduce((acc: number, item: any) => {
    return acc + item.amount;
  }, 0);
  const total_expense = ExpenseData.reduce((acc: number, item: any) => {
    return acc + item.amount;
  }, 0);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">NPR {total_income}</div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expense</CardTitle>
            <TrendingDownIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">NPR {total_expense}</div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {total_income - total_expense < 0 ? "Total Loss" : "Total Profit"}
            </CardTitle>
            {total_income - total_expense < 0 ? (
              <TrendingDownIcon className=" h-4 w-4 stroke-destructive" />
            ) : (
              <TrendingUpIcon className="h-4 w-4 stroke-green-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              NPR {Math.abs(total_income - total_expense)}
            </div>
          </CardContent>
        </Card>
      </div>
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
