import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiLogOut, 
  FiSearch, 
  FiGrid, 
  FiCheckCircle, 
  FiClock, 
  FiFolder, 
  FiFolderPlus 
} from "react-icons/fi";
import { Footer } from "../components/ui/Footer";

import BoardCard from "../features/boards/components/BoardCard";
import CreateBoardForm from "../features/boards/components/CreateBoardForm";
import LoadingSpinner from "../features/boards/components/ui/LoadingSpinner";
import EditBoardModal from "../features/boards/components/EditBoardModal";
import ConfirmModal from "../features/boards/components/ui/ConfirmModel";
import DancingLogoInline from "../components/ui/DancingLogoInline";

import { useBoards } from "../features/boards/hooks/useBoards";
import { useCreateBoard } from "../features/boards/hooks/useCreateBoard";
import { useDeleteBoard } from "../features/boards/hooks/useDeleteBoard";
import { useAuth } from "../hooks/useAuth";
import { useDashboardStats } from "../features/dashboard/hooks/useDashboardStats";

function DashBoardPage() {
  const { data: boards = [], isLoading } = useBoards();
  const { data: stats } = useDashboardStats();
  
  const createBoardMutation = useCreateBoard();
  const deleteBoardMutation = useDeleteBoard();
  
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    setBoardToDelete(boardId);
    setIsDeleteOpen(true);
  };

  const handleEditBoard = (board) => {
    setSelectedBoard(board);
    setIsEditOpen(true);
  };

  const confirmDeleteBoard = () => {
    deleteBoardMutation.mutate(boardToDelete);
    setBoardToDelete(null);
    setIsDeleteOpen(false);
  };

  // Modern UI-driven client search filtering
  const filteredBoards = boards.filter((board) =>
    board.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 antialiased selection:bg-indigo-500/30">
      
      {/* Top Application Navbar */}
      <header className="border-b border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-md shadow-indigo-500/10">
              W
            </div>
            <span className="font-semibold tracking-tight text-sm text-zinc-200">Workspace</span>
          </div> */}
          <a href="/dashboard">
            <DancingLogoInline/>
          </a>

          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-red-500 text-black px-3 py-1.5 text-xs font-medium transition hover:bg-red-800 hover:text-white-200 focus:outline-none focus:ring-2 focus:ring-zinc-700"
          >
            <FiLogOut className="text-sm text-black" />
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            My Boards
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400">
            Manage your project workspaces and prioritize deliverables efficiently.
          </p>
        </div>

        {/* Stats Metrics Dashboard Grid */}
        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Boards</span>
              <FiFolder className="text-zinc-500 text-lg" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white">{stats?.totalBoards ?? 0}</p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Tasks</span>
              <FiGrid className="text-zinc-500 text-lg" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white">{stats?.totalTasks ?? 0}</p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Completed</span>
              <FiCheckCircle className="text-emerald-500/80 text-lg" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white">{stats?.completedTasks ?? 0}</p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Pending</span>
              <FiClock className="text-amber-500/80 text-lg" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white">{stats?.pendingTasks ?? 0}</p>
          </div>
        </section>

        {/* Action Controls & Search Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex max-w-md flex-1 items-center">
            <FiSearch className="absolute left-3.5 text-zinc-500 text-sm pointer-events-none" />
            <input
              type="text"
              placeholder="Search boards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition duration-200 focus:border-indigo-500 focus:bg-zinc-900"
            />
          </div>
        </div>

        {/* Structural Workspace Layout */}
        <div className="space-y-8">
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-6">
            <CreateBoardForm onCreate={handleCreateBoard} />
          </div>

          {/* Cards Grid */}
          {filteredBoards.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredBoards.map((board) => (
                <BoardCard
                  key={board.id}
                  board={board}
                  onDelete={handleDeleteBoard}
                  onEdit={handleEditBoard}
                />
              ))}
            </div>
          ) : (
            
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/10 py-20 px-4 text-center animate-fade-in">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 shadow-inner">
                <FiFolderPlus className="text-xl" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-zinc-200">No boards discovered</h3>
              <p className="mt-1 max-w-xs text-xs text-zinc-500">
                {searchQuery ? "Try altering your active filter query parameters." : "Get rolling by establishing your first workspace board block above."}
              </p>
            </div>
          )}
        </div>
        
      </main>
      <Footer/>
      {/* Modals injection */}
      <EditBoardModal
        board={selectedBoard}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
      
      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Workspace Board"
        message="Are you certain you wish to execute this deletion? All data collections mapping directly to this container workspace will be systematically eliminated."
        onConfirm={confirmDeleteBoard}
        onCancel={() => {
          setIsDeleteOpen(false);
          setBoardToDelete(null);
        }}
      />
      
    </div>
  );
}

export default DashBoardPage;