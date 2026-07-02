import { useQuery } from "@tanstack/react-query";
import { getBoardById } from "../api/boardApi";

export const useBoard = (boardId) => {
  //here useQuery() is used because of GET request type
  return useQuery({
    queryKey: ["board", boardId], //store inside react query cache storage as array key="board" val=id
    queryFn: () => getBoardById(boardId),
    enabled: !!boardId, //!! is a JS trick to convert a value into strict boolean true/false, if boardId is undefined/null/empty string "" then its false
        //enabled tells react query  when it is allow to run, if boardId becomes false then query will stay idle
  });
};