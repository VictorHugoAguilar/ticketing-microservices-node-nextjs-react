import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const data = JSON.stringify({
    id: '123',
    title: 'concet',
    price: 20
  });

  for (let i = 0; i < 3; i++) {
    stan.publish('ticket:created', data, () => {
      console.log('event published');
    });
  }


});
