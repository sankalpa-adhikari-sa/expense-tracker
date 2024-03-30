import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropletIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
  PhoneCallIcon,
  TrashIcon,
} from "lucide-react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import pb from "@/_pocketbase/pocketbase";
import ContactsForm from "@/routes/-components/ContactsForm";
import { useDeleteContactsByID } from "@/hooks/useContacts";
import { Separator } from "../ui/separator";
function ContactCard({ props }: any) {
  const deleteContacts = useDeleteContactsByID();
  const handleDelete = (id: any) => {
    return deleteContacts.mutate(id);
  };
  const url = pb.files.getUrl(props, props.avatar);
  return (
    <HoverCard key={props.id}>
      <Card className="flex-grow">
        <CardHeader className="flex flex-row gap-4 items-center ">
          <Avatar className="w-20 h-20">
            <AvatarImage src={url} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row w-full justify-between items-center">
              <CardTitle>{props.name}</CardTitle>
              <div className="flex flex-row gap-4">
                <Separator orientation="vertical" className="h-4" />
                <Sheet>
                  <SheetTrigger asChild>
                    <PencilIcon className="cursor-pointer w-4 h-4" />
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Manage Contacts</SheetTitle>
                    </SheetHeader>
                    <ContactsForm data={props} />
                  </SheetContent>
                </Sheet>
                <TrashIcon
                  onClick={() => handleDelete(props.id)}
                  className="cursor-pointer w-4 h-4 stroke-destructive"
                />
                <Separator orientation="vertical" className="h-4" />
                <HoverCardTrigger asChild>
                  <InfoCircledIcon className="w-4 h-4" />
                </HoverCardTrigger>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-between">
              <div className="flex flex-row gap-3 items-center">
                <PhoneCallIcon className="w-4 h-4 stroke-purple-500 " />
                <span> {props.contact_number}</span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <MailIcon className="w-4 h-4 stroke-purple-500" />
                <span> {props.email}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{props.company}</h4>
            <div className="flex flex-row items-center space-x-4">
              <span className="text-xs text-muted-foreground">
                {props.position ? props.postion : null}
              </span>
              <div className="flex items-center">
                <DropletIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  {props.blood_group}
                </span>
              </div>
            </div>
            <p className="text-sm">{props.details}</p>
            <div className="flex items-center pt-2">
              <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {props.address}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ContactCard;
