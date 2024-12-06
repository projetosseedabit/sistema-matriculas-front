import React from "react";

interface CardStudentTypeProps {
    label: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
}

export const CardStudentType: React.FC<CardStudentTypeProps> = ({
    label,
    name,
    value,
    checked,
    onChange,
}: CardStudentTypeProps) => {
    return (
        <label
            htmlFor={value}
            className="border-azul border-2 rounded-md px-4 py-3 sm:px-8 sm:py-5 mx-4 sm:mx-8 lg:mx-60 flex items-center space-x-4 sm:space-x-8"
        >
            <input
                type="radio"
                className={`accent-azul ${
                    checked ? "scale-125" : "scale-100"
                } transition-all duration-200`} // Ajuste de escala com transição suave
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
                id={value}
            />
            <p className="text-azul sm:text-xl font-normal">{label}</p>
        </label>
    );
};
