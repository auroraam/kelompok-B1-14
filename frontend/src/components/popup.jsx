import { useEffect, useState } from "react";

export default function popUp({ isOpen, onClose, onConfirm, status, task, title, message, confirmText }) {
  if (!isOpen) return null;

  const colorClasses = {
    success: {
      border: "border-green-600",
      text: "text-green-600",
      bg: "bg-green-600",
      hover: "hover:bg-green-700",
      pulse: "bg-green-600",
      hoverLight: "hover:bg-green-100",
    },
    error: {
      border: "border-red-600",
      text: "text-red-600",
      bg: "bg-red-600",
      hover: "hover:bg-red-700",
      pulse: "bg-red-600",
      hoverLight: "hover:bg-red-100",
    },
    loading: {
      border: "border-blue-600",
      text: "text-blue-600",
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
      pulse: "bg-blue-600",
      hoverLight: "hover:bg-blue-100",
    },
    confirm: {
      border: "border-yellow-600",
      text: "text-yellow-600",
      bg: "bg-yellow-600",
      hover: "hover:bg-yellow-700",
      pulse: "bg-yellow-600",
      hoverLight: "hover:bg-yellow-100",
    },
    default: {
      border: "border-cyan-600",
      text: "text-cyan-600",
      bg: "bg-cyan-600",
      hover: "hover:bg-cyan-700",
      pulse: "bg-cyan-600",
      hoverLight: "hover:bg-cyan-100",
    },
  };

const current = colorClasses[status] || colorClasses.default;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-30 z-40"></div>
      <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
        <div className={`bg-white rounded-lg max-w-md w-full p-6 shadow-md text-center border-2 ${current.border}`}>
          <h2 className={`text-2xl font-bold ${current.text} mb-4`}>{title}</h2>
          <p className="mb-4 text-gray-500">{message}</p>

          {status === "loading" ? (
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`w-4 h-4 ${current.pulse} rounded-full animate-pulse`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          ) : status === "confirm" ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className={`border ${current.text} ${current.border} px-6 py-2 rounded ${current.hoverLight} transition`}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`${current.bg} text-white px-6 py-2 rounded ${current.hover} transition`}
              >
                {confirmText}
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className={`${current.bg} text-white px-6 py-2 rounded ${current.hover} transition`}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </>
  );
}