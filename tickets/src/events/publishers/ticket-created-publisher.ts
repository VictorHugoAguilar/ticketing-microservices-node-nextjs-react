import { Publisher, Subjects, TicketCreatedEvent } from '@black_sheep/common';


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;

    

}




