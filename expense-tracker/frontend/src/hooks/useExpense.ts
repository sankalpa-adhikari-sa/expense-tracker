import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/_pocketbase/pocketbase";
import { toast } from "sonner";

type Data = any;

const addExpense = async (data: Data) => {
  return await pb.collection("expense").create(data);
};
const updateExpenseByid = async ({ id, data }: { id: string; data: Data }) => {
  return await pb.collection("expense").update(id, data);
};

const fetchAllExpense = async (filterOption: string) => {
  return await pb.collection("expense").getFullList({
    expand: "units,transaction_method,category",
    filter: filterOption,
  });
};
const fetchExpenseByid = async (id: string) => {
  return await pb.collection("expense").getOne(id);
};
const deleteExpenseByid = async (id: string) => {
  return await pb.collection("expense").delete(id);
};

// list
export const useExpense = (filterOption: string) => {
  return useQuery({
    queryKey: ["expense", `${filterOption}`],
    queryFn: () => fetchAllExpense(filterOption),
  });
};

//view
export const useExpenseByID = (id: string) => {
  return useQuery({
    queryKey: ["expense", id],
    queryFn: () => fetchExpenseByid(id),
  });
};
//delete
export const useDeleteExpenseByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExpenseByid(id),
    onSuccess: () => {
      toast.success("expense Deleted");
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};

//Update
export const useUpdateExpenseByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateExpenseByid({ id, data }),
    onSuccess: () => {
      toast.success("expense Updated");
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
// Create
export const useAddExpenseData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      toast.success("expense Added");
      // queryClient.setQueryData(["expense"], (oldQueryData: any[]) => {
      //   return oldQueryData.concat({
      //     ...data,
      //   });
      // });
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
