import BoardCard from "../features/boards/components/BoardCard";
import CreateBoardForm from "../features/boards/components/CreateBoardForm";

import { useBoards } from "../features/boards/hooks/useBoards";
import { useCreateBoard } from "../features/boards/hooks/useCreateBoard";
import { useDeleteBoard } from "../features/boards/hooks/useDeleteBoard";
// import { useUpdateBoard } from "../features/boards/hooks/useUpdateBoard";
//edit board
import { useState } from "react";
import EditBoardModal from "../features/boards/components/EditBoardModal";

//logout
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../features/boards/components/ui/LoadingSpinner";
//for delete popup
import ConfirmModal from "../features/boards/components/ui/ConfirmModel";

function DashBoardPage() {
  const { data: boards = [], isLoading } = useBoards();

  console.log("BOARDS:", boards);
  
  const createBoardMutation = useCreateBoard();
  const deleteBoardMutation = useDeleteBoard();
  
  //edit/update board
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  //delete confirm popup
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);

  //logout
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateBoard = (boardData) => {
    createBoardMutation.mutate(boardData);
  };

  const handleDeleteBoard = (boardId) => {
    // console.log("BOARD ID RECEIVED at DELETE:", boardId);
    // deleteBoardMutation.mutate(boardId);
    setBoardToDelete(boardId);
    setIsDeleteOpen(true);
  };

  const handleEditBoard = (board) => {
    console.log("STEP 1");
    setSelectedBoard(board);
    console.log("STEP 2");
    setIsEditOpen(true);
    console.log("STEP 3")
  };

  //delete function
  const confirmDeleteBoard = () => {
    deleteBoardMutation.mutate(boardToDelete);

    setBoardToDelete(null);
    setIsDeleteOpen(false);
  }

  if (isLoading) {
    return (
      <LoadingSpinner/>
      // <div className="p-8 text-white">
      //   Loading boards...
      // </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            My Boards
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your boards and organize your work efficiently.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>

        <CreateBoardForm
          onCreate={handleCreateBoard}
        />
        

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onDelete={handleDeleteBoard}
              onEdit={handleEditBoard}
            />
          ))}
        </div>

        {boards.length === 0 && (
          <div className="mt-20 text-center">
            <h2 className="text-xl text-white">
              No Boards Yet
            </h2>

            <p className="mt-2 text-slate-400">
              Create your first board to start organizing tasks.
            </p>
          </div>
        )}
        <EditBoardModal
          board={selectedBoard}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
        <ConfirmModal
          isOpen={isDeleteOpen}
          title="Delete Board....!"
          message="Are you sure you want to delete this board? This action cannot be undone....!"
          onConfirm={confirmDeleteBoard}
          onCancel={() => {
            setIsDeleteOpen(false);
            setBoardToDelete(null);
          }}
        />
        <p className="text-white">
          Modal Open: {isEditOpen ? "YES" : "NO"}
        </p>
      </div>
    
  );
}

export default DashBoardPage;