import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeForm } from "../forms/ThemeForm";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import pb from "@/_pocketbase/pocketbase";
import { useNavigate } from "@tanstack/react-router";

function GeneralPage() {
  const [logoutToggle, setLogoutToggle] = useState(false);
  const navigate = useNavigate();
  const handleLogoutToggle = () => {
    setLogoutToggle(!logoutToggle);
    pb.authStore.clear();
    navigate({ to: "/authentication" });
  };
  return (
    <div className="flex flex-col max-w-[700px] space-y-3 ">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Apperance</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeForm />
        </CardContent>
      </Card>
      <Card className="max-w-[700px]">
        <CardHeader className="flex flex-row w-full items-center justify-between">
          <div className="space-y-0.5">
            <CardTitle className="text-base">Log out</CardTitle>
            <CardDescription>
              This action will log you out from application
            </CardDescription>
          </div>
          <Switch checked={logoutToggle} onCheckedChange={handleLogoutToggle} />
        </CardHeader>
      </Card>
    </div>
  );
}

export default GeneralPage;
