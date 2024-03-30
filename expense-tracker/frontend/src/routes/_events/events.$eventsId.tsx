import { createFileRoute } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ExpenseForm from "../-components/ExpenseForm";
import IncomeForm from "../-components/IncomeForm";
import { Button } from "@/components/ui/button";
import ExpenseTable from "../-components/expenseTable";
import IncomeTable from "../-components/incomeTable";
import Analytics from "../-components/analytics";
import DataTableFiterOptions from "@/components/custom/table/data-table-date-filter";
import { date_range_atom } from "@/lib/atoms/atom";
//@ts-ignore
export const Route = createFileRoute("/_events/events/$eventsId")({
  component: IndvEvents,
});
function IndvEvents() {
  const { eventsId } = Route.useParams();

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Expense</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Manage Event Expense</SheetTitle>
          </SheetHeader>
          <ExpenseForm eventsId={eventsId} />
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Income</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Manage Event Income</SheetTitle>
          </SheetHeader>
          <IncomeForm eventsId={eventsId} />
        </SheetContent>
      </Sheet>
      <ExpenseTable eventsId={eventsId} />
      <IncomeTable eventsId={eventsId} />
      <DataTableFiterOptions dateRangeAtom={date_range_atom} />
      <Analytics eventsId={eventsId} />
    </div>
  );
}
