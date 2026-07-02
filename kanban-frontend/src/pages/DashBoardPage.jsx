import BoardCard from "../features/boards/components/BoardCard";
import CreateBoardForm from "../features/boards/components/CreateBoardForm";

import { useBoards } from "../features/boards/hooks/useBoards";
import { useCreateBoard } from "../features/boards/hooks/useCreateBoard";
import { useDeleteBoard } from "../features/boards/hooks/useDeleteBoard";

function DashBoardPage() {
  const { data: boards = [], isLoading } = useBoards();

  const createBoardMutation = useCreateBoard();
  const deleteBoardMutation = useDeleteBoard();

  const handleCreateBoard = (boardData) => {
    createBoardMutation.mutate(boardData);
  };

  const handleDeleteBoard = (boardId) => {
    deleteBoardMutation.mutate(boardId);
  };

  if (isLoading) {
    return (
      <div className="p-8 text-white">
        Loading boards...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-white">
          My Boards
        </h1>

        <CreateBoardForm
          onCreate={handleCreateBoard}
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onDelete={handleDeleteBoard}
            />
          ))}
        </div>

        {boards.length === 0 && (
          <div className="mt-10 text-center text-slate-400">
            No boards found. Create your first board.
          </div>
        )}
      </div>
    </div>
  );
}

export default DashBoardPage;