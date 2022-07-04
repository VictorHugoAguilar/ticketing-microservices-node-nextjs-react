import nats from 'node-nats-streaming';
import Listener from './abstract/base-listener';
import { Subjects } from './Subjects';
import { TicketCreatedEvent } from './ticket-created-events';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName: string = 'payments-service';

    onMessage(data: any, msg: nats.Message): void {
        console.log('Event data!', data);

        console.log(data.name);
        console.log(data.cost);

        msg.ack();
    }
};

export default TicketCreatedListener;