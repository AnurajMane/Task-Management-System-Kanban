import { useState } from "react";

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
      className="rounded-xl border border-slate-700 bg-slate-800 p-5"
    >
      <h2 className="mb-4 text-lg font-semibold text-white">
        Create Board
      </h2>

      <input
        type="text"
        placeholder="Board Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3 w-full rounded border border-slate-600 bg-slate-900 p-2 text-white"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-3 w-full rounded border border-slate-600 bg-slate-900 p-2 text-white"
      />

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Create
      </button>
    </form>
  );
}

export default CreateBoardForm;