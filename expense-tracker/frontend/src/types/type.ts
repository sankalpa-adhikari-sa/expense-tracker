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
// export const incomeTableSchema = incomeSchema.extend({
//   expand: z.any().optional(),
// });
// export const expenseTableSchema = expenseSchema.extend({
//   expand: z.any().optional(),
// });
export const unitsSchema = z.object({
  name: z.string().min(1, { message: "Unit is required." }),
});
export const transactionMethodSchema = z.object({
  name: z.string().min(1, { message: "Transaction Method is required." }),
  details: z.string().optional(),
  id: z.string().optional(),
});
export const eventsSchema = z.object({
  event_name: z.string().min(1, { message: "Event Name is required." }),
  event_start_date: z.date(),
  event_end_date: z.date(),
  details: z.string().optional(),
  id: z.string().optional(),
});
export const categorySchema = z.object({
  name: z.string().min(1, { message: "Category is required." }),
  details: z.string().optional(),
  id: z.string().optional(),
});
export const contactsSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  company: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email().optional(),
  contact_number: z.number().optional(),
  details: z.string().optional(),
  blood_group: z.string().optional(),
  id: z.string().optional(),
  avatar: z.any().optional(),
});
export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
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
