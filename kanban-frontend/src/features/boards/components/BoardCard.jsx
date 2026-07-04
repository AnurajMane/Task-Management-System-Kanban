import { Link } from "react-router-dom"

function BoardCard({board, onDelete, onEdit}){
    // console.log("BOARD CARD RENDERED", {
    //     board,
    //     onDelete,
    //     onEdit,
    // });
    return(
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5 shadow">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        {board.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                        {board.description || "No description"}
                    </p>
                </div>
                <div className="flex gap-4">
                <button
                    onClick={() => {
                        onEdit(board);
                        console.log("EDIT CLICKED");
                    }}
                    className="text-yellow-400 hover:text-yellow-300"
                >
                    Edit
                </button>

                <button
                    onClick={() => {
                        onDelete(board.id);
                        console.log("DELETE CLICKED");
                    }}
                    className="text-red-400 hover:text-red-300"
                >
                    Delete
                </button>
                </div>
            </div>
            <Link to={`/boards/${board.id}`} className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300">
                Open Board →
            </Link>
        </div>
    );
}

export default BoardCard;