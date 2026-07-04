import { useState } from "react"

function CreateTaskModal({
    isOpen, onClose, onCreate,
}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("NO_PRIORITY");

    if(!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log({
        //   title,
        //   description,
        //   dueDate,
        // });

        onCreate({title, description, dueDate, priority});

        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("");
        onClose();
    };

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-slate-800 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">
          Create Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded bg-slate-700 p-3 text-white"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full rounded bg-slate-700 p-3 text-white"
            rows={4}
          />
          {/* due date */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
            />
          </div>
          <div>
          <label className="mb-2 block text-sm text-slate-300">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="w-full rounded-lg bg-slate-800 p-2 text-white"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-slate-600 px-4 py-2 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;