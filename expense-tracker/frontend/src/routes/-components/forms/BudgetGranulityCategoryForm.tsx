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
import { budgetGranulityCategorySchema } from "@/types/type";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useCategory } from "@/hooks/useCategory";
import {
  useAddCategoryBudgetData,
  useCategoryBudget,
  useUpdateCategoryBudgetByID,
} from "@/hooks/useBudgetGranulityCategory";

export default function BudgetGranulityCategoryForm(props: any) {
  const data = props?.data;
  const eventsId = props?.eventsId;
  const isAddMode = !data;
  const formOptions = {
    resolver: zodResolver(budgetGranulityCategorySchema),
    defaultValues: {
      overflow_message: "",
      category_budget: 0,
    },
  };
  const { mutate: addCategoryBudgetData } = useAddCategoryBudgetData();
  const { mutate: updateCategoryBudgetData } = useUpdateCategoryBudgetByID();
  if (!isAddMode) {
    formOptions.defaultValues = {
      ...data,
      transaction_date: parseISO(data.transaction_date),
    };
  }
  const form =
    useForm<z.infer<typeof budgetGranulityCategorySchema>>(formOptions);
  const { data: CategoryBudget = [] }: any = useCategoryBudget();

  const categoryData: { label: string; value: string }[] = (
    useCategory("").data || []
  )
    .filter(
      (cat) =>
        !CategoryBudget.some((cat_budg: any) => cat.id === cat_budg.category)
    )
    .map((item) => ({
      label: item.name,
      value: item.id,
    }));

  const createCategoryBudget = (data: any) => {
    addCategoryBudgetData({ ...data, events: eventsId });
  };
  const updateCategoryBudget = (data: any) => {
    updateCategoryBudgetData({ id: data.id, data: data });
  };
  const onSubmitForm = (
    data: z.infer<typeof budgetGranulityCategorySchema>
  ) => {
    isAddMode ? createCategoryBudget(data) : updateCategoryBudget(data);
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
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-sm">Category</FormLabel>
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

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_budget"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category Budget</FormLabel>
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
