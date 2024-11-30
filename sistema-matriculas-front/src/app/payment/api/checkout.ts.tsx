import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { title, price } = req.body;

        const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
                items: [
                    {
                        title,
                        unit_price: price,
                        quantity: 1,
                        currency_id: 'BRL',
                    },
                ],
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmacao-pagamento`,
                    failure: `${process.env.NEXT_PUBLIC_BASE_URL}/inicio`,
                    pending: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmacao-pagamento`,
                },
                auto_return: 'approved',
            }),
        });

        const data = await response.json();
        res.status(200).json({ init_point: data.init_point });
    } catch (error) {
        console.error('Erro ao criar preferência:', error);
        res.status(500).json({ error: 'Erro ao criar a preferência de pagamento.' });
    }
}
