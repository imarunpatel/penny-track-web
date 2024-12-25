import React from "react";

interface InputProps {
  label: string; // The label for the input
  id: string; // The unique identifier for the input
  value: string; // The value of the input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  placeholder?: string; // Placeholder text for the input
  type?: string; // Type of the input (default: "text")
  error?: string; // Error message
  showError?: boolean; // Whether to show the error border
  className?: string; // Additional classes for the input
  required?: boolean; // Mark the input as required
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error,
  showError = false,
  className = "",
  required = false,
}) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={id}
        className="block text-xs font-medium text-gray-500 dark:text-white"
      >
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        style={{
          borderColor: showError ? "red" : "",
        }}
        className={`h-9 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${className}`}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
