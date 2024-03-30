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
import { adminPasswordSchema } from "@/types/type";
import { useUpdateAdminPassword } from "@/hooks/useAuth";
function AdminPasswordUpdateForm(props: any) {
  const formOptions = {
    resolver: zodResolver(adminPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  };
  const { mutate: updateAdminPassword } = useUpdateAdminPassword();
  const form = useForm<z.infer<typeof adminPasswordSchema>>(formOptions);
  const updatePassword = (data: any) => {
    updateAdminPassword(data);
  };
  const onSubmitForm = (data: z.infer<typeof adminPasswordSchema>) => {
    form.reset();

    updatePassword({
      adminId: props.adminId,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="*****" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="*****" {...field} />
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

export default AdminPasswordUpdateForm;
