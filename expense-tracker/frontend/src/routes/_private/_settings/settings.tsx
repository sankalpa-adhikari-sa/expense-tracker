import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePage from "@/routes/-components/page/profile-page";
import AccountPage from "@/routes/-components/page/account-page";
import GeneralPage from "@/routes/-components/page/general-page";

export const Route = createFileRoute("/_private/_settings/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralPage />
        </TabsContent>
        <TabsContent value="profile">
          <ProfilePage />
        </TabsContent>
        <TabsContent value="account">
          <AccountPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
