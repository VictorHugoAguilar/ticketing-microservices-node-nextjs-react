import app from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';


const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY not found, must be defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI not found, must be defined');
    }

    try {
        // connect to service nats
        await natsWrapper.connect('ticketing', 'asdf', 'http://nats-srv:4222');
        // for close app close service too gracefull shutdown
        natsWrapper.client.on('close', () => {
            console.log('NATS connection close');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());


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
