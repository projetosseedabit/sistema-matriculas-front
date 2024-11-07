import React from "react";
import Image from 'next/image';

const Header:React.FC = () => {
    return (
        <header className="bg-blue-800 w-full container mx-auto flex items-center p-4 pl-16">
            <Image src='/logoAzul.jpg' alt="Logo Azul - Isolada de Redação VK" className="w-[150px] h-[88px]" width={1080} height={1080}/>     
        </header>
    );
};

export default Header;