import React, { useEffect } from "react";

const SnackbarError = ({ errorMessage, onClose }) => {
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Automatically close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage, onClose]);

  return (
    <div
      className={`fixed right-0 top-4 bg-red-500 text-white p-4 rounded shadow-lg transition-transform duration-300 ease-in-out transform ${
        errorMessage ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ display: errorMessage ? "block" : "none" }}
    >
      {errorMessage || "Sorry, an error occurred. Please try again"}
      <button onClick={onClose} className="ml-4 text-white hover:text-red-200">
        <span className="closer">X</span>
      </button>
    </div>
  );
};

export default SnackbarError;
