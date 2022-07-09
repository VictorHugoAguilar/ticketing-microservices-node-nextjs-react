import request from 'supertest';
import app from '../../app';

it('response with details about the current user', async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    const body = response.body;
    expect(body.currentUser.email).toEqual('test@test.com');
});

it('response with 401, not authorized if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

    const body = response.body;
});