import { OrderCancelledEvent, Publisher, Subjects } from "@black_sheep/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}