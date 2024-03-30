import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
export const Route = createFileRoute("/_private/_settings")({
  component: SettingsLayout,
});

function SettingsLayout() {
  return (
    <main className="h-full w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="w-full h-9 font-bold">Settings</h1>
      </div>
      <Separator className="w-full" />
      <Outlet />
    </main>
  );
}
