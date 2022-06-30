import app from './app';
import mongoose from 'mongoose';


const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY not found, must be defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI not found, must be defined');
    }

    try {
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
