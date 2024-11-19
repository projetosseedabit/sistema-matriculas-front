import React from "react";
import Image from 'next/image';

const SuccessMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      
      <div className="w-16 h-16">
        <Image src='check.svg' alt="Imagem de Confirmação" className="w-16 h-16" width={160} height={160}/>
      </div>

      <h1 className="text-xl font-bold text-gray-800">Compra finalizada</h1>

      <p className="text-gray-600">
        A confirmação e o comprovante de matrícula serão enviados por e-mail.
      </p>
    </div>
  );
};

export default SuccessMessage;
