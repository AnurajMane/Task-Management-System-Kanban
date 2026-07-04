import { useMutation, useQueryClient } from "@tanstack/react-query";
import {updateBoard } from "../api/boardApi";
import toast from "react-hot-toast";

export const useUpdateBoard = () => {
  const queryClient = useQueryClient(); //useQueryClient is a hook in react query, which provides central cache holding all data which is fetch from server or backend


  //useQuery == GET for fetching data
  //useMutation == POST, PUT, DELETE for changing data
  return useMutation({
    mutationFn: ({boardId, boardData}) => updateBoard(boardId, boardData), //mutationFn tells the trigger that which function should run
                            //createBoard is function inside ../api/boardApi which can have type POST/PUT/DELETE
    //onSuccess is a callback function that will run only after createBoard() execute successfully
    onSuccess: () => {
      
      queryClient.invalidateQueries({ //it is used to invalidate the cached data because after successfull execution of createBoard(), the new data is added
        queryKey: ["boards"], //"board" is the the name of cached storage in react query
      });
      toast.success("Board updated successfully");
    },
    onError: () => {
      toast.error("Failed to update board");
    },
  });
};