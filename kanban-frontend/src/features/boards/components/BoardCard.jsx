import { Link } from "react-router-dom";
import { FiEdit3, FiTrash2, FiExternalLink } from "react-icons/fi";

function BoardCard({ board, onDelete, onEdit }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-sm transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-md">
      
      <div>
        {/* Card Header Frame */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="truncate font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
            {board.name}
          </h3>
          
          {/* Subtle contextual control menu */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
            <button
              type="button"
              onClick={() => onEdit(board)}
              title="Edit Board"
              className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-amber-400 transition-all"
            >
              <FiEdit3 className="text-xs" />
            </button>

            <button
              type="button"
              onClick={() => onDelete(board.id)}
              title="Delete Board"
              className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-red-400 transition-all"
            >
              <FiTrash2 className="text-xs" />
            </button>
          </div>
        </div>

        {/* Board Description */}
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-400">
          {board.description || "No supplemental workspace description provided."}
        </p>
      </div>

      {/* Action Footer Button */}
      <div className="mt-5 border-t border-zinc-800/50 pt-3">
        <Link
          to={`/boards/${board.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          View Workspace
          <FiExternalLink className="text-[10px]" />
        </Link>
      </div>
    </div>
  );
}

export default BoardCard;