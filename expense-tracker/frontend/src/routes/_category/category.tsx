import { createFileRoute } from "@tanstack/react-router";
import CategoryTable from "../-components/categoryTable";

export const Route = createFileRoute("/_category/category")({
  component: Category,
});

function Category() {
  return <CategoryTable />;
}