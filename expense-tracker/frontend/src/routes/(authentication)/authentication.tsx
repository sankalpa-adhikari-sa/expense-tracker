import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import SignIn from "@/routes/-components/auth/siginin";
import SignUp from "@/routes/-components/auth/signup";
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
        <Card>
          <CardHeader>
            <CardTitle>Expense Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="signup">SignUp</TabsTrigger>
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
