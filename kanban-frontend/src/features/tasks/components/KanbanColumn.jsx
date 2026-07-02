function KanbanColumn({
  title,
  tasks = [],
  onAddTask,
  onEditTask,
  onDeleteTask,
}) {
  return (
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
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="
              rounded-xl
              border
              border-slate-600
              bg-slate-700
              p-4
            "
          >
            <div className="flex justify-between">
              <h3 className="font-semibold text-white">
                {task.title}
              </h3>

              <div className="flex gap-2">
                <button
                  onClick={() => onEditTask(task)}
                  className="text-blue-400 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-red-400 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="mt-2 text-sm text-slate-300">
              {task.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;