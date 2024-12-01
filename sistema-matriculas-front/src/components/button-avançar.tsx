import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#FFA12B] text-[#FFFFFF] py-2 px-6 rounded-lg hover:bg-[#D78723] transition-colors ${className}`}
    >
      Avançar
    </button>
  );
};

export default Button;
