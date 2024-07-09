import { Button } from "@/components/ui/button";
import { useCategoryBudget } from "@/hooks/useBudgetGranulityCategory";
import { useTransactionMethodBudget } from "@/hooks/useBudgetGranulityTransactionMethod";
import { useEventsByID, useUpdateEventsByID } from "@/hooks/useEvents";
import { Currencyformatter } from "@/lib/currencyFormatter";
import BudgetGranulityCategoryForm from "@/routes/-components/forms/BudgetGranulityCategoryForm";
import CategoryBudgetTable from "@/routes/-components/tables/categoryBudgetTable";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronUpCircleIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionMethodBudgetTable from "@/routes/-components/tables/transactionMethodBudgetTable";
import BudgetGranulityTransactionMethodForm from "@/routes/-components/forms/BudgetGranulityTransactionMethodForm";

//@ts-ignore
export const Route = createFileRoute("/_private/events/$eventsId/budgeting")({
  component: EventBudgeting,
});

function EventBudgeting() {
  const { eventsId } = Route.useParams();
  const { data: EventDetails = [] }: any = useEventsByID(eventsId);
  const { data: EventCategoryBudgetData = [] }: any = useCategoryBudget();
  const { data: EventTMBudgetData = [] }: any = useTransactionMethodBudget();
  const { mutate: updateEventData } = useUpdateEventsByID();
  const total_category_budget = EventCategoryBudgetData.reduce(
    (amount: number, item: any) => {
      return amount + item.category_budget;
    },
    0
  );
  const total_transaction_method_budget = EventTMBudgetData.reduce(
    (amount: number, item: any) => {
      return amount + item.transaction_method_budget;
    },
    0
  );
  console.log("Total Category Budget is: ", total_category_budget);
  console.log(
    "Total Transaction Method Budget is: ",
    total_transaction_method_budget
  );

  return (
    <>
      <Tabs defaultValue="category" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="category">Category Budgeting </TabsTrigger>
          <TabsTrigger value="transaction_method">
            Transaction Method Budgeting
          </TabsTrigger>
        </TabsList>
        <TabsContent value="category">
          <BudgetGranulityCategoryForm />
          {EventDetails.event_budget < total_category_budget ? (
            <div className="bg-destructive p-4 rounded-lg text-destructive-foreground flex flex-row items-center justify-between">
              <span>
                Your Total Category Budget has exceeded Total Event Budget. Do
                you want to Change Event Budget
                <span className="font-medium px-2">
                  {Currencyformatter.format(EventDetails.event_budget)}
                </span>
                to Total Category Budget
                <span className="font-medium pl-2">
                  {Currencyformatter.format(total_category_budget)}
                </span>
                .
              </span>

              <Button
                onClick={() =>
                  updateEventData({
                    id: eventsId,
                    data: {
                      event_budget: total_category_budget,
                    },
                  })
                }
              >
                <ChevronUpCircleIcon className="w-4 h-4 mr-2" />
                Update Budget
              </Button>
            </div>
          ) : null}
          <h3 className="text-lg font-medium">Budget Breakdown by Category</h3>
          <CategoryBudgetTable />
        </TabsContent>
        <TabsContent value="transaction_method">
          <BudgetGranulityTransactionMethodForm />
          {EventDetails.event_budget < total_transaction_method_budget ? (
            <div className="bg-destructive p-4 rounded-lg text-destructive-foreground flex flex-row items-center justify-between">
              <span>
                Your Total Transaction Method Budget has exceeded Total Event
                Budget. Do you want to Change Event Budget
                <span className="font-medium px-2">
                  {Currencyformatter.format(EventDetails.event_budget)}
                </span>
                to Total Transaction Method Budget
                <span className="font-medium pl-2">
                  {Currencyformatter.format(total_transaction_method_budget)}
                </span>
                .
              </span>

              <Button
                onClick={() =>
                  updateEventData({
                    id: eventsId,
                    data: {
                      event_budget: total_transaction_method_budget,
                    },
                  })
                }
              >
                <ChevronUpCircleIcon className="w-4 h-4 mr-2" />
                Update Budget
              </Button>
            </div>
          ) : null}
          <h3 className="text-lg font-medium">
            Budget Breakdown by Transaction Method
          </h3>
          <TransactionMethodBudgetTable />
        </TabsContent>
      </Tabs>
    </>
  );
}
