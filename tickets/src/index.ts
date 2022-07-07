import app from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';


const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY not found, must be defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI not found, must be defined');
    }

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID not found, must be defined');
    }

    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL not found, must be defined');
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID not found, must be defined');
    }
    try {

        // Event service
        // connect to service nats
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        // for close app close service too gracefull shutdown
        natsWrapper.client.on('close', () => {
            console.log('NATS connection close');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        // create service of listen
        new OrderCreatedListener(natsWrapper.client).listen();
        new OrderCancelledListener(natsWrapper.client).listen();

        // connect to mongodb
        await mongoose.connect(process.env.MONGO_URI, {});
        console.info('Connect to MongoDb');
    } catch (error) {
        console.error(error);
    }
}

app.listen(3000, () => {
    console.log('Listen from port: ', 3000)
});

start();
