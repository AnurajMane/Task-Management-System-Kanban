import api from "../../../api/axios"

export const getBoardTask = async (boardId) => {
    const response = await api.get(
        `/boards/${boardId}/tasks`
    );
    return response.data;
}

export const createTask = async ({boardId, taskData,}) => {
  const response = await api.post(
    `/boards/${boardId}/tasks`,
    taskData
  );

  return response.data;
};

export const updateTask = async ({taskId, taskData, }) => {
  const response = await api.put(
    `/tasks/${taskId}`,
    taskData
  );

  return response.data;
};

export const deleteTask = async (taskId) => {
  await api.delete(
    `/tasks/${taskId}`
  );
};

export const moveTask = async ({taskId, targetStatus, targetPosition,}) => {
  const response = await api.patch(`/tasks/${taskId}/move`,
    {targetStatus, targetPosition, }
  );
  return response.data;
};