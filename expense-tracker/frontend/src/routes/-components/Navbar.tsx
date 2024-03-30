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
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useAtom } from "jotai";
import { collapsed_atom } from "@/lib/atoms/atom";
import UserAvatar from "./user-avatar";
import { ModeToggle } from "@/components/custom/mode_toggle";

export default function NavbarLayout() {
  const [isCollapsed, _] = useAtom(collapsed_atom);
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-col items-center">
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
          ]}
        />
        <div className="flex flex-wrap items-center justify-between">
          <UserAvatar />
          <ModeToggle />
        </div>
      </div>
    </TooltipProvider>
  );
}
