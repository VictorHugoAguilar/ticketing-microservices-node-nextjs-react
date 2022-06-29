import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req: Request, res: Response) => {
    res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter }; 