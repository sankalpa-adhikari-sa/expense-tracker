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
import { contactsSchema } from "@/types/type";
import { useAddContactsData, useUpdateContactsByID } from "@/hooks/useContacts";
export default function ContactsForm(props: any) {
  const data = props?.data;
  const isAddMode = !data;

  const formOptions = {
    resolver: zodResolver(contactsSchema),
    defaultValues: {
      name: "",
    },
  };
  const { mutate: addContactsData } = useAddContactsData();
  const { mutate: updateContactsData } = useUpdateContactsByID();
  if (!isAddMode) {
    formOptions.defaultValues = {
      ...data,
    };
  }
  const form = useForm<z.infer<typeof contactsSchema>>(formOptions);

  const createContacts = (data: any) => {
    addContactsData(data);
  };
  const updateContacts = (data: any) => {
    updateContactsData({ id: data.id, data: data });
  };
  const onSubmitForm = (data: z.infer<typeof contactsSchema>) => {
    form.reset();
    isAddMode ? createContacts(data) : updateContacts(data);
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Pulchowk, Lalitpur" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="CIMMYT" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="test@example.com" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123456789"
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
            name="blood_group"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Group</FormLabel>
                <FormControl>
                  <Input placeholder="O -" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
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
