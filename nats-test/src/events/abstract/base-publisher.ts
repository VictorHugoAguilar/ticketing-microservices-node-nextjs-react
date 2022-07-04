import { Message, Stan } from 'node-nats-streaming';
import Subjects from '../enums/Subjects';

interface Event {
    subject: Subjects;
    data: any;
}

abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    private client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

    publish(data: T['data']): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                if (err) {
                    return reject(err);
                }

                console.log('Event published to subject ', this.subject);
                resolve();
            });
        })
    }
}


export default Publisher;