import React from "react";
import SuccessMessage from "@/components/successMessage/SuccessMessage";
// import PurchaseDetails from "@/components/purchaseDetails/PurchaseDetails";
import Link from "next/link";

export default function PurchaseConfirmationPage() {
    // const purchaseDetails = {
    //     protocolNumber: "12345678",
    //     paymentDate: new Date(),
    //     paymentMethod: "Cartão de Crédito",
    //     subtotal: 150.0,
    //     total: 170.0,
    // };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 space-y-8">
            <SuccessMessage />

            {/* <PurchaseDetails
        protocolNumber={purchaseDetails.protocolNumber}
        paymentDate={purchaseDetails.paymentDate}
        paymentMethod={purchaseDetails.paymentMethod}
        subtotal={purchaseDetails.subtotal}
        total={purchaseDetails.total}
      /> */}

            <Link href="/">Voltar ao início </Link>
        </div>
    );
}
