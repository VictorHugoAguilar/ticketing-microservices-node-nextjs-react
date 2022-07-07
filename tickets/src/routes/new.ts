import { DatabaseConnetionError, requireAuth, validateRequest } from '@black_sheep/common';
import { body } from 'express-validator';
import express, { Request, Response } from 'express';
import { Ticket } from '../model/ticket';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than 0')
], validateRequest, async (req: Request, res: Response) => {
    try {
        const { title, price } = req.body;
        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id
        });
        await ticket.save();

        await new TicketCreatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version,
        });

        res.status(201).send(ticket);
    } catch (error) {
        throw new DatabaseConnetionError();
    }
});

export { router as createTicketRouter }