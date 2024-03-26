import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/_pocketbase/pocketbase";
import { toast } from "sonner";

type Data = any;

const addUnits = async (data: Data) => {
  return await pb.collection("units").create(data);
};
const updateUnitsByid = async ({ id, data }: { id: string; data: Data }) => {
  return await pb.collection("units").update(id, data);
};

const fetchAllUnits = async () => {
  return await pb.collection("units").getFullList();
};

const fetchUnitsByid = async (id: string) => {
  return await pb.collection("units").getOne(id);
};
const deleteUnitsByid = async (id: string) => {
  return await pb.collection("units").delete(id);
};

// list
export const useUnits = () => {
  return useQuery({
    queryKey: ["units"],
    queryFn: fetchAllUnits,
  });
};
//view
export const useUnitsByID = (id: string) => {
  return useQuery({
    queryKey: ["units", id],
    queryFn: () => fetchUnitsByid(id),
  });
};
//delete
export const useDeleteUnitsByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUnitsByid(id),
    onSuccess: () => {
      toast("Units Deleted");
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
    onError: (error) => {
      toast(`${error}`);
    },
  });
};

//Update
export const useUpdateUnitsByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updateUnitsByid({ id, data }),
    onSuccess: () => {
      toast("Units Updated");
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
    onError: (error) => {
      toast(`${error}`);
    },
  });
};
// Create
export const useAddUnitsData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUnits,
    onSuccess: (data) => {
      toast("units Added");
      queryClient.setQueryData(["units"], (oldQueryData: any[]) => {
        return oldQueryData.concat({
          ...data,
        });
      });
    },
    onError: (error) => {
      toast(`${error}`);
    },
  });
};
