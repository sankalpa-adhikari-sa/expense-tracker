import pb from "@/_pocketbase/pocketbase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import AdminEmailUpdateForm from "../forms/AdminEmailUpdateForm";
import AdminPasswordUpdateForm from "../forms/AdminPasswordUpdateForm";

function AccountPage() {
  //@ts-ignore
  const adminId = pb.authStore.model.id;
  const [pwdToggle, setPwdToggle] = useState(false);
  const [adminIdToggle, setAdminIdToggle] = useState(false);
  const [adminEmailToggle, setAdminEmailToggle] = useState(false);
  const handlePwdToggle = () => {
    setPwdToggle(!pwdToggle);
  };
  const handleAdminIdToggle = () => {
    setAdminIdToggle(!adminIdToggle);
  };
  const handleAdminEmailToggle = () => {
    setAdminEmailToggle(!adminEmailToggle);
  };
  return (
    <div className="flex flex-col max-w-[700px] space-y-3">
      <Card className="max-w-[700px]">
        <CardHeader className="flex flex-row w-full items-center justify-between">
          <div className="space-y-0.5">
            <CardTitle className="text-base">Change Admin Password</CardTitle>
            <CardDescription>
              This action will change login password to app as admin
            </CardDescription>
          </div>
          <Switch checked={pwdToggle} onCheckedChange={handlePwdToggle} />
        </CardHeader>
      </Card>
      {pwdToggle ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Update Admin Password</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminPasswordUpdateForm adminId={adminId} />
          </CardContent>
        </Card>
      ) : null}
      <Card className="max-w-[700px]">
        <CardHeader className="flex flex-row w-full items-center justify-between">
          <div className="space-y-0.5">
            <CardTitle className="text-base">View Admin Id</CardTitle>
            <CardDescription>This action will show admin Id</CardDescription>
          </div>
          <Switch
            checked={adminIdToggle}
            onCheckedChange={handleAdminIdToggle}
          />
        </CardHeader>
      </Card>
      {adminIdToggle ? (
        <Card>
          <CardHeader className="flex flex-col w-full">
            <CardTitle className="text-base">Admin Id</CardTitle>
            <Input value={adminId} disabled={true} />
          </CardHeader>
        </Card>
      ) : null}

      <Card className="max-w-[700px]">
        <CardHeader className="flex flex-row w-full items-center justify-between">
          <div className="space-y-0.5">
            <CardTitle className="text-base">Change Admin Email</CardTitle>
            <CardDescription>
              This action will change Admin Email for Login
            </CardDescription>
          </div>
          <Switch
            checked={adminEmailToggle}
            onCheckedChange={handleAdminEmailToggle}
          />
        </CardHeader>
      </Card>
      {adminEmailToggle ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Update Admin Email</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminEmailUpdateForm adminId={adminId} />
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

export default AccountPage;
