import React from "react";

type ButtonProps = {
    color: string;
    label: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button" | undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
    color,
    label,
    onClick,
    type,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`${color} text-white disabled:bg-gray-500 disabled:text-gray-100 disabled:cursor-not-allowed px-8 py-4 rounded-md w-full sm:w-auto font-montserrat font-medium text-[20px] sm:text-[26px] lg:text-[28px] transition-all duration-200`}
            onClick={onClick}
            type={type}
            {...props}
        >
            {label}
        </button>
    );
};
