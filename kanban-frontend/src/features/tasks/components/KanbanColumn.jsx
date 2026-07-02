import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTaskCard from "./SortableTaskCard";
import DroppableColumn from "./DroppableColumn";

function KanbanColumn({
  title,
  tasks = [],
  columnId,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <DroppableColumn id={columnId}>
    <div className="rounded-xl bg-slate-800 p-4 min-h-[600px]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-white">
          {title}
        </h2>

        <span className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-300">
          {tasks.length}
        </span>
      </div>

      {/* Add Task Button */}
      <button
        onClick={onAddTask}
        className="
          mb-4
          w-full
          rounded-lg
          border
          border-dashed
          border-slate-600
          p-2
          text-sm
          text-slate-400
          hover:border-slate-500
          hover:text-white
          transition
        "
      >
        + Add Task
      </button>

      {/* Tasks */}
      <SortableContext
        items={tasks.map(
          (task) => task.id
        )}
        strategy={
          verticalListSortingStrategy
        }
      >
        <div className="space-y-3">
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              onEditTask={
                onEditTask
              }
              onDeleteTask={
                onDeleteTask
              }
            />
          ))}
        </div>
      </SortableContext>
    </div>
    </DroppableColumn>
  );
}

export default KanbanColumn;