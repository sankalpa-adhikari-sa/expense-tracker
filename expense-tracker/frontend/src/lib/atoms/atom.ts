import { atom } from "jotai";
import { addDays, startOfMonth } from "date-fns";
export const date_range_atom = atom({
  from: startOfMonth(new Date()),
  to: addDays(new Date(), 0),
  selected: "m",
});

export const dr_category_atom = atom({
  from: startOfMonth(new Date()),
  to: addDays(new Date(), 0),
  selected: "m",
});
export const dr_income_atom = atom({
  from: startOfMonth(new Date()),
  to: addDays(new Date(), 0),
  selected: "m",
});
export const dr_expense_atom = atom({
  from: startOfMonth(new Date()),
  to: addDays(new Date(), 0),
  selected: "m",
});

export const collapsed_atom = atom(false);
