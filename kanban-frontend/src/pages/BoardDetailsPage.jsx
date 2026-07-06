import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { FiSearch, FiLogOut, FiArrowLeft, FiCheckSquare } from "react-icons/fi";

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
import ConfirmModal from "../features/boards/components/ui/ConfirmModel";
//footer
import { Footer } from "../components/ui/Footer";
//logout
import { useAuth } from "../hooks/useAuth";

function BoardDetailsPage() {
  const { boardId } = useParams();

  //logout
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("BACKLOG");
  const [searchQuery, setSearchQuery] = useState("");

  const [taskToDelete, setTaskToDelete] = useState(null);

  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const createTaskMutation = useCreateTask();
  const moveTaskMutation = useMoveTask();

  const { data: board, isLoading: boardLoading } = useBoard(boardId);
  const { data: tasks, isLoading: tasksLoading } = useBoardTasks(boardId);

  // Handle Logout Action
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Helper to clean up filtering matches
  const filterTaskArray = (array = []) => {
    if (!searchQuery.trim()) return array;
    const query = searchQuery.toLowerCase();
    return array.filter(
      (task) =>
        task.title?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
    );
  };

  //  filter individual column data pools based on user inputs
  const displayedTasks = {
    backlog: filterTaskArray(tasks?.backlog),
    readyForDevelopment: filterTaskArray(tasks?.readyForDevelopment),
    inProgress: filterTaskArray(tasks?.inProgress),
    inReview: filterTaskArray(tasks?.inReview),
    blocked: filterTaskArray(tasks?.blocked),
    done: filterTaskArray(tasks?.done),
  };

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

  
  // const handleDeleteTask = (taskId) => {
  //   if (false) {
  //     deleteTaskMutation.mutate(taskId);
  //   }
  // };
  const handleDeleteTask = (taskId) => {
    setTaskToDelete(taskId); // This opens the modal
  };

  // const handleConfirmDelete = () => {
  //   if (taskToDelete) {
  //     deleteTaskMutation.mutate(taskToDelete, {
  //       onSuccess: () => {
  //         setTaskToDelete(null); // Clean up state after successful deletion
  //       }
  //     });
  //   }
  // };
  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTaskMutation.mutate(taskToDelete, {
        onSuccess: () => {
          setTaskToDelete(null); // Closes modal
        },
      });
    }
  };
  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  // Counts
  const totalTasksCount = [
    tasks?.backlog,
    tasks?.readyForDevelopment,
    tasks?.inProgress,
    tasks?.inReview,
    tasks?.blocked,
    tasks?.done,
  ].reduce((acc, col) => acc + (col?.length || 0), 0);

  const activeMatchesCount = [
    displayedTasks.backlog,
    displayedTasks.readyForDevelopment,
    displayedTasks.inProgress,
    displayedTasks.inReview,
    displayedTasks.blocked,
    displayedTasks.done,
  ].reduce((acc, col) => acc + col.length, 0);

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

      <div className="mx-auto max-w-[1600px] px-6 py-8">
        
        <div className="mb-8 border-b border-zinc-800/60 pb-6 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-indigo-400"
            >
              <FiArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" />
              Back to Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-red-500 text-black px-3 py-1.5 text-xs font-medium transition hover:bg-red-800 hover:text-white-200 focus:outline-none focus:ring-2 focus:ring-zinc-700"
            >
              <FiLogOut className="text-sm text-black" />
              Sign out
            </button>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-1.5 max-w-sm w-full">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-indigo-400 uppercase">
                Active Workspace
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl truncate">
                {board?.name || "Untitled Board"}
              </h1>
              <p className="text-sm text-zinc-400 leading-relaxed line-clamp-1">
                {board?.description || "No workspace description compiled."}
              </p>
            </div>

            {/* Functional Search input */}
            <div className="relative flex max-w-md flex-1 items-center w-full lg:mx-4">
              <FiSearch className="absolute left-3.5 text-zinc-500 text-sm pointer-events-none" />
              <input
                type="text"
                placeholder="Filter tasks by title or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/40 pl-10 pr-10 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition duration-200 focus:border-indigo-500 focus:bg-zinc-900"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="inline-flex items-center gap-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 pl-4 pr-6 py-2.5 self-start lg:self-auto shadow-sm shadow-zinc-950/20 whitespace-nowrap">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700/40">
                <FiCheckSquare className="text-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  {searchQuery ? "Matches Found" : "Total Workloads"}
                </span>
                <span className="text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                  {searchQuery ? activeMatchesCount : totalTasksCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <DndContext onDragEnd={handleDragEnd}>
            <div className="flex gap-4 min-w-[1240px] [&>*]:w-80 [&>*]:shrink-0">
              <KanbanColumn
                title="Backlog"
                tasks={displayedTasks.backlog}
                columnId="BACKLOG"
                onAddTask={() => handleAddTask("BACKLOG")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <KanbanColumn
                title="Ready for Dev"
                tasks={displayedTasks.readyForDevelopment}
                columnId="READY_FOR_DEVELOPMENT"
                onAddTask={() => handleAddTask("READY_FOR_DEVELOPMENT")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <KanbanColumn
                title="In Progress"
                tasks={displayedTasks.inProgress}
                columnId="IN_PROGRESS"
                onAddTask={() => handleAddTask("IN_PROGRESS")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <KanbanColumn
                title="In Review"
                tasks={displayedTasks.inReview}
                columnId="IN_REVIEW"
                onAddTask={() => handleAddTask("IN_REVIEW")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <KanbanColumn
                title="Blocked"
                tasks={displayedTasks.blocked}
                columnId="BLOCKED"
                onAddTask={() => handleAddTask("BLOCKED")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />

              <KanbanColumn
                title="Done"
                tasks={displayedTasks.done}
                columnId="DONE"
                onAddTask={() => handleAddTask("DONE")}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </DndContext>
        </div>

        {searchQuery && activeMatchesCount === 0 && (
          <div className="mt-16 text-center py-12 border border-dashed border-zinc-800 rounded-xl max-w-xl mx-auto">
            <h3 className="text-sm font-medium text-zinc-300">No tasks match your query</h3>
            <p className="mt-1 text-xs text-zinc-500">Try adjusting your filters or refining your spelling tokens.</p>
          </div>
        )}
        <Footer/>
      </div>
      <ConfirmModal
        isOpen={Boolean(taskToDelete)} // Opens if taskToDelete has an ID
        title="Delete Task"
        message="Are you certain you wish to execute this deletion? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskToDelete(null)} // Closes modal safely
      />
    </div>
    
  );
}

export default BoardDetailsPage;