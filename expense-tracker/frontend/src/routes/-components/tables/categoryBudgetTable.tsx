"use client";

import { DataTable } from "@/components/custom/table/data-table";
import { format } from "date-fns";
import { categoryBudgetColumns } from "./categoryBudgetColumns";
import { useCategoryBudget } from "@/hooks/useBudgetGranulityCategory";
function CategoryBudgetTable() {
  const { data: CategoryBudget = [] }: any = useCategoryBudget();

  const filename = `${format(new Date(), "yyMMdd")}_Category_Budget`;

  return (
    <DataTable
      columns={categoryBudgetColumns}
      data={CategoryBudget}
      tableSearchColumn="Category"
      filename={filename}
      showFooter={true}
    />
  );
}

export default CategoryBudgetTable;
