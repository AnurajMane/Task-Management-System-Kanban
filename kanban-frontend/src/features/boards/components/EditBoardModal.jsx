import { useState, useEffect } from "react";
import { FiX, FiFolder, FiFileText } from "react-icons/fi";
import { useUpdateBoard } from "../hooks/useUpdateBoard";

function EditBoardModal({ isOpen, board, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const updateBoardMutation = useUpdateBoard();
  const isUpdating = updateBoardMutation.isLoading; // Safely intercept loading states

  useEffect(() => {
    if (board) {
      setName(board.name);
      setDescription(board.description || "");
    }
  }, [board]);

  if (!isOpen || !board) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateBoardMutation.mutate(
      {
        boardId: board.id,
        boardData: {
          name: name.trim(),
          description: description.trim(),
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-sm animate-fade-in">
      {/* Modal Card Box */}
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/40 relative">
        
        {/* Top Close Button Trigger */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 p-1 transition-colors"
          aria-label="Close modal"
        >
          <FiX className="text-lg" />
        </button>

        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white tracking-tight">
            Edit Workspace Settings
          </h2>
          <p className="mt-1 text-xs text-zinc-400">
            Update your board details and description settings below.
          </p>
        </div>

        {/* Input Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Board Title Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 block">
              Board Title
            </label>
            <div className="relative flex items-center rounded-lg border border-zinc-800 bg-zinc-950/50 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-zinc-950 focus-within:ring-1 focus-within:ring-indigo-500/30">
              <FiFolder className="absolute left-3.5 text-zinc-500 text-sm pointer-events-none" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-600 outline-none transition-all"
                placeholder="Enter board name"
              />
            </div>
          </div>

          {/* Description Textarea Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 block">
              Description
            </label>
            <div className="relative flex items-start rounded-lg border border-zinc-800 bg-zinc-950/50 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-zinc-950 focus-within:ring-1 focus-within:ring-indigo-500/30">
              <FiFileText className="absolute left-3.5 top-3 text-zinc-500 text-sm pointer-events-none" />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-transparent pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-600 outline-none transition-all resize-none"
                placeholder="Provide a short breakdown description for your team members..."
              />
            </div>
          </div>

          {/* Action Footer Controls */}
          <div className="mt-6 flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              disabled={isUpdating}
              onClick={onClose}
              className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdating || !name.trim()}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Saving changes..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditBoardModal;