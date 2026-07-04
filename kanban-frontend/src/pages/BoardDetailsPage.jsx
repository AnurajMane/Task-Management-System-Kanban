import { Link, useParams } from "react-router-dom";

import KanbanColumn from "../features/tasks/components/KanbanColumn";
import { useBoardTasks } from "../features/tasks/hooks/useBoardTasks";

import { useBoard } from "../features/boards/hooks/useBoard";

import { useState } from "react";

import CreateTaskModal from "../features/tasks/components/CreateTaskModal";
import { useCreateTask } from "../features/tasks/hooks/useCreateTask";
import { useUpdateTask } from "../features/tasks/hooks/useUpdateTask";
import { useDeleteTask } from "../features/tasks/hooks/useDeleteTask";
import EditTaskModal from "../features/tasks/components/EditTaskModal";
import { DndContext } from "@dnd-kit/core";
import { useMoveTask } from "../features/tasks/hooks/useMoveTask";
import LoadingSpinner from "../features/boards/components/ui/LoadingSpinner";

function BoardDetailsPage() {
  const { boardId } = useParams();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const {data: board, isLoading: boardLoading, } = useBoard(boardId);

  const {data: tasks, isLoading: tasksLoading, } = useBoardTasks(boardId);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const createTaskMutation = useCreateTask();

  const moveTaskMutation = useMoveTask();

  

  const handleCreateTask = (taskData) => {
    createTaskMutation.mutate({
      boardId,
      taskData,
    });
  };

  

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (taskData) => {
    updateTaskMutation.mutate({
      taskId: selectedTask.id,
      taskData,
    },
  {
    onSuccess: () => {
      setIsEditModalOpen(false);
      setSelectedTask(null);
    }
  });
  };

  const handleDeleteTask = (taskId) => {
    if(window.confirm("Delete task?")){
      deleteTaskMutation.mutate(taskId);
    }
  };

  if (boardLoading || tasksLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <LoadingSpinner/>
        {/* <p className="text-white text-lg">
          Loading board...
        </p> */}
      </div>
    );
  }

  const findTaskById = (id) => {
    const allTasks = [
      ...(tasks?.backlog || []),
      ...(tasks?.readyForDevelopment || []),
      ...(tasks?.inProgress || []),
      ...(tasks?.inReview || []),
      ...(tasks?.blocked || []),
      ...(tasks?.done || []),
    ];

    return allTasks.find(
      (task) => task.id === id
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const task = findTaskById(active.id);

    if (!task) return;

    let targetStatus = over.id;

    let targetPosition = 0;

    const validStatuses = [
      "BACKLOG",
      "READY_FOR_DEVELOPMENT",
      "IN_PROGRESS",
      "IN_REVIEW",
      "BLOCKED",
      "DONE",
    ];

    if (!validStatuses.includes(targetStatus)) {
      const targetTask = findTaskById(over.id);

      if (!targetTask) return;

      targetStatus = targetTask.status;

      targetPosition = targetTask.position;
    }

    moveTaskMutation.mutate({
      taskId: task.id,
      targetStatus,
      targetPosition,
    });
  };


  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() =>
          setIsCreateModalOpen(false)
        }
        onCreate={handleCreateTask}
      />
      <EditTaskModal
          isOpen={isEditModalOpen}
          task={selectedTask}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateTask}
      />
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            to="/dashboard"
            className="text-slate-400 hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-white">
            {board?.name}
          </h1>

          <p className="mt-2 text-slate-400">
            {board?.description || "No description"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 px-4 py-3">
          <p className="text-sm text-slate-400">
            Total Tasks
          </p>

          <p className="text-2xl font-bold text-white">
            {
              (tasks?.backlog?.length || 0) +
              (tasks?.readyForDevelopment?.length || 0) +
              (tasks?.inProgress?.length || 0) +
              (tasks?.inReview?.length || 0) +
              (tasks?.blocked?.length || 0) +
              (tasks?.done?.length || 0)
            }
          </p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
      {/* Kanban Columns */}
        <DndContext
            onDragEnd={
              handleDragEnd
            }
          >
        <div className="grid gap-4 xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <KanbanColumn
            title="BACKLOG"
            tasks={tasks?.backlog || []}
            columnId="BACKLOG"
            onAddTask={() => setIsCreateModalOpen(true)}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <KanbanColumn
            title="READY FOR DEVELOPMENT"
            tasks={tasks?.readyForDevelopment || []}
            columnId="READY_FOR_DEVELOPMENT"
            onAddTask={() => setIsCreateModalOpen(true)}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <KanbanColumn
            title="IN PROGRESS"
            tasks={tasks?.inProgress || []}
            columnId="IN_PROGRESS"
            onAddTask={() => setIsCreateModalOpen(true)}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <KanbanColumn
            title="IN REVIEW"
            tasks={tasks?.inReview || []}
            columnId="IN_REVIEW"
            onAddTask={() => setIsCreateModalOpen(true)}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <KanbanColumn
            title="BLOCKED"
            tasks={tasks?.blocked || []}
            columnId="BLOCKED"
            onAddTask={() => setIsCreateModalOpen(true)}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <KanbanColumn
            title="DONE"
            tasks={tasks?.done || []}
            columnId="DONE"
            onAddTask={() => setIsCreateModalOpen(true)}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
        </DndContext>
      </div>
    </div>
  );
  
}

export default BoardDetailsPage;