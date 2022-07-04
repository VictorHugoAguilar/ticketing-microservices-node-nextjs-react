import nats from 'node-nats-streaming';
import TicketCreatedPublisher from './events/ticket-created-publisher';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concet',
  //   price: 20
  // });

  // stan.publish('Ticket:Created', data, () => {
  //   console.log('Event published');
  // });

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: '123',
      title: 'concet',
      price: 20
    });
  } catch (err) {
    console.error(err);
  }

});
