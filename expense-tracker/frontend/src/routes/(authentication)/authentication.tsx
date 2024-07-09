import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import SignIn from "@/routes/-components/auth/signIn";
import SignUp from "@/routes/-components/auth/signUp";
import pb from "@/_pocketbase/pocketbase";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(authentication)/authentication")({
  component: Auth,
});

export default function Auth() {
  const navigate = useNavigate();
  if (!pb.authStore.isValid) {
    return (
      <div className="flex flex-wrap w-screen h-screen items-center justify-center">
        <Card className="min-w-[500px]">
          <CardHeader>
            <CardTitle>Expense Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signup">Create Admin</TabsTrigger>
                <TabsTrigger value="signin">SignIn</TabsTrigger>
              </TabsList>
              <TabsContent value="signup">
                <SignUp />
              </TabsContent>
              <TabsContent value="signin">
                <SignIn />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    navigate({ to: "/dashboard" });
  }
}
