import nats from 'node-nats-streaming';
import Listener from './abstract/base-listener';
import Subjects from './enums/Subjects';
import TicketCreatedEvent from './ticket-created-events';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName: string = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: nats.Message): void {
        console.log('Event data!', data);

        console.log(data.id);
        console.log(data.title);
        console.log(data.price);

        msg.ack();
    }
};

export default TicketCreatedListener;