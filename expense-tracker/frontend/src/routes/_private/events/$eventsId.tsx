import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { CalendarIcon, BellIcon, HandCoinsIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEventsByID } from "@/hooks/useEvents";
import { format, parseISO } from "date-fns";
import { Currencyformatter } from "@/lib/currencyFormatter";

export const Route = createFileRoute("/_private/events/$eventsId")({
  component: IndvEvents,
  beforeLoad: async ({ params, location }) => {
    redirect({
      to: "/events/$eventsId/dashboard",
      search: {
        redirect: location.href,
      },
      params: { eventsId: params.eventsId },
    });
  },
});
function IndvEvents() {
  const { eventsId } = Route.useParams();
  const navigate = useNavigate({ from: "/events/$eventsId" });
  const { data: EventDetails = [] }: any = useEventsByID(eventsId);
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="w-full flex flex-row justify-between">
            <span>{EventDetails.event_name}</span>
            <span>
              {EventDetails.event_budget
                ? Currencyformatter.format(EventDetails.event_budget)
                : null}
            </span>
          </CardTitle>
          <CardDescription className="flex flex-row justify-between">
            <span className="flex flex-row gap-2 items-center">
              <CalendarIcon className="w-4 h-4" />
              {EventDetails.event_start_date
                ? format(
                    parseISO(EventDetails.event_start_date),
                    "MMMM dd, yyyy"
                  )
                : null}{" "}
              -
              {EventDetails.event_end_date
                ? format(parseISO(EventDetails.event_end_date), "MMMM dd, yyyy")
                : null}
            </span>
            <span>
              <Button className="h-9 w-9" variant="ghost" size="icon">
                <BellIcon className="w-4 h-4" />
              </Button>
              <Button
                className="h-9 w-9"
                variant="ghost"
                size="icon"
                onClick={() =>
                  navigate({
                    to: "/events/$eventsId/budgeting",
                    params: { eventsId: eventsId },
                  })
                }
              >
                <HandCoinsIcon className="w-4 h-4" />
              </Button>
            </span>
          </CardDescription>
        </CardHeader>
        {EventDetails.details ? (
          <CardContent>{EventDetails.details}</CardContent>
        ) : null}
      </Card>

      <Outlet />
    </div>
  );
}
