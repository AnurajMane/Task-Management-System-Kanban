import { useState } from "react";
import { FiPlus, FiFileText, FiFolder } from "react-icons/fi";

function CreateBoardForm({ onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    onCreate({
      name,
      description,
    });

    setName("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/20 backdrop-blur-sm"
    >
      {/* Header section with clean visual weight */}
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700/60">
          <FiPlus className="text-sm" />
        </div>
        <h2 className="text-sm font-semibold text-zinc-200 tracking-tight">
          Create New Board
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3 md:items-start">
        
        {/* Board Name Input Block */}
        <div className="space-y-1.5 md:col-span-1">
          <label className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 block">
            Board Title
          </label>
          <div className="relative flex items-center rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-zinc-900 focus-within:ring-1 focus-within:ring-indigo-500/30">
            <FiFolder className="absolute left-3 text-zinc-500 text-xs pointer-events-none" />
            <input
              type="text"
              required
              placeholder="e.g., Q3 Product Roadmap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent pl-9 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-600 outline-none transition-all"
            />
          </div>
        </div>

        {/* Description Textarea Block */}
        <div className="space-y-1.5 md:col-span-1">
          <label className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 block">
            Brief Description
          </label>
          <div className="relative flex items-center rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-zinc-900 focus-within:ring-1 focus-within:ring-indigo-500/30">
            <FiFileText className="absolute left-3 top-3 text-zinc-500 text-xs pointer-events-none" />
            <textarea
              placeholder="Track feature deliverables..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={1}
              className="w-full bg-transparent pl-9 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-600 outline-none transition-all resize-none min-h-[34px]"
            />
          </div>
        </div>

        {/* Action Button Alignment Block */}
        <div className="md:pt-5 flex items-stretch md:col-span-1">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-[0.98]"
          >
            <FiPlus className="text-sm" />
            Create Board
          </button>
        </div>

      </div>
    </form>
  );
}

export default CreateBoardForm;