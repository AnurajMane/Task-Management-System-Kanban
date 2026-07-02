import {useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableTaskCard({task, onEditTask, onDeleteTask, }){

    const {attibutes, listeners, setNodeRef, transform, transition, } = useSortable({id: task.id, });

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
            {...attibutes}
            {...listeners}
            className="rounded-xl border border-slate-600 bg-slate-700 p-4 cursor-grab">
            <div className="flex justify-between">
                <h3 className="font-semibold text-white">
                    {task.title}
                </h3>
                <div className="flex gap-2">
                    <button onClick={() => onEditTask(task)} className="text-blue-400 text-sm">
                        Edit
                    </button>
                    <button onClick={() => onDeleteTask(task.id)} className="text-red-400 text-sm">
                        Delete
                    </button>
                </div>
            </div>
            <p className="mt-2 text-sm text-slate-300">
                {task.description}
            </p>
        </div>
    );
}

export default SortableTaskCard;