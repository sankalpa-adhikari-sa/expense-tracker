import ContactCard from "@/components/custom/contact-card";
import { useContacts } from "@/hooks/useContacts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_contacts/contacts")({
  component: Contacts,
});

function Contacts() {
  const { data: contactsData } = useContacts();

  return (
    <div className="flex flex-wrap gap-4">
      {contactsData?.map((item: any) => (
        <ContactCard key={item.id} props={item} />
      ))}
    </div>
  );
}
