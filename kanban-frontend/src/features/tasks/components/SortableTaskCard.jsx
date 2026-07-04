import {useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiMoreVertical } from "react-icons/fi";
import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const getDueDateStatus = (dueDate) => {
    if (!dueDate) return "NONE";
    const today = new Date();

  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);

  due.setHours(0, 0, 0, 0);

  if (due.getTime() < today.getTime()) {
    return "OVERDUE";
  }

  if (due.getTime() === today.getTime()) {
    return "TODAY";
  }
  return "UPCOMING";
};

const getDueDateStyles = (
  status
) => {
  switch (status) {
    case "OVERDUE":
      return {
        dot: "bg-red-500",
        text: "text-red-400",
      };

    case "TODAY":
      return {
        dot: "bg-yellow-400",
        text: "text-yellow-400",
      };

    case "UPCOMING":
      return {
        dot: "bg-cyan-400",
        text: "text-cyan-400",
      };

    default:
      return {
        dot: "bg-slate-500",
        text: "text-slate-500",
      };
  }
};

const getPriorityStyles = (
  priority
) => {
    // console.log(priority)
  switch (priority) {
    case "HIGH":
      return {
        dot: "bg-red-500",
        text: "text-red-400",
        badge: "bg-red-500/10 text-red-400",
      };

    case "MEDIUM":
      return {
        dot: "bg-yellow-400",
        text: "text-yellow-400",
        badge: "bg-yellow-500/10 text-yellow-400",
      };

    case "LOW":
      return {
        dot: "bg-cyan-400",
        text: "text-cyan-400",
        badge: "bg-cyan-500/10 text-cyan-400",
      };

    default:
      return {
        dot: "bg-slate-500",
        text: "text-slate-500",
        badge: "bg-slate-500/10 text-slate-400",
      };
  }
};

function SortableTaskCard({task, onEditTask, onDeleteTask, }){

    const {attributes, listeners, setNodeRef, transform, transition, } = useSortable({id: task.id, });
    const dueStatus = getDueDateStatus(task.dueDate);
    const dueStyles = getDueDateStyles(dueStatus);
    const priorityStyles = getPriorityStyles(task.priority);
    // console.log(priorityStyles);

//     console.log(
//   task.title,
//   task.priority
// );

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
            className="rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-sm transition hover:border-slate-500 hover:shadow-md"
        >
            
            

            <div className="border-b border-slate-700 flex w-full items-center justify-between gap-4">
    
                {/* Left Side: Priority Pulse Dot (Fixed Width) */}
                <div className="inline-flex gap-2 animate-fade-in shrink-0">
                    <span className="inline-flex items-center rounded-full text-sm text-slate-500">
                        <span className={`h-2 w-4 animate-pulse rounded-full ${priorityStyles.dot}`}/>
                    </span>
                    <div className="pb-1">
                        <span className="text-xs text-slate-500">
                            Task #{task.id}
                        </span>
                    </div>
                </div>
                
                {/* Right Side: Action Buttons (Fixed Width) */}
                <div className="flex shrink-0 items-center gap-2">
                    <div
                        {...attributes}
                        {...listeners}
                        className="
                            cursor-grab
                            rounded-md
                            p-1.5
                            text-slate-500
                            transition
                            hover:bg-slate-700
                            hover:text-slate-300
                        "
                        title="Drag Task"
                    >
                        ⋮⋮
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditTask(task);
                        }}
                        className="rounded-md p-1.5 text-cyan-400 transition hover:bg-slate-700 hover:text-cyan-300">
                        <FiEdit2 size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteTask(task.id);
                        }}
                        className="rounded-md p-1.5 text-cyan-400 transition hover:bg-slate-700 hover:text-cyan-300">
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="mt-2 flex items-start justify-between gap-2">
                <h3 className="font-semibold text-white break-all text-lg">
                    {task.title}
                </h3>
            </div>

            <p className="mt-3 text-sm text-slate-400 break-all pb-2">
                {task.description || "No description!"}
            </p>
            <div className="border-t border-slate-800 pt-2 flex flex-1 items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${dueStyles.dot}`}/>
                    <div className="rounded-md bg-slate-800 px-2 py-1">
                    <span className={`text-xs font-medium ${dueStyles.text}`}>
                        {task.dueDate? `Due: ${new Date(task.dueDate).toLocaleDateString("en-US", {month: "short", day: "numeric",})}`: "No due date"}
                    </span>
                </div>
                {/* You can freely add or remove more items here, and they will stay in the middle */}
            </div>
        </div>
    );
}

export default SortableTaskCard;