import React from "react";

interface CardStudentTypeProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export const CardStudentType: React.FC<CardStudentTypeProps> = ({ label, name, value, checked, onChange }: CardStudentTypeProps) => {
  return (
    <div className="border-sky-950 border-2 rounded-md px-8 py-5 mx-4 sm:mx-8 lg:mx-60 flex items-center space-x-4 sm:space-x-8">
      <input
        type="radio"
        className={`accent-sky-950 ${checked ? "scale-125" : "scale-100"} transition-all duration-200`} // Ajuste de escala com transição suave
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <p className="text-sky-950 text-xl sm:text-2xl font-normal">{label}</p>
    </div>
  );
};
