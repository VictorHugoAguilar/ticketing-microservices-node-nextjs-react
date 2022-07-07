import { Listener, Subjects, TicketCreatedEvent } from "@black_sheep/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";


export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        const { title, price } = data;

        const ticket = Ticket.build({
            title,
            price,
        });

        await ticket.save();

        msg.ack();
    }

}