import React from "react";

const PurchaseConfirmation: React.FC = () => {
    return (
        <div>

            <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full my-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-2xl font-semibold text-gray-800">Compra finalizada</h1>
            <p className="text-gray-600 mt-2 text-center">
                A confirmação e o comprovante de matrícula serão enviados por e-mail.
            </p>

            <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-11/12 md:w-2/3 lg:w-1/2">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalhes da compra</h2>
                <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                    <span>Número do protocolo:</span>
                    <span>000000</span>
                    <span>Data de pagamento:</span>
                    <span>00/00/0000</span>
                    <span>Método de pagamento:</span>
                    <span>Cartão/Pix</span>
                </div>
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                <span>Subtotal:</span>
                <span>R$ 00,00</span>
                <span>Desconto:</span>
                <span>R$ 00,00</span>
                <span className="font-semibold">Valor total:</span>
                <span className="font-semibold">R$ 00,00</span>
            </div>

        </div>
    );
};

export default PurchaseConfirmation;