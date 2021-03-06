import app from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener';
import { PaymentsCreatedListener } from './events/listeners/payment-created-listener';


const start = async () => {
    console.log('Starting orders...');

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

        new TicketCreatedListener(natsWrapper.client).listen();
        new TicketUpdatedListener(natsWrapper.client).listen();
        new ExpirationCompleteListener(natsWrapper.client).listen();
        new PaymentsCreatedListener(natsWrapper.client).listen();

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
