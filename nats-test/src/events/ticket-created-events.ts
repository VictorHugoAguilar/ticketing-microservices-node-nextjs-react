import Subjects from "./enums/Subjects";

interface TicketCreatedEvent {
    subject: Subjects.TicketCreated,
    data: {
        id: string,
        title: string,
        price: number
    }
}

export default TicketCreatedEvent;