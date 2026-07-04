import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/taskApi";

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : createTask,

        onSuccess : (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["tasks", variables.boardId],
            });
            toast.success("Task created successfully");
        },
        onError: () => {
            toast.error("Failed to create task");
        },
    });
};