// components/TaskDeletePopUp.jsx
export default function TaskDeletePopUp({ isOpen, onClose, onDelete, loading, error }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-30 z-40"></div>
      <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-md text-center border-2 border-red-600">
          {loading ? (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">Deleting Task...</h2>
              <p className="mb-4">Please wait while we delete the task.</p>
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 bg-red-600 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </>
          ) : error ? (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Failed</h2>
              <p className="mb-6 text-red-600">There was an error deleting the task. Please try again.</p>
              <button
                onClick={onClose}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
              >
                Close
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">Confirm Delete</h2>
              <p className="mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="border border-red-600 text-red-600 px-6 py-2 rounded hover:bg-red-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={onDelete}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
