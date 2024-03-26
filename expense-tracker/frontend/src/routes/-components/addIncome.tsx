"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import IncomeForm from "./IncomeForm";
import { DollarSignIcon } from "lucide-react";
function AddIncome() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="gap-2">
            <DollarSignIcon size={16} />
            Add
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[540px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Manage Income</SheetTitle>
          </SheetHeader>
          <IncomeForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AddIncome;
