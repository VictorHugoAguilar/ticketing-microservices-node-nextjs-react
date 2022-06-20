import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-users';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/singup';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listen from port: ', 3000)
});


