import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../model/ticket';

it('return 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'asdf',
            price: 20
        })
        .expect(404);
});

it('return a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'asdf',
            price: 20
        })
        .expect(401);
});

it('return a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'lala lan',
            price: 10
        })
        .expect(201);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'asdf',
            price: 20
        })
        .expect(401);
});

it('return a 400 if the user provides an invalid title or price', async () => {
    const user = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', user)
        .send({
            title: 'lala lan',
            price: 10
        })
        .expect(201);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', user)
        .send({
            price: -10
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', user)
        .send({
            title: 'asdf'
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', user)
        .send({
        })
        .expect(400);
});


it('update the ticket provided valid inputs', async () => {
    const user = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', user)
        .send({
            title: 'lala lan',
            price: 10
        })
        .expect(201);

    const newTitle = 'new lalalan';
    const newPrice = 300;

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', user)
        .send({
            title: newTitle,
            price: newPrice
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body?.title).toEqual(newTitle);
    expect(ticketResponse.body?.price).toEqual(newPrice);

});