import Publisher from './abstract/base-publisher';
import Subjects from './enums/Subjects';
import TicketCreatedEvent from './ticket-created-events';

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}

export default TicketCreatedPublisher;