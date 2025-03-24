import Show from "../show";
import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  onProcess?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  isLoading,
  onProcess,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}) => {
  // Base styles
  const baseStyles = "rounded-lg font-semibold border-2 border-black shadow-[3px_3px_0px_black] transition-all";
  
  // Variant styles
  const variantStyles = {
    primary: "bg-blue-600 text-black hover:bg-blue-500",
    outline: "bg-white text-black hover:bg-gray-100",
    ghost: "bg-transparent text-black border-transparent shadow-none hover:bg-gray-100",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none"}
        ${className}
      `}
    >
      <Show when={!isLoading} fallback={onProcess}>
        {children}
      </Show>
    </button>
  );
};

export default Button;