import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@black_sheep/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { Order } from '../models/order';
import { Payment } from '../models/payment';
import { natsWrapper } from '../nats-wrapper';
import { stripe } from '../stripe';

const router = express.Router();

router.post(
    '/api/payments',
    requireAuth,
    [
        body('token')
            .not()
            .isEmpty()
            .withMessage('Not found token')
        ,
        body('orderId')
            .not()
            .isEmpty()
            .withMessage('Not found orderId')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { token, orderId } = req.body;

        const order = await Order.findById(orderId);
        console.info('order', order);

        if (!order) {
            console.error('order not found in new.ts');
            throw new NotFoundError();
        }
        if (order.userId !== req.currentUser!.id) {
            console.error('not authorized in new.ts');
            throw new NotAuthorizedError();
        }
        if (order.status === OrderStatus.Cancelled) {
            console.error('cannot pay for an cancelled order in new.ts');
            throw new BadRequestError('cannot pay for an cancelled order');
        }

        const charge = await stripe.charges.create({
            currency: 'usd',
            amount: order.price * 100,
            source: token,
        });
        console.log('charge', charge);

        const payment = Payment.build({
            orderId,
            stripeId: charge.id,
        });
        console.log('payment', payment);
        await payment.save();
        
        new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId,
        });

        res.status(201).send({ id: payment.id });
    }
);

export { router as createChargeRouter };