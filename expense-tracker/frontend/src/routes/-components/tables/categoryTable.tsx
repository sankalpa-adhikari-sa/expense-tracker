"use client";
import { useCategory } from "@/hooks/useCategory";
import { DataTable } from "@/components/custom/table/data-table";
import { format } from "date-fns";
import { categoryColumns } from "./category_columns";
function CategoryTable() {
  const { data: CategoryData = [] }: any = useCategory("");

  const filename = `${format(new Date(), "yyMMdd")}_Category`;

  return (
    <DataTable
      columns={categoryColumns}
      data={CategoryData}
      tableSearchColumn="Category"
      filename={filename}
    />
  );
}

export default CategoryTable;
