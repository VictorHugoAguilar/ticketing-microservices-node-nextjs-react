import { Listener, OrderCreatedEvent, Subjects } from "@black_sheep/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/ticket";
import { queueGrouName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGrouName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {

        // Find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);

        // If no ticket, throw error
        if (!ticket) {
            throw new Error('Ticket not found');
        }

        // Mark the ticket as being reserved by setting its orderId property
        ticket.set({ orderId: data.id });

        // Save the ticket
        await ticket.save();

        // ACK the message
        msg.ack();

    }

}