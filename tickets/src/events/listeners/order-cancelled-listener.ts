import { Listener, OrderCancelledEvent, Subjects } from "@black_sheep/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGrouName } from './queue-group-name'

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
    queueGroupName = queueGrouName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {

        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        ticket.set({ orderId: undefined });
        await ticket.save();

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket.orderId,
            userId: ticket.userId,
            price: ticket.price,
            title: ticket.title,
            version: ticket.version,
        });

        msg.ack();

    }

}