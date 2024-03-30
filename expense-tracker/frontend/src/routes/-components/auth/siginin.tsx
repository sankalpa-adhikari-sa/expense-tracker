"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLoginAdmin } from "@/hooks/useAuth";
import { EraserIcon } from "lucide-react";
const formSchema = z.object({
  email: z.string().email({ message: "Email must be valid" }),
  password: z
    .string()
    .min(10, { message: "Password must be 10 characters long" }),
});
export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: LoginAdmin } = useLoginAdmin();
  const onSubmitform = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    LoginAdmin(data);
    form.reset();
    form.clearErrors();
    setIsLoading(false);
  };
  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    form.reset();
    form.clearErrors();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitform)}
        className="flex flex-wrap flex-col gap-4 justify-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row w-full gap-4">
          <Button disabled={isLoading} type="submit" className="w-full">
            Signin
          </Button>
          <Button variant="destructive" onClick={handleReset}>
            <EraserIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
