'use client';

import { CheckCircle, XCircle, Info } from 'lucide-react';

const typeStyles = {
  success: {
    icon: <CheckCircle className="text-green-500" size={40} />,
    title: 'Success!',
    bg: 'bg-green-100',
  },
  error: {
    icon: <XCircle className="text-red-500" size={40} />,
    title: 'Error',
    bg: 'bg-red-100',
  },
  info: {
    icon: <Info className="text-blue-500" size={40} />,
    title: 'Info',
    bg: 'bg-blue-100',
  },
};

export default function Popup({ type = 'info', message, onClose }) {
  if (!message) return null;

  const { icon, title, bg } = typeStyles[type] || typeStyles.info;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-black bg-opacity-50 absolute inset-0"
        onClick={onClose}
      />
      <div className={`z-10 p-6 rounded-lg shadow-lg max-w-sm w-full ${bg}`}>
        <div className="flex items-center space-x-4 mb-4">
          {icon}
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
