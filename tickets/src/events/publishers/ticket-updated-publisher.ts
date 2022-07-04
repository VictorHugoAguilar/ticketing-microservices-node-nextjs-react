import { Publisher, Subjects, TicketUpdatedEvent } from '@black_sheep/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
};
