"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { transactionMethodSchema } from "@/types/type";
import {
  useAddTransactionMethodData,
  useUpdateTransactionMethodByID,
} from "@/hooks/useTransactionMethod";
import { EraserIcon } from "lucide-react";
export default function TransactionMethodForm(props: any) {
  const data = props?.data;
  const isAddMode = !data;

  const formOptions = {
    resolver: zodResolver(transactionMethodSchema),
    defaultValues: {
      name: "",
    },
  };
  const { mutate: addTransactionMethodData } = useAddTransactionMethodData();
  const { mutate: updateTransactionMethodData } =
    useUpdateTransactionMethodByID();
  if (!isAddMode) {
    formOptions.defaultValues = {
      ...data,
    };
  }
  const form = useForm<z.infer<typeof transactionMethodSchema>>(formOptions);

  const createTransactionMethod = (data: any) => {
    addTransactionMethodData(data);
  };
  const updateTransactionMethod = (data: any) => {
    updateTransactionMethodData({ id: data.id, data: data });
  };
  const onSubmitForm = (data: z.infer<typeof transactionMethodSchema>) => {
    form.reset();
    isAddMode ? createTransactionMethod(data) : updateTransactionMethod(data);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Esewa" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
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
                  <Input placeholder="Details" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="flex flex-row w-full gap-4">
            <Button type="submit" className="w-full">
              {isAddMode ? "Submit" : "Edit"}
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              <EraserIcon className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </ScrollArea>
    </Form>
  );
}
