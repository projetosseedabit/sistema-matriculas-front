import axios from "axios";

interface PaymentItem {
    id: string;
    title: string;
    quantity: number;
    currency_id: string;
    unit_price: number;
}

interface Payer {
    name: string;
    email: string;
}

interface BackUrls {
    success: string;
    failure: string;
    pending: string;
}

interface PaymentData {
    items: PaymentItem[];
    payer: Payer;
    backUrls: BackUrls;
}

// Serviço de criação de pagamento
export const createPayment = async (paymentData: PaymentData): Promise<string | null> => {
    try {
        const response = await axios.post("https://king-prawn-app-3bepj.ondigitalocean.app/mercadoPagopayment", paymentData);

        if (response.data && response.data.initPoint) {
            return response.data.initPoint; // URL do checkout do Mercado Pago
        }

        return null;
    } catch (error) {
        console.error("Erro ao criar pagamento:", error);
        return null;
    }
};
