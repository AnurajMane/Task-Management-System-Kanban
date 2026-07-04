import { useState, useEffect } from "react";
import { useUpdateBoard } from "../hooks/useUpdateBoard";

function EditBoardModal({
  isOpen,
  board,
  onClose,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const updateBoardMutation =
    useUpdateBoard();

  useEffect(() => {
    if (board) {
      setName(board.name);
      setDescription(
        board.description || ""
      );
    }
  }, [board]);

  if (!isOpen || !board) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    updateBoardMutation.mutate(
      {
        boardId: board.id,
        boardData: {
          name,
          description,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-slate-800 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">
          Edit Board
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-lg border border-slate-600 bg-slate-900 p-3 text-white"
            placeholder="Board Name"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full rounded-lg border border-slate-600 bg-slate-900 p-3 text-white"
            rows="4"
            placeholder="Description"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-600 px-4 py-2 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBoardModal;