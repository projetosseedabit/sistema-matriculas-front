import React from "react";
import Image from 'next/image';
import Logo from "../../public/logo.png";

const Header: React.FC = () => {
    return (
        <header className="bg-blue-800 w-full flex items-center p-4 lg:pl-16 sm:justify-center lg:justify-start">
            <Image 
                src={Logo} 
                alt="Logo Azul - Isolada de Redação VK" 
                className="w-[120px] sm:w-[100px] md:w-[140px] lg:w-[150px] h-auto" 
                width={150} 
                height={88} 
            />
        </header>
    );
};

export default Header;
