import React from 'react';
import { createPayment } from "@/services/paymentService";

interface PaymentButtonProps {
    courseType: 'IN_PERSON' | 'ONLINE';
    student: { fullName: string; email: string };
    classObj: { id: string; fullName: string; paymentAmount: number };
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ courseType, student, classObj }) => {
    const handlePayment = async () => {
        try {
            // Cria o objeto `paymentPayload` com a estrutura esperada
            const paymentPayload = {
                items: [
                    {
                        id: classObj.id,
                        title: `Curso ${courseType === 'IN_PERSON' ? 'Presencial' : 'Online'} - ${classObj.fullName}`,
                        quantity: 1,
                        currency_id: 'BRL',
                        unit_price: classObj.paymentAmount,
                    }
                ],
                payer: {
                    name: student.fullName,
                    email: student.email,
                },
                backUrls: {
                    success: "http://localhost:8080/success",
                    failure: "http://localhost:8080/failure",
                    pending: "http://localhost:8080/pending",
                },
                auto_return: "approved",
            };

            // Chama a função de criação de pagamento do serviço
            const initPoint = await createPayment(paymentPayload);

            if (initPoint) {
                // Redireciona para a página de pagamento do Mercado Pago
                window.location.href = initPoint;
            } else {
                console.error('Erro ao criar pagamento.');
                alert('Erro ao criar pagamento');
            }
        } catch (error) {
            console.error('Erro ao realizar pagamento:', error);
            alert('Erro ao realizar pagamento');
        }
    };

    return (
        <button
            onClick={handlePayment}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
            Realizar Pagamento
        </button>
    );
};

export default PaymentButton;
