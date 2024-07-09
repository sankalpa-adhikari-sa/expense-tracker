"use client";

import { ArrowLeftIcon, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useMatchRoute, useRouter } from "@tanstack/react-router";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    href: string;
  }[];
}

export function NavBot({ links, isCollapsed }: NavProps) {
  const router = useRouter();
  const onBack = () => router.history.back();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-4 data-[collapsed=true]:py-4 data-[collapsed=false]:w-48"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 group-[[data-collapsed=false]]:w-48">
        {links.map((link, index) => {
          const matchRoute = useMatchRoute();
          //@ts-ignore
          const isActive = matchRoute({ to: link.href });
          if (isCollapsed) {
            return (
              <>
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      to={link.href}
                      className={cn(
                        buttonVariants({
                          variant: isActive ? "default" : "ghost",
                          size: "icon",
                        }),
                        "h-9 w-9",
                        isActive &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    {link.title}s
                    {link.label && (
                      <span className="ml-auto text-muted-foreground">
                        {link.label}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>

                <Tooltip key="go_back" delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      onClick={onBack}
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                          size: "icon",
                        }),
                        "h-9 w-9"
                      )}
                    >
                      <ArrowLeftIcon className="w-4 h-4" />
                      <span className="sr-only">Go back</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    Go back
                  </TooltipContent>
                </Tooltip>
              </>
            );
          } else {
            return (
              <>
                <Link
                  key={index}
                  to={link.href}
                  className={cn(
                    buttonVariants({
                      variant: isActive ? "default" : "ghost",
                      size: "sm",
                    }),
                    isActive &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start"
                  )}
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                  {link.label && (
                    <span
                      className={cn(
                        "ml-auto",
                        isActive && "text-background dark:text-white"
                      )}
                    >
                      {link.label}
                    </span>
                  )}
                </Link>
                <Link
                  key="go+back"
                  onClick={onBack}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    }),
                    "justify-start"
                  )}
                >
                  <ArrowLeftIcon className="mr-2 w-4 h-4" />
                  Go Back
                </Link>
              </>
            );
          }
        })}
      </nav>
    </div>
  );
}
