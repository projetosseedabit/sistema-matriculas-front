import { useEffect } from "react";

const CheckoutPage = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.mercadopago.com/js/v2";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const initializeMercadoPago = () => {
            if (window.MercadoPago) {
                const mp = window.MercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY || "", {
                    locale: "pt-BR",
                });

                // Configura o botão dinâmico para abrir o Checkout Pro
                mp.checkout({
                    preference: {
                        id: "PREFERENCE_ID_DO_BACKEND", // Substituir pela ID gerada no backend
                    },
                    autoOpen: true, // Abre automaticamente o checkout
                });
            }
        };

        // Aguarda o carregamento do script para inicializar o SDK
        if (document.readyState === "complete") {
            initializeMercadoPago();
        } else {
            window.addEventListener("load", initializeMercadoPago);
            return () => window.removeEventListener("load", initializeMercadoPago);
        }
    }, []);

    return (
        <div className="checkout-container">
            <h1 className="text-2xl font-bold text-center">Pagamento do Curso</h1>
            <div id="button-checkout" className="mt-8"></div>
        </div>
    );
};

export default CheckoutPage;