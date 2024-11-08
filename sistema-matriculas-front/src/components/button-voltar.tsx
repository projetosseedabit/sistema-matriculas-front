import React from 'react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-[#003960] text-[#FFFFFF] py-2 px-6 rounded-lg hover:bg-[#002b44] transition-colors ${className}`}
        >
        Voltar
        </button>
    );
};

export default Button;
