"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { EraserIcon, PenIcon, PlusCircleIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { budgetGranulityTransactionMethodSchema } from "@/types/type";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { useTransactionMethod } from "@/hooks/useTransactionMethod";
import {
  useAddTransactionMethodBudgetData,
  useTransactionMethodBudget,
  useUpdateTransactionMethodBudgetByID,
} from "@/hooks/useBudgetGranulityTransactionMethod";

export default function BudgetGranulityTransactionMethodForm(props: any) {
  const data = props?.data;
  const eventsId = props?.eventsId;
  const isAddMode = !data;
  const formOptions = {
    resolver: zodResolver(budgetGranulityTransactionMethodSchema),
    defaultValues: {
      overflow_message: "",
      transaction_method_budget: 0,
    },
  };
  const { mutate: addTransactionMethodBudgetData } =
    useAddTransactionMethodBudgetData();
  const { mutate: updateTransactionMethodBudgetData } =
    useUpdateTransactionMethodBudgetByID();
  if (!isAddMode) {
    formOptions.defaultValues = {
      ...data,
      transaction_date: parseISO(data.transaction_date),
    };
  }
  const form =
    useForm<z.infer<typeof budgetGranulityTransactionMethodSchema>>(
      formOptions
    );
  const { data: TransactionMethodBudget = [] }: any =
    useTransactionMethodBudget();

  const transactionMethodData: { label: string; value: string }[] = (
    useTransactionMethod().data || []
  )
    .filter(
      (tm) =>
        !TransactionMethodBudget.some(
          (tm_budg: any) => tm.id === tm_budg.transaction_method
        )
    )
    .map((item) => ({
      label: item.name,
      value: item.id,
    }));

  const createTransactionMethodBudget = (data: any) => {
    addTransactionMethodBudgetData({ ...data, events: eventsId });
  };
  const updateTransactionMethodBudget = (data: any) => {
    updateTransactionMethodBudgetData({ id: data.id, data: data });
  };
  const onSubmitForm = (
    data: z.infer<typeof budgetGranulityTransactionMethodSchema>
  ) => {
    isAddMode
      ? createTransactionMethodBudget(data)
      : updateTransactionMethodBudget(data);
    form.reset();
  };
  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    form.reset();
    form.clearErrors();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="w-full flex flex-row gap-4 p-4  items-center rounded-lg border bg-card text-card-foreground shadow-sm"
      >
        <FormField
          control={form.control}
          name="transaction_method"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Transaction Method</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? transactionMethodData.find(
                            (Tmethod) => Tmethod.value === field.value
                          )?.label
                        : "Select Transaction Method"}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Transaction Method..."
                      className="h-9"
                    />
                    <CommandEmpty>No Transaction Method found.</CommandEmpty>
                    <CommandGroup>
                      {transactionMethodData.map((Tmethod) => (
                        <CommandItem
                          value={Tmethod.label}
                          key={Tmethod.value}
                          onSelect={() => {
                            form.setValue("transaction_method", Tmethod.value);
                          }}
                        >
                          {Tmethod.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              Tmethod.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transaction_method_budget"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Transaction Method Budget</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="250"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="overflow_message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Overflow Message</FormLabel>
              <FormControl>
                <Input placeholder="overflow_message.." {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-4">
          <Button type="submit">
            {isAddMode ? (
              <PlusCircleIcon className="w-4 h-4" />
            ) : (
              <PenIcon className="w-4 h-4" />
            )}
          </Button>
          <Button variant="destructive" onClick={handleReset}>
            <EraserIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
