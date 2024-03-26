import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "@/_pocketbase/pocketbase";
import { toast } from "sonner";

type Data = any;

const addPosts = async (data: Data) => {
  return await pb.collection("posts").create(data);
};
const updatePostsByid = async ({ id, data }: { id: string; data: Data }) => {
  return await pb.collection("posts").update(id, data);
};

const fetchAllPosts = async () => {
  return await pb.collection("posts").getFullList();
};

const fetchPostsByid = async (id: string) => {
  return await pb.collection("posts").getOne(id);
};
const deletePostsByid = async (id: string) => {
  return await pb.collection("posts").delete(id);
};

// list
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchAllPosts,
  });
};
//view
export const usePostsByID = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostsByid(id),
  });
};
//delete
export const useDeletePostsByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePostsByid(id),
    onSuccess: () => {
      toast.success("Posts Deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};

//Update
export const useUpdatePostsByID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Data }) =>
      updatePostsByid({ id, data }),
    onSuccess: () => {
      toast.success("Posts Updated");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
// Create
export const useAddPostsData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPosts,
    onSuccess: () => {
      toast.success("Posts Added");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
};
