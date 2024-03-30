import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import pb from "@/_pocketbase/pocketbase";

import { useNavigate } from "@tanstack/react-router";
function UserAvatar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    pb.authStore.clear();
    navigate({ to: "/authentication" });
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[150px] mr-2">
          <DropdownMenuLabel className="capitalize">
            <p className="font-normal text-sm text-muted-foreground">User</p>
            <p>Jon Doe</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="h-10">
            <LogOutIcon className="mr-3 w-4 h-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default UserAvatar;
