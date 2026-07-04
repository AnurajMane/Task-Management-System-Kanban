import {useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import { FiEdit2, FiTrash2 } from "react-icons/fi"
import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function SortableTaskCard({task, onEditTask, onDeleteTask, }){

    const {attributes, listeners, setNodeRef, transform, transition, } = useSortable({id: task.id, });

    const style = {
        transform:
            CSS.Transform.toString(
                transform
            ),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="cursor-grab rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-sm transition hover:border-slate-500 hover:shadow-md">

            <div className="flex w-full justify-between items-center">
                <div className="border-b border-slate-700 pb-1">
                    <span className="text-xs text-slate-500">
                        Task #{task.id}
                    </span>
                </div>

                <div className="flex gap-2 shrink-0">
                    <button
                        onClick={() => onEditTask(task)}
                        className="rounded-md p-1.5 text-cyan-400 hover:bg-slate-700 hover:text-cyan-300 transition">
                        <FiEdit2 size={16} />
                    </button>

                    <button
                        onClick={() => onDeleteTask(task.id)}
                        className="rounded-md p-1.5 text-cyan-400 hover:bg-slate-700 hover:text-cyan-300 transition">
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </div>
            <div className="mt-2 flex items-start justify-between gap-2">
                <h3 className="font-semibold text-white break-all text-lg">
                    {task.title}
                </h3>
            </div>

            <p className="mt-3 text-sm text-slate-400 break-all">
                {task.description || "No description!"}
            </p>
        </div>
    );
}

export default SortableTaskCard;