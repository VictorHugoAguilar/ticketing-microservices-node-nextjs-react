import { Listener, OrderCreatedEvent, Subjects } from "@black_sheep/common";
import { Message } from "node-nats-streaming";
import { queueGrouName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGrouName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {


    }

}