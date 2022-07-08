import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@black_sheep/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/order';

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

        if (!order) {
            throw new NotFoundError();
        }
        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError('Cannot pay for an cacelled order');
        }

        res.send({ success: true });
    }
);

export { router as createChargeRouter };