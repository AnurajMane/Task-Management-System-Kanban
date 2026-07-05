import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { FiArrowLeft, FiCheckSquare, FiAlertTriangle } from "react-icons/fi";

import KanbanColumn from "../features/tasks/components/KanbanColumn";
import CreateTaskModal from "../features/tasks/components/CreateTaskModal";
import EditTaskModal from "../features/tasks/components/EditTaskModal";
import LoadingSpinner from "../features/boards/components/ui/LoadingSpinner";

import { useBoardTasks } from "../features/tasks/hooks/useBoardTasks";
import { useBoard } from "../features/boards/hooks/useBoard";
import { useCreateTask } from "../features/tasks/hooks/useCreateTask";
import { useUpdateTask } from "../features/tasks/hooks/useUpdateTask";
import { useDeleteTask } from "../features/tasks/hooks/useDeleteTask";
import { useMoveTask } from "../features/tasks/hooks/useMoveTask";

function BoardDetailsPage() {
  const { boardId } = useParams();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("BACKLOG");

  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const createTaskMutation = useCreateTask();
  const moveTaskMutation = useMoveTask();

  const { data: board, isLoading: boardLoading } = useBoard(boardId);
  const { data: tasks, isLoading: tasksLoading } = useBoardTasks(boardId);

  const handleAddTask = (status) => {
    setSelectedStatus(status);
    setIsCreateModalOpen(true);
  };

  const handleCreateTask = (taskData) => {
    createTaskMutation.mutate({
      boardId: Number(boardId),
      taskData,
      status: selectedStatus,
    });
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (taskData) => {
    updateTaskMutation.mutate(
      { taskId: selectedTask.id, taskData },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        },
      }
    );
  };

  const handleDeleteTask = (taskId) => {
    // Note: In production SaaS, replace this native alert with a custom UI Confirmation modal 
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  const totalTasksCount = [
    tasks?.backlog,
    tasks?.readyForDevelopment,
    tasks?.inProgress,
    tasks?.inReview,
    tasks?.blocked,
    tasks?.done,
  ].reduce((acc, col) => acc + (col?.length || 0), 0);

  if (boardLoading || tasksLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <LoadingSpinner />
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
    return allTasks.find((task) => task.id === id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

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
    <div className="min-h-screen bg-zinc-950 text-zinc-50 antialiased">
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTask}
      />
      <EditTaskModal
        isOpen={isEditModalOpen}
        task={selectedTask}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateTask}
      />

      {/* Main Board Container */}
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        
        {/* Navigation & Header Actions */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/60 pb-6">
          <div>
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-400 transition hover:text-zinc-200"
            >
              <FiArrowLeft className="text-sm transition-transform group-hover:-translate-x-0.5" />
              Back to Dashboard
            </Link>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {board?.name}
            </h1>

            <p className="mt-1 text-sm text-zinc-400 max-w-xl">
              {board?.description || "No workspace description compiled."}
            </p>
          </div>

          {/* Metric Task Box */}
          <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-3.5 self-start sm:self-auto">
            <div className="rounded-lg bg-zinc-800/80 p-2 text-zinc-400">
              <FiCheckSquare className="text-lg" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Total Workloads</p>
              <p className="text-xl font-bold text-white tracking-tight">{totalTasksCount}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Viewport Wrapper for Kanban Board */}
        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <DndContext onDragEnd={handleDragEnd}>
            <div className="flex gap-4 min-w-[1240px] [&>*]:w-80 [&>*]:shrink-0">
              <KanbanColumn
                title="Backlog"
                tasks={tasks?.backlog || []}
                columnId="BACKLOG"
                onAddTask={() => handleAddTask("BACKLOG")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <KanbanColumn
                title="Ready for Dev"
                tasks={tasks?.readyForDevelopment || []}
                columnId="READY_FOR_DEVELOPMENT"
                onAddTask={() => handleAddTask("READY_FOR_DEVELOPMENT")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <KanbanColumn
                title="In Progress"
                tasks={tasks?.inProgress || []}
                columnId="IN_PROGRESS"
                onAddTask={() => handleAddTask("IN_PROGRESS")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <KanbanColumn
                title="In Review"
                tasks={tasks?.inReview || []}
                columnId="IN_REVIEW"
                onAddTask={() => handleAddTask("IN_REVIEW")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <KanbanColumn
                title="Blocked"
                tasks={tasks?.blocked || []}
                columnId="BLOCKED"
                onAddTask={() => handleAddTask("BLOCKED")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <KanbanColumn
                title="Done"
                tasks={tasks?.done || []}
                columnId="DONE"
                onAddTask={() => handleAddTask("DONE")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default BoardDetailsPage;