import { createFileRoute } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ExpenseForm from "../../-components/forms/ExpenseForm";
import IncomeForm from "../../-components/forms/IncomeForm";
import { Button } from "@/components/ui/button";
import ExpenseTable from "../../-components/tables/expenseTable";
import IncomeTable from "../../-components/tables/incomeTable";
import Analytics from "../../-components/analytics";
import DataTableFiterOptions from "@/components/custom/table/data-table-date-filter";
import { date_range_atom } from "@/lib/atoms/atom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, DollarSignIcon, TrendingDownIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEventsByID } from "@/hooks/useEvents";
import { format, parseISO } from "date-fns";
//@ts-ignore
export const Route = createFileRoute("/_private/events/$eventsId")({
  component: IndvEvents,
});
function IndvEvents() {
  const { eventsId } = Route.useParams();
  const { data: EventDetails = [] }: any = useEventsByID(eventsId);
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{EventDetails.event_name}</CardTitle>
          <CardDescription className="flex flex-row gap-2 items-center">
            <CalendarIcon className="w-4 h-4" />
            {EventDetails.event_start_date
              ? format(parseISO(EventDetails.event_start_date), "MMMM dd, yyyy")
              : null}{" "}
            -
            {EventDetails.event_end_date
              ? format(parseISO(EventDetails.event_end_date), "MMMM dd, yyyy")
              : null}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {EventDetails.details ? <div>{EventDetails.details}</div> : null}
        </CardContent>
      </Card>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <h1 className="w-full font-bold">Events Summary</h1>
              <DataTableFiterOptions dateRangeAtom={date_range_atom} />
            </div>
            <Analytics eventsId={eventsId} />
          </div>
        </TabsContent>
        <TabsContent value="income">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <h1 className="w-full font-bold">Events Income</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <DollarSignIcon size={16} />
                    Add
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Manage Event Income</SheetTitle>
                  </SheetHeader>
                  <IncomeForm eventsId={eventsId} />
                </SheetContent>
              </Sheet>
            </div>
            <IncomeTable eventsId={eventsId} />
          </div>
        </TabsContent>
        <TabsContent value="expense">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <h1 className="w-full font-bold">Events Expense</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <TrendingDownIcon size={16} />
                    Add
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Manage Event Expense</SheetTitle>
                  </SheetHeader>
                  <ExpenseForm eventsId={eventsId} />
                </SheetContent>
              </Sheet>
            </div>
            <ExpenseTable eventsId={eventsId} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
