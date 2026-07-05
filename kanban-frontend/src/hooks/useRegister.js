import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../features/auth/api/authApi";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};