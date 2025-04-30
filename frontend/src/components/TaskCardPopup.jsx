import { useState } from "react";

export default function TaskCardPopUp({ status, onClose, onRetry }) {
  // status: "loading" | "success" | "error"

  if (!status) return null;

  return (
    <>
      {/* Dim background overlay */}
      <div className="fixed inset-0 bg-black opacity-30 z-40 "></div>

      {/* Modal container */}
      <div className="fixed inset-0 flex justify-center items-center z-50 p-4 ">
        <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-md text-center border-2 border-blue-400">
          {status === "loading" && (
            <>
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                Task is being Created
              </h2>
              <p className="mb-4">
                Please wait as we create the task. This may take a few minutes at most!
              </p>
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </>
          )}

          {status === "success" && (
            <>
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                Task Creation Success
              </h2> 
              <p className="mb-6 text-blue-400">Your profile has been updated.</p>
              <button
                onClick={onClose}
                className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
              >
                Close
              </button>
            </>
          )}

          {status === "error" && (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Task Creation Failed
              </h2>
              <p className="mb-6 text-red-600">
                We encountered some issues, you could try canceling first or try again.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="border border-blue-400 text-blue-400 px-6 py-2 rounded hover:bg-blue-100 transition"
                >
                  Close
                </button>
                <button
                  onClick={onRetry}
                  className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
                >
                  Try Again
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
