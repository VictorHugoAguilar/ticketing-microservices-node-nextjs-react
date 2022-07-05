import { OrderCreatedEvent, Publisher, Subjects } from "@black_sheep/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}