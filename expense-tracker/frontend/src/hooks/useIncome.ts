import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/_pocketbase/pocketbase";
import { toast } from "sonner";

type Data = any;

const addIncome = async (data: Data) => {
  return await pb.collection("income").create(data);
};
const updateIncomeByid = async ({ id, data }: { id: string; data: Data }) => {
  return await pb.collection("income").update(id, data);
};

const fetchAllIncome = async (filterOption: string) => {
  return await pb.collection("income").getFullList({
    expand: "units,transaction_method,category,events",
    filter: filterOption,
  });
};

const fetchIncomeByid = async (id: string) => {
  return await pb.collection("income").getOne(id);
};
const deleteIncomeByid = async (id: string) => {
  return await pb.collection("income").delete(id);
};

// list
export const useIncome = (filterOption: string) => {
  return useQuery({
    queryKey: ["income", `${filterOption}`],
    queryFn: () => fetchAllIncome(filterOption),
  });
};
//view
export const useIncomeByID = (id: string) => {
  return useQuery({
    queryKey: ["income", id],
    queryFn: () => fetchIncomeByid(id),
  });
};
//delete
export const useDeleteIncomeByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteIncomeByid(id),
    onSuccess: () => {
      toast.success("Income Deleted");
      queryClient.invalidateQueries({ queryKey: ["income"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};

//Update
export const useUpdateIncomeByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateIncomeByid({ id, data }),
    onSuccess: () => {
      toast.success("Income Updated");
      queryClient.invalidateQueries({ queryKey: ["income"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
// Create
export const useAddIncomeData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addIncome,
    onSuccess: () => {
      toast.success("Income Added");
      queryClient.invalidateQueries({ queryKey: ["income"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(`${error}`);
    },
  });
};
