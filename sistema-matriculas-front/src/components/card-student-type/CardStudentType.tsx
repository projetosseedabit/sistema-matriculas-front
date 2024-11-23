import React from "react";

interface CardStudentTypeProps {
  label: string,
  name: string,
  value: string;
    checked: boolean;
    onChange: (value: string) => void;
}


export const CardStudentType: React.FC<CardStudentTypeProps> = ({label, name, value, checked, onChange }: CardStudentTypeProps) => {
    return (
      <>
        <div className="border-sky-950 border-2 rounded-md px-8 py-5 mx-60 flex space-x-8 ">
            <input type="radio" className={'accent-sky-950 ${checked ? "accent-sky-950" : "accent-sky-950"} scale-125'} name={name} value={value} 
                checked={checked} 
                onChange={() => onChange(value)}></input>
            <p className="text-sky-950 text-2xl font-normal">{label}</p>
        </div>
      </>
    )
}