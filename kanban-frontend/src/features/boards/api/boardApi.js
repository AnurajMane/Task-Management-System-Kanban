import api from "../../../api/axios"

export const getBoards = async () => {
    const response = await api.get("/boards");
    return response.data;
}

export const createBoard = async (boardData) => {
    const response = await api.post("/boards", boardData);
    return response.data;
}

export const deleteBoard = async (boardId) => {
    await api.delete(`/boards/${boardId}`);
}

export const getBoardById = async (boardId) => {
    const response = await api.get(`/boards/${boardId}`);
    return response.data;
}