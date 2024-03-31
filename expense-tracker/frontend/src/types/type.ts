import * as z from "zod";

export const expenseSchema = z.object({
  type: z.string().default("Expense"),
  title: z.string().min(1, { message: "Title is required." }),
  id: z.string().optional(),
  amount: z.number(),
  transaction_method: z.string().optional(),
  category: z.string().optional(),
  transaction_date: z.date().optional(),
  details: z.string().optional(),
  expand: z.any().optional(),
});
export const incomeSchema = z.object({
  type: z.string().default("Income"),
  title: z.string().min(1, { message: "Title is required." }),
  amount: z.number(),
  transaction_method: z.string(),
  category: z.string(),
  transaction_date: z.date(),
  details: z.string().optional(),
  expand: z.any().optional(),
  id: z.string().optional(),
});

export const unitsSchema = z.object({
  name: z.string().min(1, { message: "Unit is required." }),
});
export const transactionMethodSchema = z.object({
  name: z.string().min(1, { message: "Transaction Method is required." }),
  details: z.string().optional(),
  id: z.string().optional(),
});
export const eventsSchema = z
  .object({
    event_name: z.string().min(1, { message: "Event Name is required." }),
    event_start_date: z.date(),
    event_end_date: z.date(),
    details: z.string().optional(),
    id: z.string().optional(),
  })
  .refine((data) => data.event_start_date <= data.event_end_date, {
    message: "Event End date must be greater than or equal to start date",
    path: ["event_end_date"],
  });
export const categorySchema = z.object({
  name: z.string().min(1, { message: "Category is required." }),
  details: z.string().optional(),
  id: z.string().optional(),
});
export const adminPasswordSchema = z
  .object({
    password: z.string().min(4, { message: "Password is required." }),
    passwordConfirm: z
      .string()
      .min(4, { message: "Confirm Password is required." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });
export const adminEmailSchema = z
  .object({
    email: z.string().email({ message: "Email must be valid" }),
    emailConfirm: z.string().email({ message: "Email must be valid" }),
  })
  .refine((data) => data.email === data.emailConfirm, {
    message: "email don't match",
    path: ["emailConfirm"],
  });
export const contactsSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  address: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  email: z.string().email().optional(),
  contact_number: z.number().optional(),
  details: z.string().optional(),
  blood_group: z.string().optional(),
  id: z.string().optional(),
  avatar: z.any().optional(),
});

export type Expense = z.infer<typeof expenseSchema>;
export type Income = z.infer<typeof incomeSchema>;
// export type IncomeTable = z.infer<typeof incomeTableSchema>;
// export type ExpenseTable = z.infer<typeof expenseTableSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Contacts = z.infer<typeof contactsSchema>;
export type TransactionMethod = z.infer<typeof transactionMethodSchema>;
export type Events = z.infer<typeof eventsSchema>;
export type Units = z.infer<typeof unitsSchema>;
export type AdminPassword = z.infer<typeof adminPasswordSchema>;
export type AdminEmail = z.infer<typeof adminEmailSchema>;
