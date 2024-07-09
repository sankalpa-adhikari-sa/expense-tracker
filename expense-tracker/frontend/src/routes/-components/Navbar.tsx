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
  SettingsIcon,
  HandCoinsIcon,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useAtom } from "jotai";
import { collapsed_atom } from "@/lib/atoms/atom";

import { NavBot } from "@/components/custom/navbar-bot";

export default function NavbarLayout() {
  const [isCollapsed, _] = useAtom(collapsed_atom);
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-col h-screen items-center justify-between">
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
              title: "Budget",
              label: "",
              icon: HandCoinsIcon,
              href: "/budgeting",
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
        <div className="flex flex-col flex-wrap items-center">
          <NavBot
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Settings",
                label: "",
                icon: SettingsIcon,
                href: "/settings",
              },
            ]}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
