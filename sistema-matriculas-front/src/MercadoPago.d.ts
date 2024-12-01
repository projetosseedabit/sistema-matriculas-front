// mercadopago.d.ts
declare global {
    interface Window {
        MercadoPago?: (publicKey: string, options?: { locale?: string }) => {
            checkout: (config: { preference: { id: string }; autoOpen?: boolean }) => void;
        };
    }
}

export {};
