import { createFileRoute } from "@tanstack/react-router";
import CategoryTable from "@/routes/-components/tables/categoryTable";

export const Route = createFileRoute("/_private/_category/category")({
  component: Category,
});

function Category() {
  return <CategoryTable />;
}
