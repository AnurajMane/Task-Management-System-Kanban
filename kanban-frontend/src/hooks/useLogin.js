import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../features/auth/api/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};