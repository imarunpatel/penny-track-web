import React from "react";

interface ButtonProps {
  label: string; // Text to display on the button
  onClick?: () => void; // Function to handle button clicks
  isLoading?: boolean; // Whether to show a loading state
  disabled?: boolean; // Disable the button
  className?: string; // Additional CSS classes
  size?: "small" | "medium" | "large"; // Button size
  fullWidth?: boolean; // Whether the button should take full width
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  isLoading = false,
  disabled = false,
  className = "",
  size = "medium",
  fullWidth = false,
}) => {
  // Define size-based styles
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`rounded-md text-white bg-violet-800 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${sizeClasses[size]} ${fullWidth ? "w-full" : "w-auto"} ${className}`}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;
