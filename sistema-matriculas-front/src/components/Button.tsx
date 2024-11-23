import React from "react";

interface ButtonProps {
    color: string
    label: string;
    onClick?: (event: unknown) => void;
}

export const Button: React.FC<ButtonProps> = ({color, label, onClick}: ButtonProps) => {
    return (
        <button className={`${color} text-white px-8 py-4 rounded-md w-[288px] font-montserrat font-medium text-[24px]`} onClick={onClick}>{label}</button>
    )
}
