import React from "react";

interface ButtonProps {
  color: string;
  label: string;
  onClick?: (event: unknown) => void;
}

export const Button: React.FC<ButtonProps> = ({ color, label, onClick }: ButtonProps) => {
  return (
    <button
      className={`${color} text-white px-8 py-4 rounded-md w-full sm:w-auto font-montserrat font-medium text-[20px] sm:text-[26px] lg:text-[28px] transition-all duration-200`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
