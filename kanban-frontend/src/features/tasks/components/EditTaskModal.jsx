import { useState, useEffect } from "react";

function EditTaskModal({isOpen, task, onClose, onUpdate}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(task?.dueDate || "");
    const [priority, setPriority] = useState(task?.priority || "NO_PRIORITY");

    useEffect(() => {
        if(task){
            setTitle(task.title);
            setDescription(task.description || "");
            setDueDate(task?.dueDate || "");
        }
    }, [task]);

    if(!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({title, description});
        // onclose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-xl bg-slate-800 p-6">
                <h2 className="mb-4 text-xl font-bold text-white">
                    Edit Task
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    >
                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                        setTitle(e.target.value)
                        }
                        className="w-full rounded bg-slate-700 p-3 text-white"
                    />

                    <textarea
                        value={description}
                        onChange={(e) =>
                        setDescription(e.target.value)
                        }
                        rows={4}
                        className="w-full rounded bg-slate-700 p-3 text-white"
                        placeholder="Task Description"/>
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
                            className="rounded bg-slate-600 px-4 py-2 text-white">
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 text-white">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTaskModal;