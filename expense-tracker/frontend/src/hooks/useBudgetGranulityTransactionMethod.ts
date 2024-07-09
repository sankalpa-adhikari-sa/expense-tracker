import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/_pocketbase/pocketbase";
import { toast } from "sonner";

type Data = any;

const addTransactionMethodBudget = async (data: Data) => {
  return await pb
    .collection("budget_granulity_transaction_method")
    .create(data);
};
const updateTransactionMethodBudgetByid = async ({
  id,
  data,
}: {
  id: string;
  data: Data;
}) => {
  return await pb
    .collection("budget_granulity_transaction_method")
    .update(id, data);
};

const fetchAllTransactionMethodBudget = async () => {
  return await pb
    .collection("budget_granulity_transaction_method")
    .getFullList({
      expand: "transaction_method,events, budgeting",
    });
};

const fetchTransactionMethodBudgetByid = async (id: string) => {
  return await pb.collection("budget_granulity_transaction_method").getOne(id, {
    expand: "transaction_method,events, budgeting",
  });
};
const deleteTransactionMethodBudgetByid = async (id: string) => {
  return await pb.collection("budget_granulity_transaction_method").delete(id);
};

// list
export const useTransactionMethodBudget = () => {
  return useQuery({
    queryKey: ["budget_granulity_transaction_method"],
    queryFn: fetchAllTransactionMethodBudget,
  });
};
//view
export const useTransactionMethodBudgetByID = (id: string) => {
  return useQuery({
    queryKey: ["budget_granulity_transaction_method", id],
    queryFn: () => fetchTransactionMethodBudgetByid(id),
  });
};
//delete
export const useDeleteTransactionMethodBudgetByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTransactionMethodBudgetByid(id),
    onSuccess: () => {
      toast.success("Transaction Method Budget Deleted");
      queryClient.invalidateQueries({
        queryKey: ["budget_granulity_transaction_method"],
      });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};

//Update
export const useUpdateTransactionMethodBudgetByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateTransactionMethodBudgetByid({ id, data }),
    onSuccess: () => {
      toast.success("Transaction Method Budget Updated");
      queryClient.invalidateQueries({
        queryKey: ["budget_granulity_transaction_method"],
      });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
// Create
export const useAddTransactionMethodBudgetData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTransactionMethodBudget,
    onSuccess: () => {
      toast.success("Transaction Method Budget Added");
      queryClient.invalidateQueries({
        queryKey: ["budget_granulity_transaction_method"],
      });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
