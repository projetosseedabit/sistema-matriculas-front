import React from "react";
import Image from 'next/image';

const Header:React.FC = () => {
    return (
        <header className="bg-blue-800">
            <div className="container mx-auto flex items-center p-40">
                <Image src='/logoAzul.jpg' alt="Logo Azul - Isolada de Redação VK" width={150} height={150}/>     
            </div>
        </header>
    );
};

export default Header;