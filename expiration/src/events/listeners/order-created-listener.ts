import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@black_sheep/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('Waiting this many milliseconds to process the job: ', delay);

        await expirationQueue.add(
            {
                orderId: data.id
            },
            {
                delay: delay
            },
        );

        msg.ack();
    }
}