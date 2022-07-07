import { Listener, Subjects, TicketCreatedEvent } from "@black_sheep/common";
import { Message } from "node-nats-streaming";


export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName: string = 'orderes-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {

    }

}