import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../api/boardApi";
import toast from "react-hot-toast";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoard,

    onSuccess: () => {
      toast.success("Board deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
    },
    onError: () => {
      toast.error("Failed to delete board");
    },
  });
};