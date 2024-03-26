import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/_pocketbase/pocketbase";
import { toast } from "sonner";
type Data = any;

const addCategory = async (data: Data) => {
  return await pb.collection("category").create(data);
};
const updateCategoryByid = async ({ id, data }: { id: string; data: Data }) => {
  return await pb.collection("category").update(id, data);
};

const fetchAllCategory = async (filterOption: string) => {
  return await pb.collection("category").getFullList({
    filter: filterOption,
  });
};
const fetchCategoryByid = async (id: string) => {
  return await pb.collection("category").getOne(id);
};
const deleteCategoryByid = async (id: string) => {
  return await pb.collection("category").delete(id);
};

// list
export const useCategory = (filterOption: string) => {
  return useQuery({
    queryKey: ["category", `${filterOption}`],
    queryFn: () => fetchAllCategory(filterOption),
  });
};
//view
export const useCategoryByID = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategoryByid(id),
  });
};
//delete
export const useDeleteCategoryByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategoryByid(id),
    onSuccess: () => {
      toast.success("Category Deleted");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};

//Update
export const useUpdateCategoryByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateCategoryByid({ id, data }),
    onSuccess: () => {
      toast.success("Category Updated");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
// Create
export const useAddCategoryData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      toast.success("Category Added");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
