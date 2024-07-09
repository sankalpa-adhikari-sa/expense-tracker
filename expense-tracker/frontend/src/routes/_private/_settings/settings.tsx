import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountPage from "@/routes/-components/page/accountPage";
import GeneralPage from "@/routes/-components/page/generalPage";

export const Route = createFileRoute("/_private/_settings/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>

          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralPage />
        </TabsContent>

        <TabsContent value="account">
          <AccountPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
