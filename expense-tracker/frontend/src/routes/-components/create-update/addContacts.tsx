"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ContactIcon } from "lucide-react";
import ContactsForm from "../forms/ContactsForm";
function AddContacts() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="gap-2">
            <ContactIcon size={16} />
            Add
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[640px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Manage Contacts</SheetTitle>
          </SheetHeader>
          <ContactsForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AddContacts;
