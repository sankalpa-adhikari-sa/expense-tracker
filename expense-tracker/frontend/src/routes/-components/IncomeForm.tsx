"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
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
import { ScrollArea } from "@/components/ui/scroll-area";

import { Input } from "@/components/ui/input";
import { incomeSchema } from "@/types/type";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useTransactionMethod } from "@/hooks/useTransactionMethod";
import { useCategory } from "@/hooks/useCategory";
import { useAddIncomeData, useUpdateIncomeByID } from "@/hooks/useIncome";

export default function IncomeForm(props: any) {
  const data = props?.data;
  const eventsId = props?.eventsId;
  const isAddMode = !data;
  const formOptions = {
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      type: "Income",
      title: "",
      amount: 0,
      details: "",
    },
  };
  const { mutate: addIncomeData } = useAddIncomeData();
  const { mutate: updateIncomeData } = useUpdateIncomeByID();
  if (!isAddMode) {
    formOptions.defaultValues = {
      ...data,
      transaction_date: parseISO(data.transaction_date),
    };
  }
  const form = useForm<z.infer<typeof incomeSchema>>(formOptions);
  const transactionMethodData: { label: string; value: string }[] = (
    useTransactionMethod().data || []
  ).map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const categoryData: { label: string; value: string }[] = (
    useCategory("").data || []
  ).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const createIncome = (data: any) => {
    addIncomeData({ ...data, events: eventsId });
  };
  const updateIncome = (data: any) => {
    updateIncomeData({ id: data.id, data: data });
  };
  const onSubmitForm = (data: z.infer<typeof incomeSchema>) => {
    form.reset();
    console.log(data);
    isAddMode ? createIncome(data) : updateIncome(data);
  };
  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    form.reset();
    form.clearErrors();
  };

  return (
    <Form {...form}>
      <ScrollArea className="h-[80%]">
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="h-full flex flex-col space-y-2 mx-1"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="CIMMYT-International" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
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
            name="transaction_method"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
                              form.setValue(
                                "transaction_method",
                                Tmethod.value
                              );
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
                <FormDescription className="text-xs">
                  You can create new Transaction Methods from Transaction Method
                  Page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
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
                          ? categoryData.find(
                              (category) => category.value === field.value
                            )?.label
                          : "Select Category"}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search Category..."
                        className="h-9"
                      />
                      <CommandEmpty>No Category found.</CommandEmpty>
                      <CommandGroup>
                        {categoryData.map((category) => (
                          <CommandItem
                            value={category.label}
                            key={category.value}
                            onSelect={() => {
                              form.setValue("category", category.value);
                            }}
                          >
                            {category.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                category.value === field.value
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
                <FormDescription className="text-xs">
                  You can create new Category from Category Page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input placeholder="Details.." {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transaction_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Transaction Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isAddMode ? "Submit" : "Edit"}</Button>{" "}
          <Button variant="destructive" onClick={handleReset}>
            {" "}
            clear
          </Button>
        </form>
      </ScrollArea>
    </Form>
  );
}
