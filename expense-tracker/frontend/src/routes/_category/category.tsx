import { createFileRoute } from "@tanstack/react-router";
import CategoryTable from "@/routes/-components/categoryTable";

export const Route = createFileRoute("/_category/category")({
  component: Category,
});

function Category() {
  return <CategoryTable />;
}
