import { Listener, OrderStatus, PaymentCreatedEvent, Subjects } from "@black_sheep/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";

export class PaymentsCreatedListener extends Listener<PaymentCreatedEvent>{
    readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        if (order.status === OrderStatus.Complete) {
            return msg.ack();
        }

        order.set({
            status: OrderStatus.Complete
        });
        await order.save();

        msg.ack();
    }


}