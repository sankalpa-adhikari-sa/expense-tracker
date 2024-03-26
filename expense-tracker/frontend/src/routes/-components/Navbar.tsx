"use client";
import { Nav } from "@/components/custom/navbar";
import {
  File,
  HomeIcon,
  DollarSignIcon,
  TrendingDownIcon,
  WalletIcon,
  CalendarClockIcon,
  ContactIcon,
  FileEditIcon,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useAtom } from "jotai";
import { collapsed_atom } from "@/lib/atoms/atom";

export default function NavbarLayout() {
  const [isCollapsed, _] = useAtom(collapsed_atom);
  return (
    <TooltipProvider delayDuration={0}>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            label: "",
            icon: HomeIcon,
            href: "/dashboard",
          },
          {
            title: "Income",
            label: "",
            icon: DollarSignIcon,
            href: "/income",
          },
          {
            title: "Expense",
            label: "",
            icon: TrendingDownIcon,
            href: "/expense",
          },
          {
            title: "Category",
            label: "",
            icon: File,
            href: "/category",
          },
          {
            title: "Transaction Method",
            label: "",
            icon: WalletIcon,
            href: "/transaction_method",
          },
          {
            title: "Events",
            label: "",
            icon: CalendarClockIcon,
            href: "/events",
          },
          {
            title: "Contacts",
            label: "",
            icon: ContactIcon,
            href: "/contacts",
          },
          {
            title: "Posts",
            label: "",
            icon: FileEditIcon,
            href: "/posts",
          },
        ]}
      />
    </TooltipProvider>
  );
}
