function ConfirmModal({isOpen, title, message, onConfirm, onCancel}){
    if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-slate-800 p-6">
        <h2 className="text-xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-3 text-slate-300">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg bg-slate-700 px-4 py-2 text-white"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;