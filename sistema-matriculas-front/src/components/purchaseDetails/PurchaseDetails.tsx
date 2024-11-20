import React from "react";

interface PurchaseDetailsProps {
    protocolNumber: string;
    paymentDate: Date;
    paymentMethod: string;
    subtotal: number;
    total: number;
}

const PurchaseDetails: React.FC<PurchaseDetailsProps> = ({
    protocolNumber,
    paymentDate,
    paymentMethod,
    subtotal,
    total,
}) => {

    //Formatting money
    const formatCurrency = (value: number) => {
        return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };

    //Formatting date
    const formatDate = (date: Date) => {
       return date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
    };

    return (
        <div className="w-full max-w-md p-4 border border-gray-300 rounded-lg space-y-4">
          {/* Título */}
          <h2 className="text-lg font-bold text-gray-800">Detalhes da compra</h2>
    
          {/* Informações principais */}
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Número do protocolo:</strong> {protocolNumber}
            </p>
            <p>
              <strong>Data de pagamento:</strong> {formatDate(paymentDate)}
            </p>
            <p>
              <strong>Método de pagamento:</strong> {paymentMethod}
            </p>
          </div>
    
          {/* Divisória */}
          <hr className="border-gray-300" />
    
          {/* Resumo financeiro */}
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Subtotal:</strong> {formatCurrency(subtotal)}
            </p>
            <p>
              <strong>Valor total:</strong> {formatCurrency(total)}
            </p>
          </div>
        </div>
      );
};

export default PurchaseDetails;