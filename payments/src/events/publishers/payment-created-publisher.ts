import { Publisher, Subjects, PaymentCreatedEvent } from "@black_sheep/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
