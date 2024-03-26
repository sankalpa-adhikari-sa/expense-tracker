import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/_pocketbase/pocketbase";
import { toast } from "sonner";

type Data = any;

const addEvents = async (data: Data) => {
  return await pb.collection("events").create(data);
};
const updateEventsByid = async ({ id, data }: { id: string; data: Data }) => {
  return await pb.collection("events").update(id, data);
};

const fetchAllEvents = async () => {
  return await pb.collection("events").getFullList();
};

const fetchEventsByid = async (id: string) => {
  return await pb.collection("events").getOne(id);
};
const deleteEventsByid = async (id: string) => {
  return await pb.collection("events").delete(id);
};

// list
export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchAllEvents,
  });
};
//view
export const useEventsByID = (id: string) => {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => fetchEventsByid(id),
  });
};
//delete
export const useDeleteEventsByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEventsByid(id),
    onSuccess: () => {
      toast.success("Events Deleted");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};

//Update
export const useUpdateEventsByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateEventsByid({ id, data }),
    onSuccess: () => {
      toast.success("Events Updated");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
// Create
export const useAddEventsData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addEvents,
    onSuccess: () => {
      toast.success("Events Added");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
