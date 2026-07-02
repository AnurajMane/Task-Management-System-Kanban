import { Link } from "react-router-dom"

function BoardCard({board, onDelete}){
    return(
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5 shadow">
            <div className="flex item-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        {board.name}
                    </h3>
                    <p className="mt-2 test-sm text-slate-400">
                        {board.description || "No description"}
                    </p>
                </div>
                <button onClick={() => onDelete(boardId)} className="text-red-400 hover:text-red-300">
                    Delete
                </button>
            </div>
            <Link to={`/boards/${board.id}`} className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300">
                Open Board →
            </Link>
        </div>
    );
}

export default BoardCard;