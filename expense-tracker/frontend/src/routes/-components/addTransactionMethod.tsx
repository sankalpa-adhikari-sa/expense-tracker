"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { WalletIcon } from "lucide-react";
import TransactionMethodForm from "./TransactionMethodForm";
function AddTransactionMethod() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="gap-2">
            <WalletIcon size={16} />
            Add
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[640px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Manage Transaction Method</SheetTitle>
          </SheetHeader>
          <TransactionMethodForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AddTransactionMethod;
