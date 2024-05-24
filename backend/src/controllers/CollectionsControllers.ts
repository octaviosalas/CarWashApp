import { Request, Response } from "express";
import { MercadoPagoConfig, Payment } from "mercadopago";
import axios from "axios"


interface BodyType { 
   
        transaction_amount: number,
        description: string,
        payment_method_id: string,
        payer: { email: string }
       token: string
}

const client = new MercadoPagoConfig({ 
    accessToken: 'TEST-3566160211673424-052407-ddd85b870494fc5f20a9d3d12b0da68e-548557600', 
    options: { timeout: 5000, idempotencyKey: 'abc' } 
});

const payment = new Payment(client);

export const createMercadoPagoOrder = async (req: Request, res: Response) => {
    console.log(req.body);

    try {
        const body: BodyType = {
            transaction_amount: req.body.transaction_amount,
            description: req.body.description,
            payment_method_id: req.body.payment_method_id,
            payer: {
                email: req.body.payer.email
            },
           token: req.body.token
        };

        const result = await payment.create({ body: body });
        console.log(result);


        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la orden de pago", error: error.message });
    }
};

export const generateLink = async (req: Request, res: Response) => { 
    try {
        const response = await axios.post('https://api.mercadopago.com/v1/payment-links', {
          title: 'Mi producto',
          description: 'Descripción detallada del producto',
          amount: 100,
          currency_id: 'MXN',
          external_reference: 'REF12345',
          auto_return: 'approved',
          expiration_date_from: new Date().toISOString(),
          expiration_date_to: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MERCADOPAGO_PUBLIC_KEY}`
          }
        });
    
        res.send({ link: response.data.body.link });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el Link de Pago');
      }
}
