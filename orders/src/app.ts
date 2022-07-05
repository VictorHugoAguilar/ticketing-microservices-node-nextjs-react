import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler, currentUser } from '@black_sheep/common';

// Routes 
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/news';
import { deleteOrderRouter } from './routes/delete';
import { showOrderRouter } from './routes/show';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(deleteOrderRouter);
app.use(showOrderRouter);


app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;