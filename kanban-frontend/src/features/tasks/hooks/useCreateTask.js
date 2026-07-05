import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/taskApi";
import toast from "react-hot-toast";

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : createTask,

        onSuccess : (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["tasks", String(variables.boardId)],
            });
            queryClient.invalidateQueries({
            queryKey: ["board", String(variables.boardId)],
            });
            toast.success("Task created successfully");
        },
        onError: () => {
            toast.error("Failed to create task");
        },
    });
};