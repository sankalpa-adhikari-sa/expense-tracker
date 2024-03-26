import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/_pocketbase/pocketbase";
import { toast } from "sonner";

type Data = any;

const addTransactionMethod = async (data: Data) => {
  return await pb.collection("transaction_method").create(data);
};
const updateTransactionMethodByid = async ({
  id,
  data,
}: {
  id: string;
  data: Data;
}) => {
  return await pb.collection("transaction_method").update(id, data);
};

const fetchAllTransactionMethod = async () => {
  return await pb.collection("transaction_method").getFullList();
};

const fetchTransactionMethodByid = async (id: string) => {
  return await pb.collection("transaction_method").getOne(id);
};
const deleteTransactionMethodByid = async (id: string) => {
  return await pb.collection("transaction_method").delete(id);
};

// list
export const useTransactionMethod = () => {
  return useQuery({
    queryKey: ["transaction_method"],
    queryFn: fetchAllTransactionMethod,
  });
};
//view
export const useTransactionMethodByID = (id: string) => {
  return useQuery({
    queryKey: ["transaction_method", id],
    queryFn: () => fetchTransactionMethodByid(id),
  });
};
//delete
export const useDeleteTransactionMethodByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTransactionMethodByid(id),
    onSuccess: () => {
      toast.success("Transaction Method Deleted");
      queryClient.invalidateQueries({ queryKey: ["transaction_method"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};

//Update
export const useUpdateTransactionMethodByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateTransactionMethodByid({ id, data }),
    onSuccess: () => {
      toast.success("Transaction Method Updated");
      queryClient.invalidateQueries({ queryKey: ["transaction_method"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
// Create
export const useAddTransactionMethodData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTransactionMethod,
    onSuccess: () => {
      toast.success("Transaction Method Added");
      queryClient.invalidateQueries({ queryKey: ["transaction_method"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
