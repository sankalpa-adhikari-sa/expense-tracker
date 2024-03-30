"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { eventsSchema } from "@/types/type";
import { useAddEventsData, useUpdateEventsByID } from "@/hooks/useEvents";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
export default function EventsForm(props: any) {
  const data = props?.data;
  const isAddMode = !data;

  const formOptions = {
    resolver: zodResolver(eventsSchema),
    defaultValues: {
      event_name: "",
    },
  };
  const { mutate: addEventsData } = useAddEventsData();
  const { mutate: updateEventsData } = useUpdateEventsByID();
  if (!isAddMode) {
    formOptions.defaultValues = {
      ...data,
      event_start_date: parseISO(data.event_start_date),
      event_end_date: parseISO(data.event_end_date),
    };
  }
  const form = useForm<z.infer<typeof eventsSchema>>(formOptions);

  const createEvents = (data: any) => {
    addEventsData(data);
  };
  const updateEvents = (data: any) => {
    updateEventsData({ id: data.id, data: data });
  };
  const onSubmitForm = (data: z.infer<typeof eventsSchema>) => {
    form.reset();
    isAddMode ? createEvents(data) : updateEvents(data);
  };
  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    form.reset();
    form.clearErrors();
  };

  return (
    <Form {...form}>
      <ScrollArea className="h-[80%]">
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="h-full flex flex-col space-y-2 mx-1"
        >
          <FormField
            control={form.control}
            name="event_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="Pasni" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="event_start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="event_end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isAddMode ? "Submit" : "Edit"}</Button>{" "}
          <Button variant="destructive" onClick={handleReset}>
            {" "}
            clear
          </Button>
        </form>
      </ScrollArea>
    </Form>
  );
}
