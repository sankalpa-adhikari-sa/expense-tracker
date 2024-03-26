"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FileIcon } from "lucide-react";
import CategoryForm from "./CategoryForm";
function AddCategory() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="gap-2">
            <FileIcon size={16} />
            Add
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[540px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Manage Category</SheetTitle>
          </SheetHeader>
          <CategoryForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AddCategory;
