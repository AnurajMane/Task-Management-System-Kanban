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
        <p className="text-white text-lg">
          Loading board...
        </p>
      </div>
    );
  }

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
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="text-slate-400 hover:text-white transition"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-white">
          {board?.name}
        </h1>

        <p className="mt-2 text-slate-400">
          {board?.description || "No description available"}
        </p>
      </div>

      {/* Kanban Columns */}
      <div className="grid gap-4 xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <KanbanColumn
          title="BACKLOG"
          tasks={tasks?.backlog || []}
          onAddTask={() => setIsCreateModalOpen(true)}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />

        <KanbanColumn
          title="READY FOR DEVELOPMENT"
          tasks={tasks?.readyForDevelopment || []}
          onAddTask={() => {}}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />

        <KanbanColumn
          title="IN PROGRESS"
          tasks={tasks?.inProgress || []}
          onAddTask={() => {}}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />

        <KanbanColumn
          title="IN REVIEW"
          tasks={tasks?.inReview || []}
          onAddTask={() => {}}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />

        <KanbanColumn
          title="BLOCKED"
          tasks={tasks?.blocked || []}
          onAddTask={() => {}}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />

        <KanbanColumn
          title="DONE"
          tasks={tasks?.done || []}
          onAddTask={() => {}}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
  
}

export default BoardDetailsPage;