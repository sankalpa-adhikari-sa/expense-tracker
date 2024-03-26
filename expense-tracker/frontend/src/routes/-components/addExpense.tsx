"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ExpenseForm from "./ExpenseForm";
import { TrendingDownIcon } from "lucide-react";

function AddExpense() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="gap-2">
            <TrendingDownIcon size={16} />
            Add
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[540px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Manage Expense</SheetTitle>
          </SheetHeader>
          <ExpenseForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AddExpense;
