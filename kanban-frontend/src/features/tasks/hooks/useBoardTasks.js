import { useQuery } from "@tanstack/react-query"
import { getBoardTask } from "../api/taskApi"

export const useBoardTasks = (boardId) => {
    return useQuery({
        queryKey:["tasks", boardId],
        queryFn: () => getBoardTask(boardId),
        enabled: !!boardId
    })
}