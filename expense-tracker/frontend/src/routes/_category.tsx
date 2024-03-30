import { Outlet, createFileRoute } from "@tanstack/react-router";
import AddCategory from "@/routes/-components/addCategory";
import { Separator } from "@/components/ui/separator";
export const Route = createFileRoute("/_category")({
  component: CategoryLayout,
});

function CategoryLayout() {
  return (
    <main className="h-full w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="w-full font-bold">Category</h1>
        <AddCategory />
      </div>
      <Separator className="w-full" />
      <Outlet />
    </main>
  );
}
