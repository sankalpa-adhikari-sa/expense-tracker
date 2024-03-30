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
import { categorySchema } from "@/types/type";
import { useAddCategoryData, useUpdateCategoryByID } from "@/hooks/useCategory";
export default function CategoryForm(props: any) {
  const data = props?.data;
  const isAddMode = !data;

  const formOptions = {
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  };
  const { mutate: addCategoryData } = useAddCategoryData();
  const { mutate: updateCategoryData } = useUpdateCategoryByID();
  if (!isAddMode) {
    formOptions.defaultValues = {
      ...data,
    };
  }
  const form = useForm<z.infer<typeof categorySchema>>(formOptions);

  const createCategory = (data: any) => {
    addCategoryData(data);
  };
  const updateCategory = (data: any) => {
    updateCategoryData({ id: data.id, data: data });
  };
  const onSubmitForm = (data: z.infer<typeof categorySchema>) => {
    form.reset();
    isAddMode ? createCategory(data) : updateCategory(data);
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
                  <Input placeholder="Salary" {...field} />
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
                  <Input placeholder="details" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
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
