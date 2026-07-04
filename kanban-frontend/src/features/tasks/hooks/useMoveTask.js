import {useMutation, useQueryClient} from "@tanstack/react-query";
import { moveTask } from "../api/taskApi";

export const useMoveTask = () => {
    const queryCilent = useQueryClient();

    return useMutation({
        mutationFn: moveTask,

        onSuccess: () => {
            queryCilent.invalidateQueries({
                queryKey: ["tasks"],
            });
            toast.success("Task moved");
        },
    });
};