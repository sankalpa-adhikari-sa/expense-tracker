"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CalendarClockIcon } from "lucide-react";
import EventsForm from "./EventsForm";
function AddEvents() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="gap-2">
            <CalendarClockIcon size={16} />
            Add
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[640px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Manage Events</SheetTitle>
          </SheetHeader>
          <EventsForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AddEvents;
