"use client";
import { useMutation } from "@tanstack/react-query";
import pb from "@/_pocketbase/pocketbase";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
type Data = any;

const addUser = async (data: Data) => {
  return await pb.collection("users").create(data);
};
const addAdmin = async (data: Data) => {
  return await pb.admins.create({
    email: data.email,
    password: data.password,
    passwordConfirm: data.passwordConfirm,
  });
};
const loginAdmin = async (data: Data) => {
  return pb.admins.authWithPassword(data.email, data.password);
};

const loginUser = async (data: Data) => {
  return await pb
    .collection("users")
    .authWithPassword(data.email, data.password);
};
export const useAddUserData = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addUser,
    onError: (error) => {
      toast.error(`${error}`);
    },
    onSuccess: () => {
      navigate({ to: "/dashboard" });
      toast.success("Login Success");
    },
  });
};
export const useAddAdminData = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addAdmin,
    onError: (error) => {
      toast.error(`${error}`);
    },
    onSuccess: () => {
      navigate({ to: "/dashboard" });
      toast.success("Admin Login Success");
    },
  });
};
export const useLoginUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      toast.error(`${error}`);
    },
    onSuccess: () => {
      navigate({ to: "/dashboard" });
      toast.success("Login Success");
    },
  });
};
export const useLoginAdmin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginAdmin,
    onError: (error) => {
      toast.error(`${error}`);
    },
    onSuccess: () => {
      navigate({ to: "/dashboard" });
      toast.success("Admin Login Success");
    },
  });
};
