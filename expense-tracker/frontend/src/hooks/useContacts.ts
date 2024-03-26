import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/_pocketbase/pocketbase";
import { toast } from "sonner";

type Data = any;

const addContacts = async (data: Data) => {
  return await pb.collection("contacts").create(data);
};
const updateContactsByid = async ({ id, data }: { id: string; data: Data }) => {
  return await pb.collection("contacts").update(id, data);
};

const fetchAllContacts = async () => {
  return await pb.collection("contacts").getFullList();
};

const fetchContactsByid = async (id: string) => {
  return await pb.collection("contacts").getOne(id);
};
const deleteContactsByid = async (id: string) => {
  return await pb.collection("contacts").delete(id);
};

// list
export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: fetchAllContacts,
  });
};
//view
export const useContactsByID = (id: string) => {
  return useQuery({
    queryKey: ["contacts", id],
    queryFn: () => fetchContactsByid(id),
  });
};
//delete
export const useDeleteContactsByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContactsByid(id),
    onSuccess: () => {
      toast.success("Contacts Deleted");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};

//Update
export const useUpdateContactsByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateContactsByid({ id, data }),
    onSuccess: () => {
      toast.success("Contacts Updated");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
// Create
export const useAddContactsData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addContacts,
    onSuccess: () => {
      toast.success("Contacts Added");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
