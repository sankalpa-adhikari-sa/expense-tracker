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
import { Input } from "@/components/ui/input";
import { adminEmailSchema } from "@/types/type";
import { useUpdateAdminEmail } from "@/hooks/useAuth";
function AdminEmailUpdateForm(props: any) {
  const formOptions = {
    resolver: zodResolver(adminEmailSchema),
    defaultValues: {
      email: "",
      emailConfirm: "",
    },
  };
  const { mutate: updateAdminEmail } = useUpdateAdminEmail();
  const form = useForm<z.infer<typeof adminEmailSchema>>(formOptions);
  const updateEmail = (data: any) => {
    updateAdminEmail(data);
  };
  const onSubmitForm = (data: z.infer<typeof adminEmailSchema>) => {
    form.reset();

    updateEmail({
      adminId: props.adminId,
      email: data.emailConfirm,
    });
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
        className="h-full flex flex-col space-y-2 mx-1"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="admin@mail.com" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="admin@mail.com" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Button variant="destructive" onClick={handleReset}>
          clear
        </Button>
      </form>
    </Form>
  );
}

export default AdminEmailUpdateForm;
