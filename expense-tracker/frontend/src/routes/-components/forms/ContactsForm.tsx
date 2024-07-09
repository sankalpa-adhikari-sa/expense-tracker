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
import { EraserIcon } from "lucide-react";
export default function ContactsForm(props: any) {
  const data = props?.data;
  const isAddMode = !data;

  const formOptions = {
    resolver: zodResolver(contactsSchema),
    defaultValues: {
      name: "",
      address: "",
      company: "",
      position: "",
      details: "",
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
    console.log(data.avatar);
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
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Manager" {...field} />
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
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...fieldProps}
                    accept="image/*, application/pdf"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
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
