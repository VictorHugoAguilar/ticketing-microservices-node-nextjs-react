import request from 'supertest';
import app from '../../app';

it('fails when a email that does not existe is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com'
            , password: 'password'
        })
        .expect(400)
});


it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password_error'
        })
        .expect(400)
});

it('fails when not existing user supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test_error@test.com',
            password: 'password'
        })
        .expect(400)
});

it('response with a cookie when given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
});