import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/_pocketbase/pocketbase";
import { toast } from "sonner";

type Data = any;

const addCategoryBudget = async (data: Data) => {
  return await pb.collection("budget_granulity_category").create(data);
};
const updateCategoryBudgetByid = async ({
  id,
  data,
}: {
  id: string;
  data: Data;
}) => {
  return await pb.collection("budget_granulity_category").update(id, data);
};

const fetchAllCategoryBudget = async () => {
  return await pb.collection("budget_granulity_category").getFullList({
    expand: "category,events, budgeting",
  });
};

const fetchCategoryBudgetByid = async (id: string) => {
  return await pb.collection("budget_granulity_category").getOne(id, {
    expand: "category,events, budgeting",
  });
};
const deleteCategoryBudgetByid = async (id: string) => {
  return await pb.collection("budget_granulity_category").delete(id);
};

// list
export const useCategoryBudget = () => {
  return useQuery({
    queryKey: ["budget_granulity_category"],
    queryFn: fetchAllCategoryBudget,
  });
};
//view
export const useCategoryBudgetByID = (id: string) => {
  return useQuery({
    queryKey: ["budget_granulity_category", id],
    queryFn: () => fetchCategoryBudgetByid(id),
  });
};
//delete
export const useDeleteCategoryBudgetByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategoryBudgetByid(id),
    onSuccess: () => {
      toast.success("Category Budget Deleted");
      queryClient.invalidateQueries({
        queryKey: ["budget_granulity_category"],
      });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};

//Update
export const useUpdateCategoryBudgetByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateCategoryBudgetByid({ id, data }),
    onSuccess: () => {
      toast.success("Category Budget Updated");
      queryClient.invalidateQueries({
        queryKey: ["budget_granulity_category"],
      });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
// Create
export const useAddCategoryBudgetData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategoryBudget,
    onSuccess: () => {
      toast.success("Category Budget Added");
      queryClient.invalidateQueries({
        queryKey: ["budget_granulity_category"],
      });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
