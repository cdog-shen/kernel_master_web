"use client";
import { useState } from "react";

export function Alert({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-gray-800 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          确定
        </button>
      </div>
    </div>
  );
}

export function useAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showAlert = (msg) => {
    setMessage(msg);
    setIsVisible(true);
  };

  const hideAlert = () => {
    setIsVisible(false);
  };

  return {
    isVisible,
    message,
    showAlert,
    hideAlert,
  };
}
